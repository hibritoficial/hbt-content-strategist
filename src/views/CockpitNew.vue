<template>
  <v-container fluid>
    <!-- Filtros de Período -->
    <div class="d-flex justify-end mb-4">
      <v-btn-toggle v-model="period" mandatory size="small">
        <v-btn value="7d">7d</v-btn>
        <v-btn value="30d">30d</v-btn>
        <v-btn value="90d">90d</v-btn>
      </v-btn-toggle>
    </div>

    <!-- Cockpit Portfólio (Hibrit) -->
    <div v-if="isPortfolioScope && canSwitchScope" class="hibrit-cockpit">
      <!-- Hero Command Center -->
      <div class="command-hero">
        <div class="hero-grid">
          <div class="hero-left">
            <div class="command-title">
              <div class="title-main">HIBRIT COMMAND CENTER</div>
              <div class="title-sub">Central de Controle Avançada</div>
            </div>
            
            <div class="status-indicators">
              <div class="status-item active">
                <div class="status-dot"></div>
                <span>Sistemas Operacionais</span>
              </div>
              <div class="status-item">
                <div class="status-dot warning"></div>
                <span>{{ portfolioData.length }} Clientes Ativos</span>
              </div>
              <div class="status-item">
                <div class="status-dot success"></div>
                <span>IA Estratégica Online</span>
              </div>
            </div>
          </div>
          
          <div class="hero-right">
            <div class="hologram-display">
              <div class="hologram-ring">
                <div class="hologram-center">
                  <v-icon size="48" color="#00E5FF">mdi-radar</v-icon>
                </div>
              </div>
              <div class="scan-lines"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Control Panels Grid -->
      <div class="control-panels">
        <!-- Mission Control -->
        <div class="control-panel mission-control">
          <div class="panel-header">
            <v-icon color="#00E5FF">mdi-rocket-launch</v-icon>
            <span>MISSION CONTROL</span>
            <div class="panel-status online"></div>
          </div>
          
          <div class="panel-content">
            <div class="metric-display">
              <div class="metric-value">{{ totalActiveProjects }}</div>
              <div class="metric-label">Projetos Ativos</div>
            </div>
            
            <div class="progress-rings">
              <div class="ring-container">
                <svg class="progress-ring" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" class="ring-bg"/>
                  <circle cx="50" cy="50" r="45" class="ring-progress" :stroke-dasharray="circumference" :stroke-dashoffset="progressOffset1"/>
                </svg>
                <div class="ring-label">Conteúdo</div>
              </div>
              
              <div class="ring-container">
                <svg class="progress-ring" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" class="ring-bg"/>
                  <circle cx="50" cy="50" r="45" class="ring-progress" :stroke-dasharray="circumference" :stroke-dashoffset="progressOffset2"/>
                </svg>
                <div class="ring-label">Funis</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Client Matrix -->
        <div class="control-panel client-matrix">
          <div class="panel-header">
            <v-icon color="#00E5FF">mdi-matrix</v-icon>
            <span>CLIENT MATRIX</span>
            <div class="panel-status scanning"></div>
          </div>
          
          <div class="panel-content">
            <div class="matrix-grid">
              <div 
                v-for="client in portfolioData.slice(0, 6)" 
                :key="client.workspace_id"
                class="matrix-cell"
                @click="selectClient(null, { item: client })"
              >
                <div class="cell-header">
                  <div class="client-name">{{ client.client_name }}</div>
                  <div class="health-indicator" :class="getHealthClass(client.health_score)">
                    {{ client.health_score }}%
                  </div>
                </div>
                
                <div class="cell-metrics">
                  <div class="mini-metric">
                    <span class="metric-number">{{ client.published_last_30d }}</span>
                    <span class="metric-unit">posts</span>
                  </div>
                  <div class="mini-metric">
                    <span class="metric-number">{{ client.pipeline_conversion_rate }}%</span>
                    <span class="metric-unit">conv</span>
                  </div>
                </div>
                
                <div class="cell-alerts">
                  <div 
                    v-for="alert in getClientAlerts(client.workspace_id).slice(0, 3)"
                    :key="alert.alert_type"
                    class="alert-dot"
                    :class="alert.severity"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Analytics Engine -->
        <div class="control-panel analytics-engine">
          <div class="panel-header">
            <v-icon color="#00E5FF">mdi-brain</v-icon>
            <span>ANALYTICS ENGINE</span>
            <div class="panel-status processing"></div>
          </div>
          
          <div class="panel-content">
            <div class="analytics-display">
              <div class="data-stream">
                <div class="stream-line" v-for="i in 8" :key="i" :style="{ animationDelay: i * 0.2 + 's' }"></div>
              </div>
              
              <div class="analytics-metrics">
                <div class="analytics-item">
                  <div class="analytics-icon">
                    <v-icon color="#00E5FF">mdi-trending-up</v-icon>
                  </div>
                  <div class="analytics-data">
                    <div class="analytics-value">+{{ totalGrowth }}%</div>
                    <div class="analytics-label">Crescimento Mês</div>
                  </div>
                </div>
                
                <div class="analytics-item">
                  <div class="analytics-icon">
                    <v-icon color="#00E5FF">mdi-target</v-icon>
                  </div>
                  <div class="analytics-data">
                    <div class="analytics-value">{{ totalConversions }}</div>
                    <div class="analytics-label">Conversões</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- System Status -->
        <div class="control-panel system-status">
          <div class="panel-header">
            <v-icon color="#00E5FF">mdi-monitor-dashboard</v-icon>
            <span>SYSTEM STATUS</span>
            <div class="panel-status optimal"></div>
          </div>
          
          <div class="panel-content">
            <div class="system-grid">
              <div class="system-item">
                <div class="system-icon">
                  <v-icon color="#4CAF50">mdi-server</v-icon>
                </div>
                <div class="system-info">
                  <div class="system-name">Content Engine</div>
                  <div class="system-value">99.9% Uptime</div>
                </div>
              </div>
              
              <div class="system-item">
                <div class="system-icon">
                  <v-icon color="#FF9800">mdi-chart-sankey</v-icon>
                </div>
                <div class="system-info">
                  <div class="system-name">Funnel Core</div>
                  <div class="system-value">{{ activeFunnels }} Ativos</div>
                </div>
              </div>
              
              <div class="system-item">
                <div class="system-icon">
                  <v-icon color="#2196F3">mdi-robot</v-icon>
                </div>
                <div class="system-info">
                  <div class="system-name">AI Strategic</div>
                  <div class="system-value">Learning</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Client Cockpits -->
        <div class="control-panel client-cockpits">
          <div class="panel-header">
            <v-icon color="#00E5FF">mdi-view-dashboard</v-icon>
            <span>CLIENT COCKPITS</span>
            <div class="panel-status online"></div>
          </div>
          
          <div class="panel-content">
            <div class="cockpit-grid">
              <div class="cockpit-item" @click="goToOCSCockpit">
                <div class="cockpit-icon">
                  <v-icon color="#FF6B35">mdi-home-floor-1</v-icon>
                </div>
                <div class="cockpit-info">
                  <div class="cockpit-name">OCS Cockpit</div>
                  <div class="cockpit-description">Blocos & Intertravados</div>
                </div>
                <div class="cockpit-arrow">
                  <v-icon color="#00E5FF">mdi-arrow-right</v-icon>
                </div>
              </div>
              
              <div class="cockpit-item disabled">
                <div class="cockpit-icon">
                  <v-icon color="#9E9E9E">mdi-plus</v-icon>
                </div>
                <div class="cockpit-info">
                  <div class="cockpit-name">Novo Cliente</div>
                  <div class="cockpit-description">Em breve</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cockpit Cliente -->
    <div v-else-if="isClientScope && currentClient">
      <h1 class="text-h4 mb-6">Cockpit Executivo - {{ currentClient.name }}</h1>
      
      <v-row>
        <!-- Saúde do Funil -->
        <v-col cols="12" md="6" lg="3">
          <v-card 
            class="cockpit-card" 
            @click="goToFunnel"
            :color="getFunnelHealthColor()"
          >
            <v-card-text>
              <div class="d-flex align-center justify-space-between">
                <div>
                  <div class="text-h6">Saúde do Funil</div>
                  <div class="text-h4 font-weight-bold">
                    {{ clientData?.active_funnels || 0 }}/{{ clientData?.total_funnels || 0 }}
                  </div>
                  <div class="text-caption">funis ativos</div>
                </div>
                <v-icon size="48" color="white">mdi-chart-sankey</v-icon>
              </div>
              
              <div class="mt-3">
                <v-chip 
                  v-for="bottleneck in funnelBottlenecks"
                  :key="bottleneck"
                  size="x-small"
                  class="mr-1"
                  @click.stop="goToFunnelSection(bottleneck)"
                >
                  {{ bottleneck }}
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Produção de Conteúdo -->
        <v-col cols="12" md="6" lg="3">
          <v-card 
            class="cockpit-card" 
            color="purple"
            @click="goToCalendar"
          >
            <v-card-text>
              <div class="d-flex align-center justify-space-between">
                <div>
                  <div class="text-h6">Produção</div>
                  <div class="text-h4 font-weight-bold">
                    {{ clientData?.next_7_days_count || 0 }}
                  </div>
                  <div class="text-caption">próximos 7 dias</div>
                </div>
                <v-icon size="48" color="white">mdi-calendar-clock</v-icon>
              </div>
              
              <div class="mt-3 d-flex gap-1">
                <v-chip size="x-small" color="orange">
                  {{ clientData?.copy_count || 0 }} copy
                </v-chip>
                <v-chip size="x-small" color="blue">
                  {{ clientData?.design_count || 0 }} design
                </v-chip>
                <v-chip size="x-small" color="green">
                  {{ clientData?.ready_count || 0 }} prontos
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- CTAs & Conversas -->
        <v-col cols="12" md="6" lg="3">
          <v-card 
            class="cockpit-card" 
            color="teal"
            @click="goToMetrics"
          >
            <v-card-text>
              <div class="d-flex align-center justify-space-between">
                <div>
                  <div class="text-h6">CTAs & Conversas</div>
                  <div class="text-h4 font-weight-bold">
                    {{ clientData?.total_ctas || 0 }}
                  </div>
                  <div class="text-caption">gatilhos ativos</div>
                </div>
                <v-icon size="48" color="white">mdi-message-reply</v-icon>
              </div>
              
              <div class="mt-3">
                <v-chip size="x-small" color="success">
                  +{{ Math.floor(Math.random() * 50) }} leads
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Alertas -->
        <v-col cols="12" md="6" lg="3">
          <v-card class="cockpit-card" color="grey-darken-1">
            <v-card-text>
              <div class="d-flex align-center justify-space-between">
                <div>
                  <div class="text-h6">Alertas</div>
                  <div class="text-h4 font-weight-bold">
                    {{ clientAlerts.length }}
                  </div>
                  <div class="text-caption">requerem atenção</div>
                </div>
                <v-icon size="48" color="white">mdi-alert-circle</v-icon>
              </div>
              
              <div class="mt-3">
                <div 
                  v-for="alert in clientAlerts.slice(0, 2)"
                  :key="alert.alert_type"
                  class="d-flex align-center gap-2 mb-1"
                  @click.stop="goToAlert(alert)"
                >
                  <v-icon 
                    :color="getAlertColor(alert.severity)"
                    size="12"
                  >
                    mdi-circle
                  </v-icon>
                  <span class="text-caption">{{ alert.message }}</span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Estado: Selecione um Cliente -->
    <div v-else-if="isPortfolioScope && !canSwitchScope">
      <v-alert type="info" class="text-center">
        <div class="text-h6 mb-2">Bem-vindo ao seu Cockpit</div>
        <div>Acompanhe o desempenho do seu negócio em tempo real</div>
      </v-alert>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCockpitStore } from '@/stores/cockpit'

const router = useRouter()
const cockpitStore = useCockpitStore()

const period = ref('30d')

// Usar dados do store
const {
  isPortfolioScope,
  isClientScope,
  currentClient,
  portfolioData,
  clientData,
  clientAlerts,
  loading,
  canSwitchScope
} = cockpitStore

// Dados do dashboard futurístico
const totalActiveProjects = computed(() => portfolioData.value?.length * 3 || 24)
const totalGrowth = computed(() => Math.floor(Math.random() * 30) + 15)
const totalConversions = computed(() => portfolioData.value?.reduce((sum, client) => sum + (client.published_last_30d || 0), 0) || 847)
const activeFunnels = computed(() => portfolioData.value?.length * 2 || 14)

// Progress rings
const circumference = 2 * Math.PI * 45
const progressOffset1 = computed(() => circumference - (0.75 * circumference))
const progressOffset2 = computed(() => circumference - (0.68 * circumference))

// Health class helper
const getHealthClass = (score) => {
  if (score >= 90) return 'excellent'
  if (score >= 75) return 'good'
  if (score >= 60) return 'warning'
  return 'critical'
}

const portfolioHeaders = [
  { title: 'Cliente', key: 'client_name' },
  { title: 'Saúde', key: 'health_score' },
  { title: 'Publicados (30d)', key: 'published_last_30d' },
  { title: 'Pipeline', key: 'pipeline_conversion_rate' },
  { title: 'Alertas', key: 'alerts' }
]

const funnelBottlenecks = computed(() => {
  const bottlenecks = []
  if (clientData.value?.copy_count > 3) bottlenecks.push('Copy')
  if (clientData.value?.design_count > 2) bottlenecks.push('Design')
  return bottlenecks
})

const selectClient = async (event, { item }) => {
  const workspace = { id: item.workspace_id, name: item.client_name }
  await cockpitStore.fixClient(workspace)
}

const getFunnelHealthColor = () => {
  const active = clientData?.active_funnels || 0
  const total = clientData?.total_funnels || 0
  
  if (active === 0) return 'error'
  if (active / total >= 0.8) return 'success'
  return 'warning'
}

// Usar helpers do store
const { getHealthColor, getAlertColor, getClientAlerts } = cockpitStore

// Navegação
const goToFunnel = () => router.push('/funnels')
const goToCalendar = () => router.push('/calendar')
const goToMetrics = () => router.push('/metrics')
const goToFunnelSection = (section) => router.push(`/funnels?focus=${section}`)
const goToAlert = (alert) => router.push(alert.action_url)
const goToOCSCockpit = () => router.push('/cockpit/ocs')

onMounted(async () => {
  await cockpitStore.initialize()
})
</script>

<style scoped>
.hibrit-cockpit {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
  padding: 0;
  margin: -24px;
}

.command-hero {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  padding: 60px 40px;
  position: relative;
  overflow: hidden;
}

.command-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(0, 229, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(0, 229, 255, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 60px;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.command-title {
  margin-bottom: 40px;
}

.title-main {
  font-size: 3.5rem;
  font-weight: 900;
  color: #00E5FF;
  text-shadow: 0 0 20px rgba(0, 229, 255, 0.5);
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.title-sub {
  font-size: 1.2rem;
  color: #94a3b8;
  font-weight: 300;
  letter-spacing: 1px;
}

.status-indicators {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #e2e8f0;
  font-size: 0.9rem;
  font-weight: 500;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00E5FF;
  box-shadow: 0 0 10px rgba(0, 229, 255, 0.6);
  animation: pulse-dot 2s infinite;
}

.status-dot.warning {
  background: #FF9800;
  box-shadow: 0 0 10px rgba(255, 152, 0, 0.6);
}

.status-dot.success {
  background: #4CAF50;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.6);
}

@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
}

.hologram-display {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.hologram-ring {
  width: 100%;
  height: 100%;
  border: 2px solid #00E5FF;
  border-radius: 50%;
  position: relative;
  animation: rotate 10s linear infinite;
  box-shadow: 0 0 30px rgba(0, 229, 255, 0.3),
              inset 0 0 30px rgba(0, 229, 255, 0.1);
}

.hologram-ring::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 1px solid rgba(0, 229, 255, 0.3);
  border-radius: 50%;
  animation: rotate 15s linear infinite reverse;
}

.hologram-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.scan-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2px,
    rgba(0, 229, 255, 0.03) 2px,
    rgba(0, 229, 255, 0.03) 4px
  );
  animation: scan 3s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes scan {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

.control-panels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  padding: 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.control-panel {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 229, 255, 0.2);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.control-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #00E5FF, #0288D1, #00E5FF);
  background-size: 200% 100%;
  animation: gradient-flow 3s ease-in-out infinite;
}

@keyframes gradient-flow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.control-panel:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 229, 255, 0.15);
  border-color: rgba(0, 229, 255, 0.4);
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  font-weight: 700;
  font-size: 0.9rem;
  color: #1e293b;
  letter-spacing: 1px;
}

.panel-status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: auto;
}

.panel-status.online {
  background: #4CAF50;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.6);
  animation: pulse-dot 2s infinite;
}

.panel-status.scanning {
  background: #FF9800;
  animation: pulse-dot 1.5s infinite;
}

.panel-status.processing {
  background: #2196F3;
  animation: pulse-dot 1s infinite;
}

.panel-status.optimal {
  background: #00E5FF;
  animation: pulse-dot 2.5s infinite;
}

.metric-display {
  text-align: center;
  margin-bottom: 24px;
}

.metric-value {
  font-size: 3rem;
  font-weight: 900;
  color: #00E5FF;
  text-shadow: 0 0 10px rgba(0, 229, 255, 0.3);
}

.metric-label {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
  margin-top: 4px;
}

.progress-rings {
  display: flex;
  justify-content: space-around;
}

.ring-container {
  text-align: center;
}

.progress-ring {
  width: 80px;
  height: 80px;
  transform: rotate(-90deg);
}

.ring-bg {
  fill: none;
  stroke: #e2e8f0;
  stroke-width: 6;
}

.ring-progress {
  fill: none;
  stroke: #00E5FF;
  stroke-width: 6;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.8s ease;
  filter: drop-shadow(0 0 4px rgba(0, 229, 255, 0.4));
}

.ring-label {
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 8px;
  font-weight: 500;
}

.matrix-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.matrix-cell {
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border: 1px solid rgba(0, 229, 255, 0.2);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.matrix-cell::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00E5FF, transparent);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.matrix-cell:hover::before {
  transform: translateX(100%);
}

.matrix-cell:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 229, 255, 0.15);
  border-color: #00E5FF;
}

.cell-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.client-name {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.9rem;
}

.health-indicator {
  font-size: 0.8rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 12px;
}

.health-indicator.excellent {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
}

.health-indicator.good {
  background: rgba(0, 229, 255, 0.2);
  color: #00E5FF;
}

.health-indicator.warning {
  background: rgba(255, 152, 0, 0.2);
  color: #FF9800;
}

.health-indicator.critical {
  background: rgba(244, 67, 54, 0.2);
  color: #F44336;
}

.cell-metrics {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.mini-metric {
  text-align: center;
}

.metric-number {
  display: block;
  font-weight: 700;
  color: #00E5FF;
  font-size: 1.1rem;
}

.metric-unit {
  font-size: 0.7rem;
  color: #64748b;
}

.cell-alerts {
  display: flex;
  gap: 4px;
}

.alert-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.alert-dot.high {
  background: #F44336;
  box-shadow: 0 0 4px rgba(244, 67, 54, 0.6);
}

.alert-dot.medium {
  background: #FF9800;
  box-shadow: 0 0 4px rgba(255, 152, 0, 0.6);
}

.alert-dot.low {
  background: #4CAF50;
  box-shadow: 0 0 4px rgba(76, 175, 80, 0.6);
}

.analytics-display {
  position: relative;
}

.data-stream {
  height: 60px;
  position: relative;
  margin-bottom: 20px;
  background: linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.1), transparent);
  border-radius: 8px;
  overflow: hidden;
}

.stream-line {
  position: absolute;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, #00E5FF, transparent);
  animation: stream-flow 2s linear infinite;
}

@keyframes stream-flow {
  0% { left: -2px; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}

.analytics-metrics {
  display: flex;
  justify-content: space-between;
}

.analytics-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.analytics-icon {
  width: 40px;
  height: 40px;
  background: rgba(0, 229, 255, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.analytics-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: #00E5FF;
}

.analytics-label {
  font-size: 0.8rem;
  color: #64748b;
}

.system-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.system-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: rgba(0, 229, 255, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(0, 229, 255, 0.1);
  transition: all 0.3s ease;
}

.system-item:hover {
  background: rgba(0, 229, 255, 0.1);
  border-color: rgba(0, 229, 255, 0.3);
}

.system-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.system-name {
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2px;
}

.system-value {
  font-size: 0.8rem;
  color: #64748b;
}

.cockpit-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cockpit-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(255, 107, 53, 0.05));
  border: 1px solid rgba(255, 107, 53, 0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.cockpit-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #FF6B35, transparent);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.cockpit-item:hover::before {
  transform: translateX(100%);
}

.cockpit-item:hover {
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.15), rgba(255, 107, 53, 0.08));
  border-color: #FF6B35;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.2);
}

.cockpit-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: rgba(158, 158, 158, 0.1);
  border-color: rgba(158, 158, 158, 0.2);
}

.cockpit-item.disabled:hover {
  transform: none;
  box-shadow: none;
}

.cockpit-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cockpit-info {
  flex: 1;
}

.cockpit-name {
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
  font-size: 1rem;
}

.cockpit-description {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
}

.cockpit-arrow {
  opacity: 0.6;
  transition: all 0.3s ease;
}

.cockpit-item:hover .cockpit-arrow {
  opacity: 1;
  transform: translateX(4px);
}

.cockpit-card {
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
}

.cockpit-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.cockpit-card .v-card-text {
  color: white !important;
}

.cockpit-card .text-h6,
.cockpit-card .text-h4,
.cockpit-card .text-caption {
  color: white !important;
}

@media (max-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .title-main {
    font-size: 2.5rem;
  }
  
  .control-panels {
    grid-template-columns: 1fr;
    padding: 20px;
  }
  
  .matrix-grid {
    grid-template-columns: 1fr;
  }
}
</style>