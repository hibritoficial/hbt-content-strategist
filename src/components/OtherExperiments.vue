<template>
  <div class="other-experiments-section">
    <div class="section-header">
      <h2>OUTROS EXPERIMENTOS DE INTERFACE</h2>
      <p>Explore outros experimentos disponíveis no laboratório</p>
    </div>
    
    <div class="experiments-grid">
      <div 
        v-for="exp in filteredExperiments" 
        :key="exp.id"
        class="experiment-card"
        @click="$router.push(exp.route)"
      >
        <div class="experiment-icon">
          <v-icon size="24" color="white">{{ exp.icon }}</v-icon>
        </div>
        <div class="experiment-info">
          <h3>{{ exp.name }}</h3>
          <p>{{ exp.description }}</p>
        </div>
        <div class="experiment-status" :class="exp.status">
          <div class="status-dot"></div>
          <span>{{ getStatusLabel(exp.status) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentExperiment: {
    type: String,
    required: true
  }
})

const experiments = [
  {
    id: 'cxa-dashboard',
    name: 'CXA Dashboard',
    description: 'Dashboard completo de funis e receita',
    icon: 'mdi-monitor-dashboard',
    status: 'active',
    route: '/labs/cxa-dashboard'
  },
  {
    id: 'analytics-overview',
    name: 'Analytics Overview',
    description: 'Visão geral de métricas avançadas',
    icon: 'mdi-chart-line',
    status: 'development',
    route: '/labs/analytics-overview'
  },
  {
    id: 'funnel-builder',
    name: 'Funnel Builder',
    description: 'Construtor visual de funis',
    icon: 'mdi-filter-variant',
    status: 'planning',
    route: '/labs/funnel-builder'
  },
  {
    id: 'mobile-interface',
    name: 'Mobile Interface',
    description: 'Interface otimizada para mobile',
    icon: 'mdi-cellphone',
    status: 'planning',
    route: '/labs/mobile-interface'
  },
  {
    id: 'cxa-ultimate',
    name: 'CXA Ultimate',
    description: 'Dashboard definitivo de Customer Experience Automation',
    icon: 'mdi-rocket-launch',
    status: 'active',
    route: '/labs/cxa-ultimate'
  }
]

const filteredExperiments = computed(() => 
  experiments.filter(exp => exp.id !== props.currentExperiment)
)

const getStatusLabel = (status) => {
  const labels = {
    active: 'Ativo',
    development: 'Desenvolvimento', 
    planning: 'Planejamento'
  }
  return labels[status] || status
}
</script>

<style scoped>
.other-experiments-section {
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px 24px;
  margin-top: 40px;
}

.section-header {
  text-align: center;
  margin-bottom: 32px;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #00ff9d;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.section-header p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.experiments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.experiment-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 16px;
}

.experiment-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 255, 157, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 255, 157, 0.2);
}

.experiment-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.experiment-info {
  flex: 1;
}

.experiment-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin: 0 0 4px 0;
}

.experiment-info p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1.4;
}

.experiment-status {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.experiment-status.active {
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
}

.experiment-status.development {
  background: rgba(245, 158, 11, 0.2);
  border: 1px solid rgba(245, 158, 11, 0.3);
  color: #f59e0b;
}

.experiment-status.planning {
  background: rgba(107, 114, 128, 0.2);
  border: 1px solid rgba(107, 114, 128, 0.3);
  color: #9ca3af;
}

.experiment-status .status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.experiment-status.active .status-dot {
  background: #10b981;
  animation: pulse 2s infinite;
}

.experiment-status.development .status-dot {
  background: #f59e0b;
}

.experiment-status.planning .status-dot {
  background: #9ca3af;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@media (max-width: 768px) {
  .experiments-grid {
    grid-template-columns: 1fr;
  }
  
  .experiment-card {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
}
</style>