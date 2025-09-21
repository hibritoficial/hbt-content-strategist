<template>
  <div class="lead-detail">
    <!-- Header -->
    <div class="detail-header">
      <div class="header-left">
        <div class="lead-avatar" :style="{ background: lead.avatarColor }">
          {{ lead.name.charAt(0) }}
        </div>
        <div class="lead-info">
          <h2 class="lead-name">{{ lead.name }}</h2>
          <p class="lead-company">{{ lead.company }}</p>
          <div class="lead-score" :class="getScoreClass(lead.score)">
            Score: {{ lead.score }}
          </div>
        </div>
      </div>
      <v-btn icon="mdi-close" variant="text" @click="$emit('close')" />
    </div>

    <!-- Content Tabs -->
    <v-tabs v-model="activeTab" class="mb-4">
      <v-tab value="overview">Visão Geral</v-tab>
      <v-tab value="marketing">Marketing Data</v-tab>
      <v-tab value="timeline">Timeline</v-tab>
    </v-tabs>

    <v-window v-model="activeTab">
      <!-- Overview Tab -->
      <v-window-item value="overview">
        <div class="overview-content">
          <div class="info-grid">
            <div class="info-card">
              <h3>📧 Contato</h3>
              <p><strong>Email:</strong> {{ lead.email }}</p>
              <p><strong>Telefone:</strong> {{ lead.phone }}</p>
            </div>
            
            <div class="info-card">
              <h3>🎯 Interesse</h3>
              <p><strong>Serviço:</strong> {{ lead.interest }}</p>
              <p><strong>Origem:</strong> {{ lead.source }}</p>
            </div>
            
            <div class="info-card">
              <h3>📊 Engajamento</h3>
              <p><strong>Nível:</strong> {{ lead.engagement }}</p>
              <p><strong>Última atividade:</strong> {{ lead.timeAgo }}</p>
            </div>
          </div>
        </div>
      </v-window-item>

      <!-- Marketing Data Tab -->
      <v-window-item value="marketing">
        <div class="marketing-content">
          <div class="data-section">
            <h3>🚀 Dados de Campanha</h3>
            <div class="data-list">
              <div class="data-row">
                <span class="data-label">UTM Campaign:</span>
                <span class="data-value">{{ lead.utmCampaign }}</span>
              </div>
              <div class="data-row">
                <span class="data-label">Página de Entrada:</span>
                <span class="data-value">{{ lead.landingPage }}</span>
              </div>
              <div class="data-row">
                <span class="data-label">Fonte:</span>
                <span class="data-value">{{ lead.source }}</span>
              </div>
            </div>
          </div>
        </div>
      </v-window-item>

      <!-- Timeline Tab -->
      <v-window-item value="timeline">
        <div class="timeline-content">
          <div class="timeline-item">
            <div class="timeline-icon">🎯</div>
            <div class="timeline-content-item">
              <h4>Lead capturado</h4>
              <p>Preencheu formulário de contato</p>
              <span class="timeline-time">{{ lead.timeAgo }}</span>
            </div>
          </div>
        </div>
      </v-window-item>
    </v-window>

    <!-- Actions -->
    <div class="detail-actions">
      <v-btn class="action-btn primary" @click="qualifyLead">
        Qualificar Lead
      </v-btn>
      <v-btn class="action-btn secondary" @click="scheduleMeeting">
        Agendar Reunião
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  lead: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const activeTab = ref('overview')

const getScoreClass = (score) => {
  if (score >= 90) return 'score-hot'
  if (score >= 70) return 'score-warm'
  return 'score-cold'
}

const qualifyLead = () => {
  console.log('Qualificar lead:', props.lead.name)
}

const scheduleMeeting = () => {
  console.log('Agendar reunião com:', props.lead.name)
}
</script>

<style scoped>
.lead-detail {
  padding: 32px;
}

.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.lead-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 24px;
}

.lead-name {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.lead-company {
  font-size: 16px;
  color: #64748b;
  margin: 0 0 8px 0;
}

.lead-score {
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  color: white;
  display: inline-block;
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

.overview-content {
  padding: 20px 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.info-card {
  background: #f8fafc;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.info-card h3 {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 12px 0;
}

.info-card p {
  font-size: 14px;
  color: #64748b;
  margin: 0 0 8px 0;
}

.marketing-content {
  padding: 20px 0;
}

.data-section h3 {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 16px 0;
}

.data-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.data-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
}

.data-label {
  font-size: 14px;
  color: #64748b;
  font-weight: 600;
}

.data-value {
  font-size: 14px;
  color: #1e293b;
  font-weight: 700;
}

.timeline-content {
  padding: 20px 0;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
}

.timeline-icon {
  font-size: 20px;
}

.timeline-content-item h4 {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.timeline-content-item p {
  font-size: 14px;
  color: #64748b;
  margin: 0 0 8px 0;
}

.timeline-time {
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
}

.detail-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
}

.action-btn {
  border-radius: 8px !important;
  text-transform: none !important;
  font-weight: 600 !important;
  padding: 12px 24px !important;
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
</style>