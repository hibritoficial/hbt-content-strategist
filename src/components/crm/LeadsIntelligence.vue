<template>
  <div class="leads-intelligence">
    <!-- Intelligence Header -->
    <div class="intelligence-header">
      <h2 class="intelligence-title">🧠 Leads Intelligence</h2>
      <p class="intelligence-subtitle">Insights automáticos sobre seus leads</p>
    </div>

    <!-- Smart Filters -->
    <div class="smart-filters">
      <div class="filter-group">
        <v-chip-group v-model="selectedSource" mandatory>
          <v-chip 
            v-for="source in leadSources" 
            :key="source.value"
            :value="source.value"
            class="smart-chip"
          >
            {{ source.icon }} {{ source.label }}
          </v-chip>
        </v-chip-group>
      </div>
    </div>

    <!-- Leads Grid -->
    <div class="leads-grid">
      <div 
        v-for="lead in filteredLeads" 
        :key="lead.id"
        class="lead-card"
        :class="{ 'hot-lead': lead.score >= 80 }"
        @click="selectLead(lead)"
      >
        <!-- Lead Header -->
        <div class="lead-header">
          <div class="lead-avatar" :style="{ background: lead.avatarColor }">
            {{ lead.name.charAt(0) }}
          </div>
          <div class="lead-info">
            <h3 class="lead-name">{{ lead.name }}</h3>
            <p class="lead-company">{{ lead.company }}</p>
          </div>
          <div class="lead-score" :class="getScoreClass(lead.score)">
            {{ lead.score }}
          </div>
        </div>

        <!-- Lead Intelligence -->
        <div class="lead-intelligence">
          <div class="intelligence-item">
            <span class="intel-icon">🎯</span>
            <span class="intel-text">{{ lead.source }}</span>
          </div>
          <div class="intelligence-item">
            <span class="intel-icon">⏰</span>
            <span class="intel-text">{{ lead.timeAgo }}</span>
          </div>
          <div class="intelligence-item">
            <span class="intel-icon">👀</span>
            <span class="intel-text">{{ lead.engagement }}</span>
          </div>
        </div>

        <!-- Marketing Data -->
        <div class="marketing-data">
          <h4 class="data-title">📊 Dados do Marketing</h4>
          <div class="data-grid">
            <div class="data-item">
              <span class="data-label">UTM Campaign</span>
              <span class="data-value">{{ lead.utmCampaign }}</span>
            </div>
            <div class="data-item">
              <span class="data-label">Página de Entrada</span>
              <span class="data-value">{{ lead.landingPage }}</span>
            </div>
            <div class="data-item">
              <span class="data-label">Interesse</span>
              <span class="data-value">{{ lead.interest }}</span>
            </div>
          </div>
        </div>

        <!-- AI Insights -->
        <div class="ai-insights">
          <div class="insight-badge" :class="lead.aiInsight.type">
            <span class="insight-icon">{{ lead.aiInsight.icon }}</span>
            <span class="insight-text">{{ lead.aiInsight.message }}</span>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="lead-actions">
          <v-btn 
            size="small" 
            class="action-btn primary"
            @click.stop="qualifyLead(lead)"
          >
            Qualificar
          </v-btn>
          <v-btn 
            size="small" 
            class="action-btn secondary"
            @click.stop="scheduleMeeting(lead)"
          >
            Agendar
          </v-btn>
        </div>
      </div>
    </div>

    <!-- Lead Detail Modal -->
    <v-dialog v-model="showLeadDetail" max-width="800">
      <div v-if="selectedLeadData" class="lead-detail-modal">
        <LeadDetailView :lead="selectedLeadData" @close="showLeadDetail = false" />
      </div>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import LeadDetailView from './LeadDetailView.vue'

const selectedSource = ref('all')
const showLeadDetail = ref(false)
const selectedLeadData = ref(null)

const leadSources = [
  { value: 'all', icon: '🌟', label: 'Todos' },
  { value: 'website', icon: '🌐', label: 'Website' },
  { value: 'instagram', icon: '📱', label: 'Instagram' },
  { value: 'linkedin', icon: '💼', label: 'LinkedIn' },
  { value: 'referral', icon: '👥', label: 'Indicação' }
]

const leads = ref([
  {
    id: 1,
    name: 'Ana Silva',
    company: 'TechStart',
    email: 'ana@techstart.com',
    phone: '(11) 99999-9999',
    source: 'Website',
    sourceValue: 'website',
    score: 95,
    timeAgo: '2h atrás',
    engagement: 'Alto',
    avatarColor: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
    utmCampaign: 'website-redesign-2024',
    landingPage: '/servicos/website',
    interest: 'Website Institucional',
    aiInsight: {
      type: 'hot',
      icon: '🔥',
      message: 'Lead quente! Visitou 5 páginas e baixou material'
    }
  },
  {
    id: 2,
    name: 'Carlos Mendes',
    company: 'E-commerce Plus',
    email: 'carlos@ecommerceplus.com',
    phone: '(11) 88888-8888',
    source: 'Instagram',
    sourceValue: 'instagram',
    score: 78,
    timeAgo: '4h atrás',
    engagement: 'Médio',
    avatarColor: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    utmCampaign: 'instagram-stories-jan',
    landingPage: '/cases/ecommerce',
    interest: 'E-commerce',
    aiInsight: {
      type: 'warm',
      icon: '⚡',
      message: 'Engajou com posts sobre e-commerce'
    }
  },
  {
    id: 3,
    name: 'Mariana Costa',
    company: 'Consultoria MC',
    email: 'mariana@consultoriamc.com',
    phone: '(11) 77777-7777',
    source: 'LinkedIn',
    sourceValue: 'linkedin',
    score: 85,
    timeAgo: '1h atrás',
    engagement: 'Alto',
    avatarColor: 'linear-gradient(135deg, #10b981, #059669)',
    utmCampaign: 'linkedin-ads-consultoria',
    landingPage: '/servicos/consultoria',
    interest: 'Consultoria Digital',
    aiInsight: {
      type: 'hot',
      icon: '💎',
      message: 'Perfil premium, empresa em crescimento'
    }
  },
  {
    id: 4,
    name: 'Roberto Alves',
    company: 'StartupX',
    email: 'roberto@startupx.com',
    phone: '(11) 66666-6666',
    source: 'Indicação',
    sourceValue: 'referral',
    score: 92,
    timeAgo: '30min atrás',
    engagement: 'Muito Alto',
    avatarColor: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    utmCampaign: 'referral-program',
    landingPage: '/contato',
    interest: 'MVP Development',
    aiInsight: {
      type: 'hot',
      icon: '🚀',
      message: 'Indicado por cliente satisfeito'
    }
  }
])

const filteredLeads = computed(() => {
  if (selectedSource.value === 'all') return leads.value
  return leads.value.filter(lead => lead.sourceValue === selectedSource.value)
})

const getScoreClass = (score) => {
  if (score >= 90) return 'score-hot'
  if (score >= 70) return 'score-warm'
  return 'score-cold'
}

const selectLead = (lead) => {
  selectedLeadData.value = lead
  showLeadDetail.value = true
}

const qualifyLead = (lead) => {
  console.log('Qualificar lead:', lead.name)
}

const scheduleMeeting = (lead) => {
  console.log('Agendar reunião com:', lead.name)
}
</script>

<style scoped>
.leads-intelligence {
  padding: 24px 0;
}

.intelligence-header {
  text-align: center;
  margin-bottom: 32px;
}

.intelligence-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.intelligence-subtitle {
  color: #64748b;
  font-size: 16px;
  margin: 0;
}

.smart-filters {
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
}

.smart-chip {
  border-radius: 12px !important;
  font-weight: 600 !important;
  margin: 0 4px !important;
}

.leads-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 24px;
}

.lead-card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
}

.lead-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: #3b82f6;
}

.lead-card.hot-lead {
  border-color: #ef4444;
  background: linear-gradient(135deg, #fef2f2, #fee2e2);
}

.lead-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.lead-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
}

.lead-info {
  flex: 1;
}

.lead-name {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.lead-company {
  font-size: 14px;
  color: #64748b;
  margin: 0;
}

.lead-score {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
  color: white;
}

.score-hot {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.score-warm {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.score-cold {
  background: linear-gradient(135deg, #6b7280, #4b5563);
}

.lead-intelligence {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.intelligence-item {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f8fafc;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
}

.intel-icon {
  font-size: 14px;
}

.intel-text {
  color: #64748b;
  font-weight: 600;
}

.marketing-data {
  margin-bottom: 20px;
}

.data-title {
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 12px 0;
}

.data-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.data-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.data-label {
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
}

.data-value {
  font-size: 12px;
  color: #1e293b;
  font-weight: 700;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 6px;
}

.ai-insights {
  margin-bottom: 20px;
}

.insight-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
}

.insight-badge.hot {
  background: linear-gradient(135deg, #fef2f2, #fee2e2);
  color: #dc2626;
}

.insight-badge.warm {
  background: linear-gradient(135deg, #fffbeb, #fef3c7);
  color: #d97706;
}

.insight-icon {
  font-size: 14px;
}

.lead-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  border-radius: 8px !important;
  text-transform: none !important;
  font-weight: 600 !important;
  flex: 1;
}

.action-btn.primary {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
  color: white !important;
}

.action-btn.secondary {
  background: #f8fafc !important;
  color: #64748b !important;
  border: 1px solid #e2e8f0 !important;
}

.lead-detail-modal {
  background: white;
  border-radius: 20px;
  overflow: hidden;
}
</style>