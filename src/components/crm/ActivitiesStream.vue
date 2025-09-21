<template>
  <div class="activities-stream">
    <!-- Stream Header -->
    <div class="stream-header">
      <h2 class="stream-title">⚡ Stream de Atividades</h2>
      <p class="stream-subtitle">Tudo que acontece em tempo real</p>
    </div>

    <!-- Activity Filters -->
    <div class="activity-filters">
      <v-chip-group v-model="selectedFilter" mandatory>
        <v-chip 
          v-for="filter in activityFilters" 
          :key="filter.value"
          :value="filter.value"
          class="filter-chip"
        >
          {{ filter.icon }} {{ filter.label }}
        </v-chip>
      </v-chip-group>
    </div>

    <!-- Activities Timeline -->
    <div class="activities-timeline">
      <div 
        v-for="activity in filteredActivities" 
        :key="activity.id"
        class="activity-item"
        :class="activity.type"
      >
        <!-- Activity Icon -->
        <div class="activity-icon" :style="{ background: activity.gradient }">
          {{ activity.icon }}
        </div>

        <!-- Activity Content -->
        <div class="activity-content">
          <div class="activity-header">
            <h3 class="activity-title">{{ activity.title }}</h3>
            <span class="activity-time">{{ activity.timeAgo }}</span>
          </div>
          
          <p class="activity-description">{{ activity.description }}</p>
          
          <!-- Activity Meta -->
          <div class="activity-meta">
            <div class="meta-item">
              <span class="meta-icon">👤</span>
              <span class="meta-text">{{ activity.contact }}</span>
            </div>
            <div v-if="activity.value" class="meta-item">
              <span class="meta-icon">💰</span>
              <span class="meta-text">R$ {{ activity.value.toLocaleString() }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-icon">🏷️</span>
              <span class="meta-text">{{ activity.stage }}</span>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="activity-actions">
            <v-btn 
              v-for="action in activity.actions" 
              :key="action.label"
              size="small" 
              variant="text"
              :prepend-icon="action.icon"
              @click="executeAction(action, activity)"
            >
              {{ action.label }}
            </v-btn>
          </div>
        </div>

        <!-- Activity Status -->
        <div class="activity-status" :class="activity.status">
          <div class="status-dot"></div>
        </div>
      </div>
    </div>

    <!-- Load More -->
    <div class="load-more">
      <v-btn 
        class="load-more-btn"
        variant="outlined"
        @click="loadMoreActivities"
      >
        Carregar mais atividades
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedFilter = ref('all')

const activityFilters = [
  { value: 'all', icon: '🌟', label: 'Todas' },
  { value: 'calls', icon: '📞', label: 'Ligações' },
  { value: 'emails', icon: '📧', label: 'Emails' },
  { value: 'meetings', icon: '🤝', label: 'Reuniões' },
  { value: 'deals', icon: '💼', label: 'Negócios' }
]

const activities = ref([
  {
    id: 1,
    type: 'call',
    icon: '📞',
    gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    title: 'Ligação realizada',
    description: 'Conversa de 15 minutos sobre necessidades do projeto',
    contact: 'Ana Silva - TechStart',
    value: 25000,
    stage: 'Qualificação',
    timeAgo: '5 min atrás',
    status: 'completed',
    actions: [
      { icon: 'mdi-note-plus', label: 'Adicionar nota' },
      { icon: 'mdi-calendar', label: 'Agendar follow-up' }
    ]
  },
  {
    id: 2,
    type: 'email',
    icon: '📧',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    title: 'Proposta enviada',
    description: 'Proposta comercial para desenvolvimento de e-commerce',
    contact: 'Carlos Mendes - E-commerce Plus',
    value: 45000,
    stage: 'Proposta',
    timeAgo: '1h atrás',
    status: 'pending',
    actions: [
      { icon: 'mdi-eye', label: 'Ver proposta' },
      { icon: 'mdi-phone', label: 'Ligar' }
    ]
  },
  {
    id: 3,
    type: 'meeting',
    icon: '🤝',
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    title: 'Reunião agendada',
    description: 'Apresentação do projeto e alinhamento de expectativas',
    contact: 'Mariana Costa - Consultoria MC',
    value: 35000,
    stage: 'Negociação',
    timeAgo: '2h atrás',
    status: 'scheduled',
    actions: [
      { icon: 'mdi-calendar-edit', label: 'Editar agendamento' },
      { icon: 'mdi-video', label: 'Iniciar chamada' }
    ]
  },
  {
    id: 4,
    type: 'deal',
    icon: '🎉',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    title: 'Negócio fechado!',
    description: 'Contrato assinado para desenvolvimento de MVP',
    contact: 'Roberto Alves - StartupX',
    value: 60000,
    stage: 'Fechado',
    timeAgo: '3h atrás',
    status: 'won',
    actions: [
      { icon: 'mdi-file-document', label: 'Ver contrato' },
      { icon: 'mdi-rocket-launch', label: 'Iniciar projeto' }
    ]
  },
  {
    id: 5,
    type: 'email',
    icon: '📧',
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
    title: 'Email não respondido',
    description: 'Follow-up sobre interesse em consultoria digital',
    contact: 'Pedro Santos - Digital Corp',
    value: 28000,
    stage: 'Lead',
    timeAgo: '4h atrás',
    status: 'overdue',
    actions: [
      { icon: 'mdi-phone', label: 'Ligar agora' },
      { icon: 'mdi-email-send', label: 'Reenviar email' }
    ]
  }
])

const filteredActivities = computed(() => {
  if (selectedFilter.value === 'all') return activities.value
  
  const filterMap = {
    calls: ['call'],
    emails: ['email'],
    meetings: ['meeting'],
    deals: ['deal']
  }
  
  return activities.value.filter(activity => 
    filterMap[selectedFilter.value]?.includes(activity.type)
  )
})

const executeAction = (action, activity) => {
  console.log('Executar ação:', action.label, 'para:', activity.contact)
}

const loadMoreActivities = () => {
  console.log('Carregar mais atividades')
}
</script>

<style scoped>
.activities-stream {
  padding: 24px 0;
}

.stream-header {
  text-align: center;
  margin-bottom: 32px;
}

.stream-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.stream-subtitle {
  color: #64748b;
  font-size: 16px;
  margin: 0;
}

.activity-filters {
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
}

.filter-chip {
  border-radius: 12px !important;
  font-weight: 600 !important;
  margin: 0 4px !important;
}

.activities-timeline {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.activities-timeline::before {
  content: '';
  position: absolute;
  left: 32px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #e2e8f0, #cbd5e1);
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 32px;
  position: relative;
}

.activity-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 2;
}

.activity-content {
  flex: 1;
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.activity-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.activity-title {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.activity-time {
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
  background: #f8fafc;
  padding: 4px 8px;
  border-radius: 6px;
}

.activity-description {
  color: #64748b;
  font-size: 14px;
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.activity-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-icon {
  font-size: 14px;
}

.meta-text {
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
}

.activity-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.activity-status {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-top: 24px;
  position: relative;
}

.status-dot {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.activity-status.completed .status-dot {
  background: #10b981;
}

.activity-status.pending .status-dot {
  background: #f59e0b;
}

.activity-status.scheduled .status-dot {
  background: #3b82f6;
}

.activity-status.won .status-dot {
  background: #8b5cf6;
}

.activity-status.overdue .status-dot {
  background: #ef4444;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

.load-more {
  text-align: center;
  margin-top: 40px;
}

.load-more-btn {
  border-radius: 12px !important;
  text-transform: none !important;
  font-weight: 600 !important;
  padding: 12px 32px !important;
}
</style>