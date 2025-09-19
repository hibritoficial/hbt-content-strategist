<template>
  <div
    :class="[
      'flow-node',
      `flow-node--${data.lane}`,
      { 'flow-node--selected': selected },
      { 'flow-node--highlighted': highlighted }
    ]"
    @click="handleClick"
  >
    <v-card
      elevation="2"
      width="220"
    >
    <v-card-title class="text-subtitle-2 pa-3">
      {{ data.label }}
    </v-card-title>
    
    <v-card-text class="pa-2">
      <!-- Entradas -->
      <div v-if="data.inputs" class="mb-2">
        <div class="text-caption text-green font-weight-bold mb-1">→ Entradas</div>
        <div class="d-flex flex-wrap gap-1">
          <v-chip
            v-for="input in data.inputs"
            :key="input"
            size="x-small"
            variant="outlined"
            color="green"
          >
            {{ input }}
          </v-chip>
        </div>
      </div>
      
      <!-- Saídas -->
      <div v-if="data.outputs" class="mb-2">
        <div class="text-caption text-blue font-weight-bold mb-1">→ Saídas</div>
        <div class="d-flex flex-wrap gap-1">
          <v-chip
            v-for="output in data.outputs"
            :key="output"
            size="x-small"
            variant="outlined"
            color="blue"
          >
            {{ output }}
          </v-chip>
        </div>
      </div>
      
      <!-- Dimensões -->
      <div class="d-flex flex-wrap gap-1 mb-2">
        <v-chip
          v-for="dimension in data.dimensionBadges"
          :key="dimension"
          :color="getDimensionColor(dimension)"
          size="x-small"
          @click.stop="openDimension(dimension)"
        >
          {{ getDimensionIcon(dimension) }} {{ getDimensionLabel(dimension) }}
        </v-chip>
      </div>
      
      <!-- Status -->
      <div class="d-flex justify-space-between align-center mb-2">
        <v-chip
          :color="getStatusColor(data.status)"
          size="x-small"
          variant="flat"
        >
          {{ getStatusLabel(data.status) }}
        </v-chip>
        <span class="text-caption text-grey">{{ getCompletionText(data.metrics) }}</span>
      </div>
      
      <!-- Critério de Saída -->
      <div v-if="data.exitCriteria" class="exit-criteria">
        <v-icon size="12" color="success">mdi-check-circle</v-icon>
        <span class="text-caption ml-1">{{ data.exitCriteria }}</span>
      </div>
    </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { useDocsStore } from '@/stores/docs'
import { useFlowStore } from '@/stores/flow'

const props = defineProps({
  id: String,
  data: Object,
  selected: Boolean,
  highlighted: Boolean
})

const docsStore = useDocsStore()
const flowStore = useFlowStore()

const handleClick = () => {
  flowStore.selectNode(props.id)
}

const openDimension = (dimension) => {
  docsStore.activeTab = dimension
  docsStore.openTopic(props.id)
}

const getDimensionColor = (dimension) => {
  const colors = {
    sistema: 'blue',
    metodo: 'purple', 
    marketing: 'green'
  }
  return colors[dimension] || 'grey'
}

const getDimensionIcon = (dimension) => {
  const icons = {
    sistema: '⚙️',
    metodo: '🧭',
    marketing: '📈'
  }
  return icons[dimension] || '•'
}

const getDimensionLabel = (dimension) => {
  const labels = {
    sistema: 'Sistema',
    metodo: 'Método',
    marketing: 'Marketing'
  }
  return labels[dimension] || dimension
}

const getStatusColor = (status) => {
  const colors = {
    pending: 'grey',
    active: 'orange',
    completed: 'green',
    blocked: 'red'
  }
  return colors[status] || 'grey'
}

const getStatusLabel = (status) => {
  const labels = {
    pending: 'Pendente',
    active: 'Ativo',
    completed: 'Completo',
    blocked: 'Bloqueado'
  }
  return labels[status] || status
}

const getCompletionText = (metrics) => {
  if (!metrics || !metrics.completion) return '0%'
  return `${metrics.completion}%`
}
</script>

<style scoped>
.flow-node {
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 12px;
  min-width: 220px;
}

.flow-node .v-card {
  border-radius: 12px;
}

.flow-node:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.flow-node--selected {
  border: 2px solid #1976d2;
}

.flow-node--highlighted {
  border: 3px solid #ff9800;
  box-shadow: 0 0 20px rgba(255, 152, 0, 0.5);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.flow-node--processo {
  border-left: 4px solid #ff9800;
}

.exit-criteria {
  display: flex;
  align-items: flex-start;
  font-size: 10px;
  color: #4caf50;
  margin-top: 8px;
  padding: 4px;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 4px;
}
</style>