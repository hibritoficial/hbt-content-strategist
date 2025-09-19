<template>
  <div
    :class="[
      'funnel-node vue-flow__node',
      `funnel-node--${data.nodeType.family.toLowerCase()}`,
      { 'funnel-node--selected': selected },
      { 'funnel-node--connecting': connectionMode },
      { 'funnel-node--dimmed': connectionMode && !isOwnNode }
    ]"
    @click="handleClick"
  >
    <!-- Handles do Vue Flow -->
    <Handle type="source" position="right" id="source" class="custom-handle" />
    <Handle type="target" position="left" id="target" class="custom-handle" />
    <!-- Connection handles -->
    <div 
      :class="[
        'connection-handle connection-handle--source',
        { 'connection-handle--active': isOwnNode },
        { 'connection-handle--connecting': connectionMode }
      ]"
      data-handle-id="source"
      @click.stop="startConnection"
      @mouseenter="onHandleHover"
      @mouseleave="onHandleLeave"
      title="Clique para conectar"
    >
      <div class="connection-ripple" />
    </div>
    <div 
      :class="[
        'connection-handle connection-handle--target',
        { 'connection-handle--target-active': connectionMode && !isOwnNode },
        { 'connection-handle--magnetic': connectionMode && !isOwnNode }
      ]"
      data-handle-id="target"
      @click.stop="completeConnection"
      title="Clique para conectar aqui"
    >
      <div class="connection-ripple" />
    </div>
    
    <v-card 
      elevation="8" 
      :width="data.compactMode ? 160 : 220" 
      color="white" 
      class="node-card funnel-card-modern"
      :class="{ 'compact-mode': data.compactMode }"
    >
      <v-card-title class="pa-4 d-flex align-center" :style="{ borderLeft: `4px solid ${data.nodeType.color}` }">
        <v-avatar :size="data.compactMode ? 24 : 32" :color="data.nodeType.color" :class="data.compactMode ? 'mr-2' : 'mr-3'">
          <v-icon :icon="data.nodeType.icon" color="white" :size="data.compactMode ? 14 : 18" />
        </v-avatar>
        <div class="flex-grow-1">
          <div :class="data.compactMode ? 'text-body-2 font-weight-bold' : 'text-subtitle-1 font-weight-bold'">{{ data.label }}</div>
          <div v-if="!data.compactMode" class="text-caption text-grey-darken-1">{{ data.nodeType.family }}</div>
        </div>
        <v-btn
          icon="mdi-close"
          size="small"
          variant="text"
          color="grey"
          @click.stop="deleteNode"
          class="delete-btn"
        />
      </v-card-title>
      
      <v-card-text :class="data.compactMode ? 'pa-1' : 'pa-2'">
        <!-- Métricas detalhadas -->
        <div v-if="!data.compactMode" class="d-flex justify-space-between align-center mb-3">
          <div class="metrics-container">
            <div class="metric-value">{{ data.count || 0 }}</div>
            <div class="metric-label">visitantes</div>
          </div>
          <div class="status-indicator" :class="{ 'status-active': data.count > 0 }">
            <v-icon size="12" :icon="data.count > 0 ? 'mdi-pulse' : 'mdi-circle'" />
          </div>
        </div>
        
        <!-- Métricas compactas -->
        <div v-else class="d-flex justify-center align-center mb-1">
          <span class="text-h6 font-weight-bold text-primary">{{ data.count || 0 }}</span>
        </div>
        
        <!-- Conteúdo detalhado -->
        <template v-if="!data.compactMode">
          <!-- Resumo da regra -->
          <div v-if="getRuleSummary(data.config, data.type)" class="rule-summary mb-2">
            <v-chip
              v-for="rule in getRuleSummary(data.config, data.type)"
              :key="rule"
              size="x-small"
              variant="outlined"
              class="mr-1 mb-1"
            >
              {{ rule }}
            </v-chip>
            <v-icon
              v-if="data.hasRecentEvents"
              size="12"
              color="success"
              class="ml-1"
            >
              mdi-check-circle
            </v-icon>
          </div>
          
          <!-- Configuração resumida -->
          <div v-if="data.config" class="config-summary">
            <div class="text-caption text-grey-darken-1">
              {{ getConfigSummary(data.config, data.type) }}
            </div>
          </div>
          
          <!-- Chips de documentação -->
          <div class="d-flex flex-wrap gap-1 mt-2">
            <v-chip
              v-for="dimension in ['sistema', 'metodo', 'marketing']"
              :key="dimension"
              :color="getDimensionColor(dimension)"
              size="x-small"
              @click.stop="openDimension(dimension)"
            >
              {{ getDimensionIcon(dimension) }}
            </v-chip>
          </div>
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Handle } from '@vue-flow/core'
import { useDocsStore } from '@/stores/docs'
import { useFunnelStore } from '@/stores/funnel'

const props = defineProps({
  id: String,
  data: Object,
  selected: Boolean
})

const emit = defineEmits(['start-connection', 'create-connection'])

const isConnecting = ref(false)

const docsStore = useDocsStore()
const funnelStore = useFunnelStore()

const handleClick = () => {
  if (!connectionMode.value) {
    funnelStore.selectNode(props.id)
  }
}

const deleteNode = () => {
  if (confirm('Excluir este card?')) {
    funnelStore.deleteNode(props.id)
  }
}

const openDimension = (dimension) => {
  docsStore.activeTab = dimension
  docsStore.openTopic(`funnel-${props.data.type}`)
}

const getConfigSummary = (config, type) => {
  switch (type) {
    case 'traffic':
      return config.source ? `Fonte: ${config.source}` : 'Tráfego'
    case 'landing':
      return config.urlPattern ? `URL: ${config.urlPattern}` : 'Landing Page'
    case 'form':
      return config.formId ? `Form: ${config.formId}` : 'Formulário'
    case 'whatsapp':
      return config.keyword ? `Palavra: ${config.keyword}` : 'WhatsApp'
    case 'checkout':
      return 'Checkout/Compra'
    case 'thankyou':
      return 'Página de Obrigado'
    default:
      return type
  }
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

const getRuleSummary = (config, type) => {
  const rules = []
  
  switch (type) {
    case 'traffic':
      if (config.source) rules.push(`src:${config.source}`)
      if (config.utmCampaign) rules.push(`utm:${config.utmCampaign}`)
      break
    case 'landing':
      if (config.urlPattern) rules.push(`url:${config.urlPattern}`)
      break
    case 'form':
      if (config.eventName) rules.push(`evt:${config.eventName}`)
      if (config.formId) rules.push(`id:${config.formId}`)
      break
    case 'whatsapp':
      if (config.eventName) rules.push(`evt:${config.eventName}`)
      if (config.keyword) rules.push(`key:${config.keyword}`)
      break
    case 'checkout':
      rules.push('evt:purchase')
      break
  }
  
  return rules
}

const startConnection = (event) => {
  event.stopPropagation()
  isConnecting.value = true
  console.log('🔴 Modo conexão ativado para:', props.id)
  console.log('🔴 Usando store diretamente...')
  
  // Usar store diretamente ao invés de emit
  funnelStore.startConnection(props.id)
}

const completeConnection = (event) => {
  event.stopPropagation()
  if (connectionMode.value && !isOwnNode.value) {
    console.log('🔴 Completando conexão ao nó:', props.id)
    funnelStore.completeConnection(props.id)
    resetConnectionMode()
  }
}

const resetConnectionMode = () => {
  isConnecting.value = false
}

const onHandleHover = () => {
  if (!connectionMode.value) {
    // Mostrar preview de conexão
  }
}

const onHandleLeave = () => {
  // Esconder preview
}

const isOwnNode = computed(() => {
  return props.data.isSourceNode || false
})

// Usar dados passados pelo parent
const connectionMode = computed(() => props.data.connectionMode || false)
</script>

<style scoped>
.funnel-node {
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 16px;
  position: relative;
  min-width: 200px;
}

.connection-handle {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #667eea;
  border: 2px solid white;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.connection-ripple {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(25, 118, 210, 0.3);
  transform: scale(0);
  transition: transform 0.3s ease;
}

.connection-handle:hover {
  transform: translateY(-50%) scale(1.3);
  background: #1565c0;
  box-shadow: 0 4px 16px rgba(21, 101, 192, 0.4);
}

.connection-handle:hover .connection-ripple {
  transform: scale(2);
  animation: ripple-pulse 1.5s infinite;
}

.connection-handle--active {
  opacity: 1 !important;
  transform: translateY(-50%) scale(1.4);
  background: #ff5722;
  box-shadow: 0 0 20px rgba(255, 87, 34, 0.6);
  animation: connection-glow 0.8s infinite alternate, connection-pulse 1.2s infinite;
}

.connection-handle--connecting {
  opacity: 1 !important;
}

.connection-handle--target-active {
  opacity: 1 !important;
  background: #4caf50;
  transform: translateY(-50%) scale(1.2);
  animation: magnetic-pulse 0.8s infinite;
}

.connection-handle--magnetic {
  box-shadow: 0 0 15px rgba(76, 175, 80, 0.8);
}

@keyframes ripple-pulse {
  0% { opacity: 0.6; }
  100% { opacity: 0; }
}

@keyframes connection-glow {
  0% { box-shadow: 0 0 20px rgba(255, 87, 34, 0.6); }
  100% { box-shadow: 0 0 30px rgba(255, 87, 34, 0.9); }
}

@keyframes magnetic-pulse {
  0% { transform: translateY(-50%) scale(1.2); }
  50% { transform: translateY(-50%) scale(1.4); }
  100% { transform: translateY(-50%) scale(1.2); }
}

@keyframes connection-pulse {
  0% { transform: translateY(-50%) scale(1.4); }
  50% { transform: translateY(-50%) scale(1.6); }
  100% { transform: translateY(-50%) scale(1.4); }
}

.connection-handle--source {
  right: -8px;
}

.connection-handle--target {
  left: -8px;
}

.funnel-node:hover .connection-handle {
  opacity: 1;
}

.node-card {
  border-radius: 16px;
}

.funnel-card-modern {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.funnel-node:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}

.funnel-node--selected {
  border: 2px solid #1976d2;
}

.funnel-node--tráfego {
  border-left: 4px solid #2196f3;
}

.funnel-node--conteúdo {
  border-left: 4px solid #9c27b0;
}

.funnel-node--conversão {
  border-left: 4px solid #4caf50;
}

.funnel-node--mensageria {
  border-left: 4px solid #009688;
}

.funnel-node--crm {
  border-left: 4px solid #ff9800;
}

.funnel-node--webhook {
  border-left: 4px solid #e91e63;
}

.funnel-node--connecting {
  position: relative;
  z-index: 100;
}

.funnel-node--dimmed {
  opacity: 0.6;
  filter: grayscale(0.3);
}

.funnel-node--dimmed:hover {
  opacity: 0.8;
  filter: grayscale(0);
  transform: translateY(-2px) scale(1.02);
}

.config-summary {
  font-size: 10px;
  max-height: 20px;
  overflow: hidden;
}

.rule-summary {
  min-height: 24px;
}

.metrics-container {
  text-align: center;
}

.metric-value {
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
  color: #1976d2;
}

.metric-label {
  font-size: 10px;
  text-transform: uppercase;
  color: #666;
  letter-spacing: 0.5px;
}

.status-indicator {
  opacity: 0.5;
  transition: all 0.3s;
}

.status-active {
  opacity: 1;
  color: #4caf50;
  animation: pulse-status 2s infinite;
}

@keyframes pulse-status {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.delete-btn {
  opacity: 0;
  transition: opacity 0.2s;
}

.funnel-node:hover .delete-btn {
  opacity: 1;
}

/* Modo compacto */
.compact-mode {
  min-height: auto;
}

.compact-mode .v-card-title {
  padding: 8px 12px !important;
}

.compact-mode .v-card-text {
  padding: 4px 8px !important;
}
</style>