<template>
  <div class="crm-container">
    <!-- Floating Header -->
    <div class="floating-header">
      <div class="header-content">
        <div class="header-left">
          <div class="header-title">
            <div class="title-icon">💎</div>
            <div>
              <h1 class="main-title">Sales Flow</h1>
              <p class="subtitle">Vendas que fluem naturalmente</p>
            </div>
          </div>
        </div>
        
        <div class="header-actions">
          <v-btn
            class="smart-btn primary-btn"
            prepend-icon="mdi-plus-circle"
            @click="showQuickAdd = true"
          >
            Novo Lead
          </v-btn>
          
          <v-btn
            class="smart-btn secondary-btn"
            icon="mdi-tune"
            @click="showFilters = !showFilters"
          />
        </div>
      </div>
    </div>

    <!-- Smart Stats Bar -->
    <div class="stats-flow">
      <div 
        v-for="(stat, index) in smartStats" 
        :key="stat.key"
        class="stat-bubble"
        :class="{ active: selectedStat === stat.key }"
        @click="selectedStat = stat.key"
      >
        <div class="stat-icon">{{ stat.icon }}</div>
        <div class="stat-content">
          <div class="stat-number">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-trend" :class="stat.trendClass">
            {{ stat.trend }}
          </div>
        </div>
        <div v-if="index < smartStats.length - 1" class="flow-arrow">→</div>
      </div>
    </div>

    <!-- Main Flow View -->
    <div class="main-flow">
      <!-- Pipeline Flow -->
      <div v-if="currentView === 'pipeline'" class="pipeline-flow">
        <PipelineFlow />
      </div>
      
      <!-- Leads Intelligence -->
      <div v-else-if="currentView === 'leads'" class="leads-intelligence">
        <LeadsIntelligence />
      </div>
      
      <!-- Activities Stream -->
      <div v-else-if="currentView === 'activities'" class="activities-stream">
        <ActivitiesStream />
      </div>
    </div>

    <!-- Quick Add Overlay -->
    <v-overlay v-model="showQuickAdd" class="quick-overlay">
      <div class="quick-add-card">
        <div class="quick-header">
          <h3>✨ Novo Lead</h3>
          <v-btn icon="mdi-close" variant="text" @click="showQuickAdd = false" />
        </div>
        
        <div class="quick-form">
          <v-text-field
            v-model="quickLead.name"
            label="Nome do lead"
            variant="outlined"
            density="comfortable"
            class="mb-4"
          />
          
          <v-text-field
            v-model="quickLead.email"
            label="Email"
            variant="outlined"
            density="comfortable"
            class="mb-4"
          />
          
          <v-select
            v-model="quickLead.source"
            label="De onde veio?"
            :items="leadSources"
            variant="outlined"
            density="comfortable"
            class="mb-6"
          />
          
          <div class="quick-actions">
            <v-btn class="smart-btn secondary-btn" @click="showQuickAdd = false">
              Cancelar
            </v-btn>
            <v-btn class="smart-btn primary-btn" @click="addQuickLead">
              Adicionar Lead
            </v-btn>
          </div>
        </div>
      </div>
    </v-overlay>

    <!-- Smart Navigation -->
    <div class="smart-nav">
      <div 
        v-for="nav in navigation"
        :key="nav.key"
        class="nav-item"
        :class="{ active: currentView === nav.key }"
        @click="currentView = nav.key"
      >
        <div class="nav-icon">{{ nav.icon }}</div>
        <div class="nav-label">{{ nav.label }}</div>
        <div v-if="nav.count" class="nav-count">{{ nav.count }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PipelineFlow from '@/components/crm/PipelineFlow.vue'
import LeadsIntelligence from '@/components/crm/LeadsIntelligence.vue'
import ActivitiesStream from '@/components/crm/ActivitiesStream.vue'

const currentView = ref('pipeline')
const selectedStat = ref('leads')
const showQuickAdd = ref(false)
const showFilters = ref(false)

const quickLead = ref({
  name: '',
  email: '',
  source: ''
})

const leadSources = [
  { title: '🌐 Website', value: 'website' },
  { title: '📱 Instagram', value: 'instagram' },
  { title: '💼 LinkedIn', value: 'linkedin' },
  { title: '👥 Indicação', value: 'referral' },
  { title: '📧 Email Marketing', value: 'email' }
]

const smartStats = ref([
  {
    key: 'leads',
    icon: '🎯',
    value: '24',
    label: 'Novos Leads',
    trend: '+12%',
    trendClass: 'trend-up'
  },
  {
    key: 'qualified',
    icon: '✨',
    value: '8',
    label: 'Qualificados',
    trend: '+5%',
    trendClass: 'trend-up'
  },
  {
    key: 'proposals',
    icon: '📋',
    value: '3',
    label: 'Propostas',
    trend: '0%',
    trendClass: 'trend-neutral'
  },
  {
    key: 'closed',
    icon: '🎉',
    value: '2',
    label: 'Fechados',
    trend: '+100%',
    trendClass: 'trend-up'
  }
])

const navigation = ref([
  {
    key: 'pipeline',
    icon: '🌊',
    label: 'Pipeline',
    count: 37
  },
  {
    key: 'leads',
    icon: '🧠',
    label: 'Intelligence',
    count: 24
  },
  {
    key: 'activities',
    icon: '⚡',
    label: 'Atividades',
    count: 12
  }
])

const addQuickLead = () => {
  console.log('Novo lead:', quickLead.value)
  showQuickAdd.value = false
  
  quickLead.value = {
    name: '',
    email: '',
    source: ''
  }
}
</script>

<style scoped>
.crm-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
}

/* Floating Header */
.floating-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 20px 32px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 16px;
}

.title-icon {
  font-size: 32px;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
}

.main-title {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #1e293b, #475569);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  line-height: 1.2;
}

.subtitle {
  color: #64748b;
  font-size: 14px;
  margin: 0;
  font-weight: 500;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

/* Smart Buttons */
.smart-btn {
  border-radius: 12px !important;
  text-transform: none !important;
  font-weight: 600 !important;
  letter-spacing: 0 !important;
  box-shadow: none !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.primary-btn {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
  color: white !important;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3) !important;
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.9) !important;
  color: #475569 !important;
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
}

.secondary-btn:hover {
  background: white !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

/* Stats Flow */
.stats-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.stat-bubble {
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  position: relative;
}

.stat-bubble:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.stat-bubble.active {
  border-color: #3b82f6;
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
}

.stat-icon {
  font-size: 24px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.stat-content {
  text-align: left;
}

.stat-number {
  font-size: 32px;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 4px;
}

.stat-trend {
  font-size: 12px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 8px;
  display: inline-block;
}

.trend-up {
  background: #dcfce7;
  color: #166534;
}

.trend-neutral {
  background: #f1f5f9;
  color: #475569;
}

.flow-arrow {
  font-size: 20px;
  color: #cbd5e1;
  font-weight: bold;
}

/* Main Flow */
.main-flow {
  padding: 0 32px 32px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Quick Add Overlay */
.quick-overlay {
  backdrop-filter: blur(8px);
}

.quick-add-card {
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  max-width: 480px;
  width: 90vw;
}

.quick-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.quick-header h3 {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.quick-form {
  display: flex;
  flex-direction: column;
}

.quick-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

/* Smart Navigation */
.smart-nav {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.05);
  z-index: 20;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  color: #64748b;
  font-weight: 600;
  font-size: 14px;
}

.nav-item:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.nav-item.active {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.nav-icon {
  font-size: 16px;
}

.nav-count {
  background: rgba(255, 255, 255, 0.2);
  color: inherit;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  min-width: 20px;
  text-align: center;
}

.nav-item.active .nav-count {
  background: rgba(255, 255, 255, 0.3);
}
</style>