<template>
  <div class="experiment-page">
    <!-- Header -->
    <div class="experiment-header">
      <div class="breadcrumb-nav">
        <button class="breadcrumb-btn" @click="$router.push('/labs')">
          <v-icon size="16">mdi-arrow-left</v-icon>
          HIBRIT Labs
        </button>
        <v-icon size="12" color="#9ca3af">mdi-chevron-right</v-icon>
        <span class="breadcrumb-current">Funnel Builder</span>
      </div>
      
      <div class="experiment-info">
        <h1>🎯 Funnel Builder - Visual Constructor</h1>
        <div class="header-actions">
          <button class="knowledge-btn" @click="scrollToKnowledge">
            <v-icon size="16">mdi-brain</v-icon>
            Sistema 360°
          </button>
          <button class="export-btn" @click="exportInterface">
            <v-icon size="16">mdi-camera</v-icon>
            Exportar Interface
          </button>
        </div>
      </div>
    </div>

    <!-- Interface -->
    <div id="interface-capture" class="interface-content">
      <v-container fluid class="pa-4 bg-surface-950 text-white">
        <!-- Header Controls -->
        <v-row class="mb-4" align="center" justify="space-between" no-gutters>
          <v-col cols="12" md="6" class="mb-4 mb-md-0">
            <div class="text-white text-opacity-70 text-caption">Hibrit Labs · Funnel Builder</div>
            <div class="text-h5 font-weight-bold">Visual Funnel Constructor</div>
          </v-col>
          <v-col cols="12" md="6" class="d-flex gap-2 justify-end align-center">
            <v-btn-toggle v-model="viewMode" mandatory class="funnel-toggle">
              <v-btn value="isolated" size="small">
                <v-icon size="16">mdi-source-branch</v-icon>
                Funis Isolados
              </v-btn>
              <v-btn value="normalized" size="small">
                <v-icon size="16">mdi-merge</v-icon>
                Funil Normalizado
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>

        <!-- Isolated Funnels View -->
        <div v-if="viewMode === 'isolated'" class="isolated-view">
          <v-row class="mb-4" dense>
            <v-col v-for="funnel in isolatedFunnels" :key="funnel.id" cols="12" md="6" lg="3">
              <div class="funnel-card">
                <div class="funnel-header">
                  <div class="funnel-icon" :style="{ background: funnel.color + '20', border: '2px solid ' + funnel.color }">
                    <v-icon :color="funnel.color" size="20">{{ funnel.icon }}</v-icon>
                  </div>
                  <div class="funnel-info">
                    <h4>{{ funnel.name }}</h4>
                    <span class="funnel-type">{{ funnel.type }}</span>
                  </div>
                </div>
                
                <div class="funnel-visual">
                  <div class="funnel-stages">
                    <div 
                      v-for="(stage, index) in funnel.stages" 
                      :key="index"
                      class="stage-container"
                    >
                      <div 
                        class="stage-bar"
                        :style="{ 
                          width: (stage.count / funnel.stages[0].count) * 100 + '%',
                          background: `linear-gradient(135deg, ${funnel.color}, ${funnel.color}80)`
                        }"
                      >
                        <div class="stage-content">
                          <span class="stage-name">{{ stage.name }}</span>
                          <span class="stage-count">{{ formatNumber(stage.count) }}</span>
                        </div>
                      </div>
                      <div v-if="index < funnel.stages.length - 1" class="conversion-rate">
                        {{ calculateConversion(stage.count, funnel.stages[index + 1].count) }}%
                      </div>
                    </div>
                  </div>
                </div>

                <div class="funnel-metrics">
                  <div class="metric-item">
                    <span class="metric-label">Conversão Total</span>
                    <span class="metric-value">{{ calculateTotalConversion(funnel) }}%</span>
                  </div>
                  <div class="metric-item">
                    <span class="metric-label">Volume Final</span>
                    <span class="metric-value">{{ formatNumber(funnel.stages[funnel.stages.length - 1].count) }}</span>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- Normalized Funnel View -->
        <div v-if="viewMode === 'normalized'" class="normalized-view">
          <v-row class="mb-4">
            <v-col cols="12">
              <div class="normalized-funnel">
                <div class="funnel-flow">
                  <!-- Acquisition Channels -->
                  <div class="flow-section acquisition">
                    <h3>Aquisição</h3>
                    <div class="channels">
                      <div 
                        v-for="channel in acquisitionChannels" 
                        :key="channel.id"
                        class="channel-node"
                        :style="{ background: channel.color + '20', borderColor: channel.color }"
                      >
                        <v-icon :color="channel.color" size="16">{{ channel.icon }}</v-icon>
                        <span>{{ channel.name }}</span>
                        <div class="channel-volume">{{ formatNumber(channel.volume) }}</div>
                      </div>
                    </div>
                  </div>

                  <!-- Flow Arrow -->
                  <div class="flow-arrow">
                    <v-icon size="32" color="#8b5cf6">mdi-arrow-right</v-icon>
                  </div>

                  <!-- Unified Funnel -->
                  <div class="flow-section unified">
                    <h3>Funil Unificado</h3>
                    <div class="unified-funnel-visual">
                      <div 
                        v-for="(stage, index) in normalizedStages" 
                        :key="index"
                        class="unified-stage"
                      >
                        <div class="stage-shape" :style="{ width: (stage.count / normalizedStages[0].count) * 300 + 'px' }">
                          <div class="stage-label">
                            <span class="stage-name">{{ stage.name }}</span>
                            <span class="stage-count">{{ formatNumber(stage.count) }}</span>
                          </div>
                        </div>
                        <div v-if="index < normalizedStages.length - 1" class="stage-conversion">
                          {{ calculateConversion(stage.count, normalizedStages[index + 1].count) }}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Attribution Breakdown -->
                <div class="attribution-section">
                  <h4>Contribuição por Canal (Last-Touch Attribution)</h4>
                  <div class="attribution-bars">
                    <div 
                      v-for="attr in attributionData" 
                      :key="attr.channel"
                      class="attribution-bar"
                    >
                      <div class="attr-label">{{ attr.channel }}</div>
                      <div class="attr-visual">
                        <div 
                          class="attr-fill"
                          :style="{ 
                            width: attr.percentage + '%',
                            background: attr.color 
                          }"
                        ></div>
                      </div>
                      <div class="attr-value">{{ attr.percentage }}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- Performance Metrics -->
        <v-row class="mt-4">
          <v-col cols="12" md="4">
            <v-card class="elevated-card metric-card" variant="outlined">
              <v-card-text>
                <div class="metric-header">
                  <v-icon color="#10b981" size="24">mdi-chart-line</v-icon>
                  <h4>Conversão Global</h4>
                </div>
                <div class="metric-display">
                  <span class="metric-number">{{ globalConversion }}%</span>
                  <span class="metric-trend positive">+2.3%</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="elevated-card metric-card" variant="outlined">
              <v-card-text>
                <div class="metric-header">
                  <v-icon color="#f59e0b" size="24">mdi-target</v-icon>
                  <h4>Volume Total</h4>
                </div>
                <div class="metric-display">
                  <span class="metric-number">{{ formatNumber(totalVolume) }}</span>
                  <span class="metric-trend positive">+15.7%</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="elevated-card metric-card" variant="outlined">
              <v-card-text>
                <div class="metric-header">
                  <v-icon color="#8b5cf6" size="24">mdi-clock-fast</v-icon>
                  <h4>Tempo Médio</h4>
                </div>
                <div class="metric-display">
                  <span class="metric-number">{{ averageTime }}d</span>
                  <span class="metric-trend negative">-1.2d</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <div class="text-caption text-white text-opacity-50 mt-4">
          *Demonstração visual de funis isolados vs. funil normalizado com dados simulados para fins didáticos.
        </div>
      </v-container>
    </div>

    <!-- Other Experiments -->
    <KnowledgeSystem experiment-type="funnel-builder" experiment-name="Funnel Builder" />
    <OtherExperiments current-experiment="funnel-builder" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import OtherExperiments from '@/components/OtherExperiments.vue'
import KnowledgeSystem from '@/components/KnowledgeSystem.vue'

const viewMode = ref('isolated')

// Isolated Funnels Data
const isolatedFunnels = ref([
  {
    id: 'webinar',
    name: 'Webinar Live',
    type: 'Educacional',
    color: '#10b981',
    icon: 'mdi-presentation',
    stages: [
      { name: 'Inscritos', count: 2500 },
      { name: 'Presentes', count: 1200 },
      { name: 'Engajados', count: 800 },
      { name: 'Leads', count: 320 },
      { name: 'Qualificados', count: 180 }
    ]
  },
  {
    id: 'vsl',
    name: 'VSL Evergreen',
    type: 'Vendas',
    color: '#3b82f6',
    icon: 'mdi-play-circle',
    stages: [
      { name: 'Visualizações', count: 5200 },
      { name: '25% Assistido', count: 3100 },
      { name: '75% Assistido', count: 1800 },
      { name: 'CTA Clicado', count: 650 },
      { name: 'Formulário', count: 280 }
    ]
  },
  {
    id: 'content',
    name: 'Série de Conteúdo',
    type: 'Nutrição',
    color: '#f59e0b',
    icon: 'mdi-book-open',
    stages: [
      { name: 'Visitantes', count: 8500 },
      { name: 'Leitores', count: 4200 },
      { name: 'Engajados', count: 2100 },
      { name: 'Inscritos', count: 850 },
      { name: 'Ativados', count: 420 }
    ]
  },
  {
    id: 'referral',
    name: 'Indicações',
    type: 'Orgânico',
    color: '#8b5cf6',
    icon: 'mdi-account-group',
    stages: [
      { name: 'Indicações', count: 450 },
      { name: 'Contatos', count: 380 },
      { name: 'Interessados', count: 290 },
      { name: 'Qualificados', count: 220 },
      { name: 'Convertidos', count: 165 }
    ]
  }
])

// Acquisition Channels for Normalized View
const acquisitionChannels = ref([
  { id: 'webinar', name: 'Webinar', volume: 180, color: '#10b981', icon: 'mdi-presentation' },
  { id: 'vsl', name: 'VSL', volume: 280, color: '#3b82f6', icon: 'mdi-play-circle' },
  { id: 'content', name: 'Conteúdo', volume: 420, color: '#f59e0b', icon: 'mdi-book-open' },
  { id: 'referral', name: 'Indicações', volume: 165, color: '#8b5cf6', icon: 'mdi-account-group' }
])

// Normalized Funnel Stages
const normalizedStages = ref([
  { name: 'Leads Totais', count: 1045 },
  { name: 'Qualificados (MQL)', count: 720 },
  { name: 'Oportunidades (SQL)', count: 380 },
  { name: 'Propostas', count: 220 },
  { name: 'Fechados', count: 95 }
])

// Attribution Data
const attributionData = computed(() => {
  const total = acquisitionChannels.value.reduce((sum, ch) => sum + ch.volume, 0)
  return acquisitionChannels.value.map(ch => ({
    channel: ch.name,
    percentage: Math.round((ch.volume / total) * 100),
    color: ch.color
  }))
})

// Computed Metrics
const globalConversion = computed(() => {
  const initial = normalizedStages.value[0].count
  const final = normalizedStages.value[normalizedStages.value.length - 1].count
  return ((final / initial) * 100).toFixed(1)
})

const totalVolume = computed(() => normalizedStages.value[0].count)
const averageTime = ref(18)

// Helper Functions
const formatNumber = (num) => num.toLocaleString('pt-BR')

const calculateConversion = (from, to) => {
  return ((to / from) * 100).toFixed(1)
}

const calculateTotalConversion = (funnel) => {
  const initial = funnel.stages[0].count
  const final = funnel.stages[funnel.stages.length - 1].count
  return ((final / initial) * 100).toFixed(1)
}

const exportInterface = () => {
  console.log('Export Funnel Builder')
}

const scrollToKnowledge = () => {
  document.querySelector('.knowledge-system').scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.experiment-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  color: white;
}

.experiment-header {
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
  padding: 24px 40px;
}

.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.breadcrumb-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 6px;
  color: #8b5cf6;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.breadcrumb-btn:hover {
  background: rgba(139, 92, 246, 0.2);
}

.breadcrumb-current {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.experiment-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.experiment-info h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.knowledge-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.knowledge-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.4);
}

.export-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.export-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
}

.interface-content {
  background: #0b1211;
  min-height: 60vh;
}

.bg-surface-950 { 
  background: #0b1211; 
}

.elevated-card { 
  background: #0d1514; 
  border-color: rgba(255,255,255,0.08) !important; 
}

.funnel-toggle {
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 8px;
}

/* Isolated Funnels */
.funnel-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  height: 100%;
  transition: all 0.3s ease;
}

.funnel-card:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(139, 92, 246, 0.2);
}

.funnel-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.funnel-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.funnel-info h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: white;
}

.funnel-type {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

.funnel-visual {
  margin-bottom: 20px;
}

.funnel-stages {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stage-container {
  position: relative;
}

.stage-bar {
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stage-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.stage-bar:hover::before {
  transform: translateX(100%);
}

.stage-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 2;
  position: relative;
}

.stage-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: white;
}

.stage-count {
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
}

.conversion-rate {
  position: absolute;
  right: -50px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #10b981;
  font-weight: 600;
}

.funnel-metrics {
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.metric-item {
  text-align: center;
}

.metric-label {
  display: block;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 4px;
}

.metric-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
}

/* Normalized Funnel */
.normalized-funnel {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
}

.funnel-flow {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 40px;
}

.flow-section h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
  text-align: center;
}

.channels {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.channel-node {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid;
  border-radius: 8px;
  font-size: 0.9rem;
  color: white;
}

.channel-volume {
  margin-left: auto;
  font-weight: 600;
}

.flow-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
}

.unified-funnel-visual {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.unified-stage {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stage-shape {
  height: 50px;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.stage-shape::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.stage-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  position: relative;
}

.stage-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: white;
}

.stage-count {
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.stage-conversion {
  margin-top: 8px;
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid #10b981;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #10b981;
  font-weight: 600;
}

.attribution-section h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
}

.attribution-bars {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.attribution-bar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.attr-label {
  min-width: 80px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.attr-visual {
  flex: 1;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.attr-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.8s ease;
}

.attr-value {
  min-width: 40px;
  text-align: right;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
}

/* Metric Cards */
.metric-card {
  height: 100%;
}

.metric-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.metric-header h4 {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

.metric-display {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.metric-number {
  font-size: 2rem;
  font-weight: 700;
  color: white;
}

.metric-trend {
  font-size: 0.9rem;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 4px;
}

.metric-trend.positive {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.metric-trend.negative {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}
</style>