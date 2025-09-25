<template>
  <v-container fluid class="pa-4">
    <!-- Header com Toggle de Visão -->
    <div class="d-flex align-center justify-space-between mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold">OCS - Cockpit Executivo</h1>
        <p class="text-body-2 text-grey">Blocos de Concreto & Pisos Intertravados</p>
      </div>
      
      <div class="d-flex align-center gap-4">
        <v-btn-toggle v-model="viewMode" mandatory color="primary" variant="outlined">
          <v-btn value="unified" prepend-icon="mdi-chart-line">
            Visão Unificada
          </v-btn>
          <v-btn value="funnels" prepend-icon="mdi-chart-sankey">
            Por Funil
          </v-btn>
        </v-btn-toggle>
        
        <v-btn-toggle v-model="period" mandatory size="small">
          <v-btn value="30d">30d</v-btn>
          <v-btn value="90d">90d</v-btn>
          <v-btn value="12m">12m</v-btn>
        </v-btn-toggle>
      </div>
    </div>

    <!-- KPIs Unificados (sempre visível) -->
    <v-row class="mb-6">
      <v-col cols="12" md="2">
        <v-card class="kpi-card" color="success">
          <v-card-text class="text-center">
            <div class="text-h4 font-weight-bold">{{ unifiedKPIs.clients }}</div>
            <div class="text-body-2">Clientes</div>
            <div class="text-caption text-success-lighten-2">+{{ unifiedKPIs.clientsGrowth }}%</div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="2">
        <v-card class="kpi-card" color="primary">
          <v-card-text class="text-center">
            <div class="text-h4 font-weight-bold">R$ {{ formatCurrency(unifiedKPIs.revenue) }}</div>
            <div class="text-body-2">Receita Nova</div>
            <div class="text-caption text-primary-lighten-2">{{ period }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="2">
        <v-card class="kpi-card" color="orange">
          <v-card-text class="text-center">
            <div class="text-h4 font-weight-bold">{{ unifiedKPIs.winRate }}%</div>
            <MetricTooltip metric="Win Rate">
              <div class="text-body-2">Win Rate</div>
            </MetricTooltip>
            <div class="text-caption text-orange-lighten-2">Global</div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="2">
        <v-card class="kpi-card" color="purple">
          <v-card-text class="text-center">
            <div class="text-h4 font-weight-bold">R$ {{ formatCurrency(unifiedKPIs.cac) }}</div>
            <MetricTooltip metric="CAC">
              <div class="text-body-2">CAC Global</div>
            </MetricTooltip>
            <div class="text-caption text-purple-lighten-2">Gasto ÷ Clientes</div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="2">
        <v-card class="kpi-card" color="teal">
          <v-card-text class="text-center">
            <div class="text-h4 font-weight-bold">{{ unifiedKPIs.salesCycle }}d</div>
            <MetricTooltip metric="Sales Cycle">
              <div class="text-body-2">Sales Cycle</div>
            </MetricTooltip>
            <div class="text-caption text-teal-lighten-2">Mediano</div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="2">
        <v-card class="kpi-card" color="indigo">
          <v-card-text class="text-center">
            <div class="text-h4 font-weight-bold">{{ unifiedKPIs.nrr }}%</div>
            <MetricTooltip metric="NRR">
              <div class="text-body-2">NRR</div>
            </MetricTooltip>
            <div class="text-caption text-indigo-lighten-2">Retenção</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Visão Unificada -->
    <div v-if="viewMode === 'unified'">
      <v-row>
        <!-- Funil Unificado -->
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title class="d-flex align-center gap-2">
              <v-icon>mdi-chart-sankey</v-icon>
              Funil Unificado OCS
            </v-card-title>
            <v-card-text>
              <div class="funnel-unified">
                <div 
                  v-for="(stage, index) in unifiedFunnel" 
                  :key="stage.id"
                  class="funnel-stage"
                  :class="{ 'junction': stage.isJunction }"
                >
                  <div class="stage-header">
                    <span class="stage-name">{{ stage.name }}</span>
                    <v-chip 
                      v-if="stage.isJunction" 
                      size="x-small" 
                      color="warning"
                    >
                      Junção
                    </v-chip>
                  </div>
                  
                  <div class="stage-metrics">
                    <div class="metric-value">{{ stage.count }}</div>
                    <div class="metric-label">{{ stage.label }}</div>
                  </div>
                  
                  <div v-if="index < unifiedFunnel.length - 1" class="conversion-rate">
                    {{ stage.cvr }}%
                  </div>
                  
                  <v-progress-linear
                    :model-value="stage.percentage"
                    :color="stage.color"
                    height="8"
                    rounded
                  />
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        
        <!-- Legenda de Métricas -->
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Legenda de Métricas</v-card-title>
            <v-card-text>
              <div class="metrics-legend">
                <div 
                  v-for="metric in metricsLegend" 
                  :key="metric.key"
                  class="legend-item"
                >
                  <div class="legend-name">{{ metric.name }}</div>
                  <div class="legend-description">{{ metric.description }}</div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Visão Por Funil -->
    <div v-else>
      <v-row>
        <!-- Cards dos Funis -->
        <v-col 
          v-for="funnel in funnels" 
          :key="funnel.id"
          cols="12" 
          md="6"
        >
          <v-card class="funnel-card" :color="funnel.color">
            <v-card-title class="d-flex align-center justify-space-between">
              <div>
                <div class="text-h6">{{ funnel.name }}</div>
                <div class="text-caption opacity-80">{{ funnel.objective }}</div>
              </div>
              <v-icon size="32">{{ funnel.icon }}</v-icon>
            </v-card-title>
            
            <v-card-text>
              <!-- Lanes de Aquisição -->
              <div class="mb-4">
                <div class="text-subtitle-2 mb-2">Canais de Aquisição</div>
                <div class="lanes-grid">
                  <div 
                    v-for="lane in funnel.lanes" 
                    :key="lane.id"
                    class="lane-item"
                  >
                    <div class="lane-name">{{ lane.name }}</div>
                    <div class="lane-metrics">
                      <span class="metric">CPL: R$ {{ lane.cpl }}</span>
                      <span class="metric">CVR: {{ lane.cvr }}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Junção MQL -->
              <div class="junction-section mb-4">
                <div class="text-subtitle-2 mb-2">
                  <v-icon size="16" class="mr-1">mdi-call-merge</v-icon>
                  Junção MQL
                </div>
                <div class="junction-metrics">
                  <div class="metric-item">
                    <span class="value">{{ funnel.junction.mqlTotal }}</span>
                    <span class="label">MQL Total</span>
                  </div>
                  <div class="metric-item">
                    <span class="value">R$ {{ funnel.junction.costPerMql }}</span>
                    <span class="label">Custo/MQL</span>
                  </div>
                </div>
              </div>
              
              <!-- Pipeline de Conversão -->
              <div class="conversion-pipeline">
                <div class="text-subtitle-2 mb-2">Pipeline de Conversão</div>
                <div class="pipeline-stages">
                  <div 
                    v-for="stage in funnel.pipeline" 
                    :key="stage.id"
                    class="pipeline-stage"
                  >
                    <div class="stage-bar">
                      <v-progress-linear
                        :model-value="stage.percentage"
                        color="white"
                        height="20"
                        rounded
                      />
                      <div class="stage-overlay">
                        <span class="stage-name">{{ stage.name }}</span>
                        <span class="stage-count">{{ stage.count }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="pipeline-summary mt-2">
                  <v-chip size="small" color="success">
                    Win Rate: {{ funnel.winRate }}%
                  </v-chip>
                  <v-chip size="small" color="info" class="ml-2">
                    Ciclo: {{ funnel.salesCycle }}d
                  </v-chip>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import MetricTooltip from '@/components/MetricTooltip.vue'

const viewMode = ref('unified')
const period = ref('30d')

// KPIs Unificados
const unifiedKPIs = ref({
  clients: 12,
  clientsGrowth: 15,
  revenue: 485000,
  winRate: 23,
  cac: 2850,
  salesCycle: 45,
  nrr: 118
})

// Funil Unificado
const unifiedFunnel = ref([
  {
    id: 'visits',
    name: 'Visitas',
    count: '2.4k',
    label: 'visitantes',
    percentage: 100,
    color: 'blue',
    cvr: 8.5
  },
  {
    id: 'leads',
    name: 'Leads',
    count: '204',
    label: 'leads gerados',
    percentage: 85,
    color: 'green',
    cvr: 35
  },
  {
    id: 'mql',
    name: 'MQL',
    count: '71',
    label: 'qualificados',
    percentage: 60,
    color: 'orange',
    isJunction: true,
    cvr: 42
  },
  {
    id: 'sql',
    name: 'SQL',
    count: '30',
    label: 'vendas qualif.',
    percentage: 40,
    color: 'purple',
    cvr: 23
  },
  {
    id: 'clients',
    name: 'Clientes',
    count: '7',
    label: 'fechados',
    percentage: 23,
    color: 'success'
  }
])

// Funis Específicos
const funnels = ref([
  {
    id: 'intertravados',
    name: 'Pisos Intertravados',
    objective: 'Obras privadas - ciclo curto',
    color: 'blue',
    icon: 'mdi-home-floor-1',
    lanes: [
      { id: 'google', name: 'Google Search', cpl: 45, cvr: 12 },
      { id: 'seo', name: 'SEO Blog', cpl: 28, cvr: 8 },
      { id: 'instagram', name: 'Instagram', cpl: 35, cvr: 15 }
    ],
    junction: {
      mqlTotal: 42,
      costPerMql: 380
    },
    pipeline: [
      { id: 'mql', name: 'MQL', count: 42, percentage: 100 },
      { id: 'sql', name: 'SQL', count: 18, percentage: 43 },
      { id: 'visit', name: 'Visita', count: 12, percentage: 29 },
      { id: 'proposal', name: 'Proposta', count: 8, percentage: 19 },
      { id: 'won', name: 'Fechado', count: 4, percentage: 10 }
    ],
    winRate: 22,
    salesCycle: 28
  },
  {
    id: 'estrutural',
    name: 'Bloco Estrutural',
    objective: 'Construtoras - ciclo longo',
    color: 'orange',
    icon: 'mdi-office-building',
    lanes: [
      { id: 'youtube', name: 'YouTube Técnico', cpl: 85, cvr: 6 },
      { id: 'linkedin', name: 'LinkedIn B2B', cpl: 120, cvr: 4 },
      { id: 'google-b2b', name: 'Google B2B', cpl: 95, cvr: 8 }
    ],
    junction: {
      mqlTotal: 18,
      costPerMql: 850
    },
    pipeline: [
      { id: 'mql', name: 'MQL', count: 18, percentage: 100 },
      { id: 'sql', name: 'SQL', count: 8, percentage: 44 },
      { id: 'proposal', name: 'Proposta', count: 5, percentage: 28 },
      { id: 'won', name: 'Fechado', count: 2, percentage: 11 }
    ],
    winRate: 25,
    salesCycle: 65
  },
  {
    id: 'publicas',
    name: 'Obras Públicas',
    objective: 'Licitações e cotações',
    color: 'purple',
    icon: 'mdi-city',
    lanes: [
      { id: 'portais', name: 'Portais Compra', cpl: 180, cvr: 3 },
      { id: 'email', name: 'E-mail Técnico', cpl: 95, cvr: 5 },
      { id: 'network', name: 'Network', cpl: 65, cvr: 8 }
    ],
    junction: {
      mqlTotal: 11,
      costPerMql: 1200
    },
    pipeline: [
      { id: 'mql', name: 'MQL', count: 11, percentage: 100 },
      { id: 'sql', name: 'SQL', count: 4, percentage: 36 },
      { id: 'proposal', name: 'ATA/Proposta', count: 3, percentage: 27 },
      { id: 'won', name: 'Fechado', count: 1, percentage: 9 }
    ],
    winRate: 25,
    salesCycle: 90
  },
  {
    id: 'reativacao',
    name: 'Reativação',
    objective: 'Obras pausadas',
    color: 'teal',
    icon: 'mdi-refresh',
    lanes: [
      { id: 'crm', name: 'CRM Stale', cpl: 25, cvr: 18 }
    ],
    junction: {
      mqlTotal: 8,
      costPerMql: 150
    },
    pipeline: [
      { id: 'sql', name: 'SQL Reativado', count: 8, percentage: 100 },
      { id: 'proposal', name: 'Proposta Nova', count: 5, percentage: 63 },
      { id: 'won', name: 'Fechado', count: 2, percentage: 25 }
    ],
    winRate: 25,
    salesCycle: 21
  }
])

// Legenda de Métricas
const metricsLegend = ref([
  { key: 'mql', name: 'MQL', description: 'Lead com fit/interesse mínimo validado pelo marketing.' },
  { key: 'sql', name: 'SQL', description: 'Lead qualificado por vendas (dor + orçamento + autoridade).' },
  { key: 'cvr', name: 'CVR', description: 'Taxa de conversão entre etapas.' },
  { key: 'cpl', name: 'CPL', description: 'Gasto de mídia por lead gerado.' },
  { key: 'cac', name: 'CAC', description: 'Custo total para conquistar 1 cliente.' },
  { key: 'winrate', name: 'Win Rate', description: 'Clientes ÷ oportunidades (SQL).' },
  { key: 'cycle', name: 'Sales Cycle', description: 'Dias até fechar a venda.' },
  { key: 'nrr', name: 'NRR', description: 'Retenção líquida de receita (inclui expansão e churn).' }
])

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}
</script>

<style scoped>
.kpi-card {
  color: white;
  transition: transform 0.2s ease;
}

.kpi-card:hover {
  transform: translateY(-2px);
}

.kpi-card .v-card-text {
  color: white !important;
}

.funnel-unified {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.funnel-stage {
  padding: 16px;
  border-radius: 8px;
  background: rgba(0,0,0,0.02);
  border: 1px solid rgba(0,0,0,0.1);
}

.funnel-stage.junction {
  background: rgba(255,193,7,0.1);
  border-color: #FFC107;
}

.stage-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.stage-name {
  font-weight: 600;
  font-size: 1.1em;
}

.stage-metrics {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 8px;
}

.metric-value {
  font-size: 1.5em;
  font-weight: bold;
}

.metric-label {
  color: #666;
  font-size: 0.9em;
}

.conversion-rate {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: #2196F3;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 600;
}

.funnel-card {
  color: white;
  height: 100%;
}

.funnel-card .v-card-title,
.funnel-card .v-card-text {
  color: white !important;
}

.lanes-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lane-item {
  background: rgba(255,255,255,0.1);
  padding: 8px 12px;
  border-radius: 6px;
}

.lane-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.lane-metrics {
  display: flex;
  gap: 12px;
}

.metric {
  font-size: 0.85em;
  opacity: 0.9;
}

.junction-section {
  background: rgba(255,255,255,0.1);
  padding: 12px;
  border-radius: 8px;
}

.junction-metrics {
  display: flex;
  gap: 16px;
}

.metric-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.metric-item .value {
  font-size: 1.2em;
  font-weight: bold;
}

.metric-item .label {
  font-size: 0.8em;
  opacity: 0.8;
}

.pipeline-stages {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pipeline-stage {
  position: relative;
}

.stage-bar {
  position: relative;
}

.stage-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  font-size: 0.85em;
  font-weight: 600;
}

.metrics-legend {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.legend-item {
  padding: 12px;
  background: rgba(0,0,0,0.02);
  border-radius: 6px;
  border-left: 4px solid #2196F3;
}

.legend-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.legend-description {
  font-size: 0.9em;
  color: #666;
  line-height: 1.4;
}
</style>