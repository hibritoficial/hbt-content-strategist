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
        <span class="breadcrumb-current">CXA Ultimate</span>
      </div>
      
      <div class="experiment-info">
        <h1>🚀 CXA Ultimate - Customer Experience Automation</h1>
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
      <v-container fluid class="pa-2 bg-surface-950 text-white">
          <!-- CXA Command Center Header -->
          <div class="cxa-header">
            <div class="cxa-title-section">
              <div class="cxa-logo">
                <v-icon size="32" color="#00ff9d">mdi-rocket-launch</v-icon>
              </div>
              <div class="cxa-info">
                <h1 class="cxa-title">CXA Command Center</h1>
                <p class="cxa-subtitle">Customer Experience Automation • Real-time Intelligence</p>
              </div>
            </div>
            
            <div class="cxa-controls">
              <div class="client-selector">
                <select v-model="selectedClient" class="cxa-select">
                  <option v-for="client in clientItems" :key="client.id" :value="client.id">
                    {{ client.name }}
                  </option>
                </select>
              </div>
              <div class="automation-status">
                <div class="status-indicator active">
                  <div class="pulse-dot"></div>
                  <span>Automação Ativa</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Real-time Alerts Bar -->
          <div class="alerts-bar">
            <div class="alert-item critical">
              <v-icon size="16">mdi-alert-circle</v-icon>
              <span>Funil "Conversão Premium" com queda de 23% nas últimas 2h</span>
              <button class="alert-action">Investigar</button>
            </div>
            <div class="alert-item warning">
              <v-icon size="16">mdi-clock-alert</v-icon>
              <span>SLA de resposta WhatsApp em 18min (meta: 15min)</span>
              <button class="alert-action">Otimizar</button>
            </div>
          </div>

          <!-- Main CXA Grid -->
          <div class="cxa-grid">
            <!-- Customer Journey Intelligence -->
            <div class="cxa-card journey-card">
              <div class="card-header">
                <h3>🎯 Customer Journey Intelligence</h3>
                <div class="journey-health">98% Health</div>
              </div>
              <div class="journey-flow">
                <div class="journey-stage" v-for="stage in journeyStages" :key="stage.name">
                  <div class="stage-icon" :class="stage.status">
                    <v-icon size="16">{{ stage.icon }}</v-icon>
                  </div>
                  <div class="stage-info">
                    <div class="stage-name">{{ stage.name }}</div>
                    <div class="stage-metrics">
                      <span class="conversion">{{ stage.conversion }}%</span>
                      <span class="volume">{{ stage.volume }}</span>
                    </div>
                  </div>
                  <div v-if="stage.automation" class="automation-badge">
                    <v-icon size="12">mdi-robot</v-icon>
                    <span>Auto</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Revenue Intelligence -->
            <div class="cxa-card revenue-card">
              <div class="card-header">
                <h3>💰 Revenue Intelligence</h3>
                <div class="revenue-trend positive">+34.7%</div>
              </div>
              <div class="revenue-metrics">
                <div class="revenue-main">
                  <div class="revenue-value">{{ money(revenueData.current) }}</div>
                  <div class="revenue-label">Receita Atual (30d)</div>
                </div>
                <div class="revenue-breakdown">
                  <div class="breakdown-item">
                    <span class="label">ARR Projetado</span>
                    <span class="value">{{ money(revenueData.arr) }}</span>
                  </div>
                  <div class="breakdown-item">
                    <span class="label">LTV Médio</span>
                    <span class="value">{{ money(revenueData.ltv) }}</span>
                  </div>
                  <div class="breakdown-item">
                    <span class="label">Churn Rate</span>
                    <span class="value churn">{{ revenueData.churn }}%</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Automation Engine -->
            <div class="cxa-card automation-card">
              <div class="card-header">
                <h3>🤖 Automation Engine</h3>
                <div class="automation-efficiency">94% Efficiency</div>
              </div>
              <div class="automation-list">
                <div class="automation-item" v-for="auto in automations" :key="auto.id">
                  <div class="auto-status" :class="auto.status"></div>
                  <div class="auto-info">
                    <div class="auto-name">{{ auto.name }}</div>
                    <div class="auto-impact">{{ auto.impact }}</div>
                  </div>
                  <div class="auto-metrics">
                    <span class="auto-saves">{{ auto.timeSaved }}h</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Predictive Analytics -->
            <div class="cxa-card prediction-card">
              <div class="card-header">
                <h3>🔮 Predictive Analytics</h3>
                <div class="prediction-accuracy">87% Accuracy</div>
              </div>
              <div class="predictions">
                <div class="prediction-item">
                  <div class="prediction-icon">
                    <v-icon size="20" color="#10b981">mdi-trending-up</v-icon>
                  </div>
                  <div class="prediction-content">
                    <div class="prediction-title">Próximos 7 dias</div>
                    <div class="prediction-value">+127 leads esperados</div>
                    <div class="prediction-confidence">Confiança: 89%</div>
                  </div>
                </div>
                <div class="prediction-item">
                  <div class="prediction-icon">
                    <v-icon size="20" color="#f59e0b">mdi-alert-triangle</v-icon>
                  </div>
                  <div class="prediction-content">
                    <div class="prediction-title">Risco de Churn</div>
                    <div class="prediction-value">12 clientes em risco</div>
                    <div class="prediction-confidence">Ação recomendada</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Experience Score -->
            <div class="cxa-card experience-card">
              <div class="card-header">
                <h3>⭐ Experience Score</h3>
                <div class="experience-score">8.7/10</div>
              </div>
              <div class="experience-breakdown">
                <div class="score-item">
                  <span class="score-label">Velocidade</span>
                  <div class="score-bar">
                    <div class="score-fill" style="width: 92%"></div>
                  </div>
                  <span class="score-value">9.2</span>
                </div>
                <div class="score-item">
                  <span class="score-label">Personalização</span>
                  <div class="score-bar">
                    <div class="score-fill" style="width: 85%"></div>
                  </div>
                  <span class="score-value">8.5</span>
                </div>
                <div class="score-item">
                  <span class="score-label">Resolução</span>
                  <div class="score-bar">
                    <div class="score-fill" style="width: 78%"></div>
                  </div>
                  <span class="score-value">7.8</span>
                </div>
              </div>
            </div>

            <!-- Growth Opportunities -->
            <div class="cxa-card opportunities-card">
              <div class="card-header">
                <h3>🚀 Growth Opportunities</h3>
                <div class="opportunity-potential">+R$ 47K</div>
              </div>
              <div class="opportunities-list">
                <div class="opportunity-item" v-for="opp in opportunities" :key="opp.id">
                  <div class="opp-priority" :class="opp.priority">{{ opp.priority.toUpperCase() }}</div>
                  <div class="opp-content">
                    <div class="opp-title">{{ opp.title }}</div>
                    <div class="opp-impact">{{ opp.impact }}</div>
                  </div>
                  <button class="opp-action">Implementar</button>
                </div>
              </div>
            </div>
          </div>
        </v-container>
    </div>

    <!-- Other Experiments -->
    <KnowledgeSystem experiment-type="cxa-ultimate" experiment-name="CXA Ultimate" />
    <OtherExperiments current-experiment="cxa-ultimate" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import OtherExperiments from '@/components/OtherExperiments.vue'
import KnowledgeSystem from '@/components/KnowledgeSystem.vue'

// Clientes
const clients = [
  { id: 'acme', name: 'ACME Solar' },
  { id: 'ocs', name: 'OCS Concretos' },
  { id: 'oasis', name: 'Oásis Natural' },
  { id: 'asa', name: 'ASA Mentoria' },
]
const clientItems = clients
const selectedClient = ref('acme')

// CXA Ultimate Data
const journeyStages = ref([
  { name: 'Awareness', icon: 'mdi-eye', conversion: 12.4, volume: '2.3K', status: 'excellent', automation: true },
  { name: 'Interest', icon: 'mdi-heart', conversion: 8.7, volume: '287', status: 'good', automation: true },
  { name: 'Consideration', icon: 'mdi-scale-balance', conversion: 34.2, volume: '98', status: 'excellent', automation: false },
  { name: 'Purchase', icon: 'mdi-cart', conversion: 28.9, volume: '34', status: 'warning', automation: true },
  { name: 'Retention', icon: 'mdi-account-heart', conversion: 89.3, volume: '30', status: 'excellent', automation: true }
])

const revenueData = ref({
  current: 247800,
  arr: 2974000,
  ltv: 8940,
  churn: 2.3
})

const automations = ref([
  { id: 1, name: 'Lead Scoring Automático', impact: '+23% conversão', timeSaved: 12, status: 'active' },
  { id: 2, name: 'Nurturing Personalizado', impact: '+18% engajamento', timeSaved: 8, status: 'active' },
  { id: 3, name: 'Reativação Inteligente', impact: '+34% winback', timeSaved: 15, status: 'active' },
  { id: 4, name: 'Upsell Preditivo', impact: '+27% revenue', timeSaved: 6, status: 'paused' }
])

const opportunities = ref([
  { id: 1, title: 'Otimizar Funil de Conversão', impact: '+R$ 23K/mês', priority: 'high' },
  { id: 2, title: 'Implementar Chat Inteligente', impact: '+R$ 15K/mês', priority: 'medium' },
  { id: 3, title: 'Personalização Avançada', impact: '+R$ 9K/mês', priority: 'low' }
])

const money = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const exportInterface = () => {
  console.log('Export CXA Ultimate')
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
  border-bottom: 1px solid rgba(0, 255, 157, 0.2);
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
  background: rgba(0, 255, 157, 0.1);
  border: 1px solid rgba(0, 255, 157, 0.3);
  border-radius: 6px;
  color: #00ff9d;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.breadcrumb-btn:hover {
  background: rgba(0, 255, 157, 0.2);
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
  background: linear-gradient(135deg, #00ff9d, #007bff);
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

/* CXA Ultimate Styles */
.cxa-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: linear-gradient(135deg, rgba(0, 255, 157, 0.1), rgba(0, 123, 255, 0.1));
  border: 1px solid rgba(0, 255, 157, 0.2);
  border-radius: 12px;
  margin-bottom: 16px;
}

.cxa-title-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cxa-logo {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cxa-title {
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cxa-subtitle {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 4px 0 0 0;
}

.cxa-controls {
  display: flex;
  align-items: center;
  gap: 20px;
}

.cxa-select {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
}

.automation-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 8px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

/* Alerts Bar */
.alerts-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  overflow-x: auto;
}

.alert-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.85rem;
  white-space: nowrap;
  min-width: 300px;
}

.alert-item.critical {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #fca5a5;
}

.alert-item.warning {
  background: rgba(245, 158, 11, 0.2);
  border: 1px solid rgba(245, 158, 11, 0.4);
  color: #fcd34d;
}

.alert-action {
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: white;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.alert-action:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* CXA Grid */
.cxa-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 16px;
}

.cxa-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.cxa-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 255, 157, 0.3);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-header h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: white;
}

/* Journey Card */
.journey-health {
  color: #10b981;
  font-weight: 600;
  font-size: 0.9rem;
}

.journey-flow {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.journey-stage {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  position: relative;
}

.stage-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stage-icon.excellent {
  background: linear-gradient(135deg, #10b981, #059669);
}

.stage-icon.good {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.stage-icon.warning {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.stage-info {
  flex: 1;
}

.stage-name {
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
}

.stage-metrics {
  display: flex;
  gap: 12px;
  font-size: 0.8rem;
}

.conversion {
  color: #10b981;
  font-weight: 600;
}

.volume {
  color: rgba(255, 255, 255, 0.6);
}

.automation-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background: rgba(0, 255, 157, 0.2);
  border: 1px solid rgba(0, 255, 157, 0.3);
  border-radius: 12px;
  font-size: 0.7rem;
  color: #00ff9d;
}

/* Revenue Card */
.revenue-trend {
  font-weight: 600;
  font-size: 0.9rem;
}

.revenue-trend.positive {
  color: #10b981;
}

.revenue-main {
  text-align: center;
  margin-bottom: 20px;
}

.revenue-value {
  font-size: 2.2rem;
  font-weight: 800;
  color: #00ff9d;
  margin-bottom: 4px;
}

.revenue-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

.revenue-breakdown {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
}

.breakdown-item .label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.breakdown-item .value {
  font-weight: 600;
  color: white;
}

.breakdown-item .value.churn {
  color: #f59e0b;
}

/* Automation Card */
.automation-efficiency {
  color: #00ff9d;
  font-weight: 600;
  font-size: 0.9rem;
}

.automation-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.automation-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
}

.auto-status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.auto-status.active {
  background: #10b981;
  animation: pulse 2s infinite;
}

.auto-status.paused {
  background: #f59e0b;
}

.auto-info {
  flex: 1;
}

.auto-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  margin-bottom: 2px;
}

.auto-impact {
  font-size: 0.8rem;
  color: #10b981;
}

.auto-saves {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
}

/* Prediction Card */
.prediction-accuracy {
  color: #007bff;
  font-weight: 600;
  font-size: 0.9rem;
}

.predictions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.prediction-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.prediction-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
}

.prediction-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
}

.prediction-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: #00ff9d;
  margin-bottom: 2px;
}

.prediction-confidence {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Experience Card */
.experience-score {
  font-size: 1.5rem;
  font-weight: 800;
  color: #fbbf24;
}

.experience-breakdown {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.score-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.score-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  min-width: 80px;
}

.score-bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
  transition: width 0.3s ease;
}

.score-value {
  font-size: 0.8rem;
  font-weight: 600;
  color: #fbbf24;
  min-width: 30px;
  text-align: right;
}

/* Opportunities Card */
.opportunity-potential {
  color: #00ff9d;
  font-weight: 700;
  font-size: 1rem;
}

.opportunities-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.opportunity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.opp-priority {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.opp-priority.high {
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
}

.opp-priority.medium {
  background: rgba(245, 158, 11, 0.2);
  color: #fcd34d;
}

.opp-priority.low {
  background: rgba(107, 114, 128, 0.2);
  color: #d1d5db;
}

.opp-content {
  flex: 1;
}

.opp-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  margin-bottom: 2px;
}

.opp-impact {
  font-size: 0.8rem;
  color: #10b981;
}

.opp-action {
  padding: 6px 12px;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.opp-action:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 255, 157, 0.3);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}


</style>