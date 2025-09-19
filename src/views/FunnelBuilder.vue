<template>
  <v-container fluid class="pa-0" style="height: 100vh;">
    <!-- Header -->
    <v-app-bar density="compact" color="white" elevation="1">
      <v-btn icon="mdi-arrow-left" @click="$router.push('/funnels')" />
      
      <v-toolbar-title class="d-flex align-center gap-2">
        <v-icon>mdi-sitemap</v-icon>
        {{ currentFunnel?.name || 'Funnel Builder' }}
      </v-toolbar-title>
      
      <v-spacer />
      
      <!-- Janela de tempo -->
      <v-btn-group density="compact" class="mr-4">
        <v-btn
          v-for="window in [5, 30, 120]"
          :key="window"
          :color="timeWindow === window ? 'primary' : 'default'"
          size="small"
          @click="timeWindow = window"
        >
          {{ window }}min
        </v-btn>
      </v-btn-group>
      
      <!-- Modo de visualização -->
      <v-btn-group density="compact" class="mr-4">
        <v-btn
          :color="viewMode === 'design' ? 'primary' : 'default'"
          @click="viewMode = 'design'"
        >
          <v-icon>mdi-pencil</v-icon>
          Design
        </v-btn>
        <v-btn
          :color="viewMode === 'live' ? 'success' : 'default'"
          @click="toggleLiveMode"
        >
          <v-icon>mdi-pulse</v-icon>
          Live
        </v-btn>
      </v-btn-group>
      
      <v-btn-group density="compact">
        <v-btn @click="autoLayout">
          <v-icon>mdi-auto-fix</v-icon>
          Auto
        </v-btn>
        <v-btn @click="fitView">
          <v-icon>mdi-fit-to-screen</v-icon>
          Fit
        </v-btn>
        <v-btn @click="downloadFunnel">
          <v-icon>mdi-download</v-icon>
          Download
        </v-btn>
        <v-btn @click="toggleCompactMode">
          <v-icon>{{ compactMode ? 'mdi-view-list' : 'mdi-view-comfy' }}</v-icon>
          {{ compactMode ? 'Detalhado' : 'Compacto' }}
        </v-btn>
        
        <!-- Botão de ajuda -->
        <v-btn 
          icon="mdi-help-circle"
          variant="text"
          color="white"
          @click="startQuickTour"
          class="ml-2"
        />
      </v-btn-group>
    </v-app-bar>

    <div class="funnel-builder">
      <!-- Sidebar: Palette de Nós -->
      <v-navigation-drawer
        permanent
        width="280"
        class="palette-sidebar"
      >
        <v-card flat>
          <v-card-title>Componentes</v-card-title>
          <v-card-text class="pa-2">
            <div
              v-for="(nodeType, key) in nodeTypes"
              :key="key"
              class="palette-item"
              draggable="true"
              @dragstart="onDragStart($event, key)"
            >
              <v-card
                elevation="1"
                class="pa-3 mb-2"
                :color="nodeType.color"
                variant="tonal"
              >
                <div class="d-flex align-center">
                  <v-icon :icon="nodeType.icon" class="mr-3" />
                  <div>
                    <div class="text-subtitle-2">{{ key }}</div>
                    <div class="text-caption text-grey">{{ nodeType.family }}</div>
                  </div>
                </div>
              </v-card>
            </div>
          </v-card-text>
        </v-card>
      </v-navigation-drawer>

      <!-- Canvas Central -->
      <div class="canvas-container">
        <VueFlow
          v-model:nodes="computedNodes"
          v-model:edges="edges"
          :node-types="nodeTypesComponents"
          :nodes-draggable="viewMode === 'design' && !globalConnectionMode"
          :nodes-connectable="viewMode === 'design'"
          class="funnel-canvas"
          @node-click="onNodeClick"
          @node-drag-stop="onNodeDragStop"
          @connect="onConnect"
          @drop="onDrop"
          @dragover.prevent
          @start-connection="onStartConnection"
          @create-connection="onCreateConnection"
          @edge-click="onEdgeClick"
        >
          <MiniMap />
          <Controls />
          
          <!-- Pulses animados -->
          <template #edge-label="{ edge }">
            <div class="edge-label">
              {{ edge.label }}
              <div
                v-for="pulse in getEdgePulses(edge.id)"
                :key="pulse.id"
                class="pulse"
              />
            </div>
          </template>
        </VueFlow>
        
        <!-- Linha de conexão dinâmica -->
        <svg
          v-if="globalConnectionMode"
          class="connection-line-overlay"
          :style="{ pointerEvents: 'none' }"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path
                d="M0,0 L0,6 L8,3 z"
                fill="#e8eaf6"
                stroke="#c5cae9"
                stroke-width="0.5"
              />
            </marker>
          </defs>
          <line
            :x1="sourceNodePosition.x"
            :y1="sourceNodePosition.y"
            :x2="mousePosition.x"
            :y2="mousePosition.y"
            stroke="#e8eaf6"
            stroke-width="4"
            stroke-dasharray="10,5"
            opacity="0.85"
            stroke-linecap="round"
            marker-end="url(#arrowhead)"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;10"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </line>
        </svg>
        

      </div>

      <!-- Inspector Direita -->
      <v-navigation-drawer
        v-model="inspectorOpen"
        location="right"
        width="320"
        temporary
      >
        <v-card flat height="100%">
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Inspector</span>
            <v-btn icon="mdi-close" size="small" @click="inspectorOpen = false" />
          </v-card-title>
          
          <v-card-text v-if="selectedNode">
            <v-tabs v-model="inspectorTab" density="compact">
              <v-tab value="sistema">Sistema</v-tab>
              <v-tab value="metodo">Método</v-tab>
              <v-tab value="marketing">Marketing</v-tab>
            </v-tabs>
            
            <v-window v-model="inspectorTab" class="mt-4">
              <v-window-item value="sistema">
                <h4>{{ selectedNode.data.label }}</h4>
                <p class="text-body-2 mb-4">
                  Configurações técnicas do nó {{ selectedNode.data.type }}
                </p>
                
                <!-- Formulário de configuração -->
                <v-form>
                  <v-text-field
                    v-model="selectedNode.data.label"
                    label="Nome do Nó"
                    variant="outlined"
                    density="compact"
                    class="mb-3"
                  />
                  
                  <div v-if="selectedNode.data.type === 'traffic'">
                    <v-select
                      v-model="selectedNode.data.config.source"
                      :items="['meta', 'google', 'instagram', 'direct', 'referral']"
                      label="Fonte de Tráfego"
                      variant="outlined"
                      density="compact"
                      class="mb-3"
                    />
                    <v-text-field
                      v-model="selectedNode.data.config.utmCampaign"
                      label="UTM Campaign"
                      variant="outlined"
                      density="compact"
                    />
                  </div>
                  
                  <div v-if="selectedNode.data.type === 'landing'">
                    <v-text-field
                      v-model="selectedNode.data.config.urlPattern"
                      label="Padrão de URL"
                      placeholder="/lp-*"
                      variant="outlined"
                      density="compact"
                    />
                  </div>
                  
                  <div v-if="selectedNode.data.type === 'form'">
                    <v-text-field
                      v-model="selectedNode.data.config.formId"
                      label="ID do Formulário"
                      variant="outlined"
                      density="compact"
                      class="mb-3"
                    />
                    <v-text-field
                      v-model="selectedNode.data.config.eventName"
                      label="Nome do Evento"
                      value="form_submit"
                      variant="outlined"
                      density="compact"
                    />
                  </div>
                </v-form>
              </v-window-item>
              
              <v-window-item value="metodo">
                <h4>Método HIBRIT</h4>
                <p class="text-body-2">
                  Como este nó se encaixa no método HIBRIT STRATEGIST
                </p>
              </v-window-item>
              
              <v-window-item value="marketing">
                <h4>Conceitos de Marketing</h4>
                <p class="text-body-2">
                  Boas práticas e conceitos para este tipo de nó
                </p>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-navigation-drawer>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, markRaw } from 'vue'
import { useRoute } from 'vue-router'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { useFunnelStore } from '@/stores/funnel'
import FunnelNode from '@/components/funnel/FunnelNode.vue'
import EmptyState from '@/components/funnel/EmptyState.vue'
import '@vue-flow/core/dist/style.css'
import '@/styles/vue-flow.css'

const route = useRoute()
const funnelStore = useFunnelStore()
const { fitView: vueFlowFitView } = useVueFlow()

const inspectorOpen = ref(false)
const inspectorTab = ref('sistema')
const realtimeActive = ref(false)
const viewMode = ref('design') // 'design' | 'live'
const timeWindow = ref(30) // 5, 30, 120 minutes
const isConnecting = ref(false)
const emptyStateDismissed = ref(false)
const connectionSourceNode = ref(null)
const globalConnectionMode = ref(false)
const mousePosition = ref({ x: 0, y: 0 })
const sourceNodePosition = ref({ x: 0, y: 0 })
const compactMode = ref(false)

const nodes = computed({
  get: () => funnelStore.nodes,
  set: (value) => {
    funnelStore.nodes = value
  }
})

const edges = computed({
  get: () => funnelStore.edges,
  set: (value) => {
    funnelStore.edges = value
  }
})

const computedNodes = computed({
  get: () => funnelStore.nodes.map(node => ({
    ...node,
    data: {
      ...node.data,
      connectionMode: globalConnectionMode.value,
      isSourceNode: connectionSourceNode.value === node.id,
      compactMode: compactMode.value
    },
    sourcePosition: 'right',
    targetPosition: 'left'
  })),
  set: (value) => {
    funnelStore.nodes = value
  }
})

const currentFunnel = computed(() => funnelStore.currentFunnel)
const selectedNode = computed(() => funnelStore.selectedNode)
const nodeTypes = computed(() => funnelStore.nodeTypes)
const pulses = computed(() => funnelStore.pulses)

const nodeTypesComponents = {
  funnel: markRaw(FunnelNode)
}

const onNodeClick = (event) => {
  if (!globalConnectionMode.value) {
    funnelStore.selectNode(event.node.id)
    inspectorOpen.value = true
  }
}

const onNodeDragStop = (event) => {
  const { node } = event
  funnelStore.updateNodePosition(node.id, node.position)
}

const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData('application/reactflow', nodeType)
  event.dataTransfer.effectAllowed = 'move'
}

const onDrop = (event) => {
  event.preventDefault()
  
  const nodeType = event.dataTransfer.getData('application/reactflow')
  if (!nodeType) return
  
  const position = {
    x: event.clientX - 200,
    y: event.clientY - 100
  }
  
  const newNode = {
    type: nodeType,
    label: `Novo ${nodeType}`,
    icon: nodeTypes.value[nodeType].icon,
    config: {},
    position_x: position.x,
    position_y: position.y
  }
  
  funnelStore.createNode(newNode)
}

const fitView = () => {
  vueFlowFitView({ padding: 0.2 })
}

const toggleLiveMode = () => {
  if (viewMode.value === 'live') {
    viewMode.value = 'design'
    funnelStore.stopRealtime()
  } else {
    viewMode.value = 'live'
    funnelStore.startRealtime(route.params.id)
  }
}

const onConnect = (params) => {
  // Criar nova edge entre nós
  const newEdge = {
    id: `${params.source}-${params.target}`,
    source: params.source,
    target: params.target,
    label: 'Nova conexão',
    data: {
      filter: {}
    }
  }
  
  edges.value.push(newEdge)
  
  // TODO: Salvar no banco
  console.log('Nova conexão:', newEdge)
}

const autoLayout = async () => {
  // TODO: Implementar autolayout com elkjs
  console.log('Aplicando autolayout...')
}

const startQuickTour = () => {
  console.log('Iniciando tour rápido...')
  // Mostrar tooltip de ajuda
  alert('Tour rápido:\n\n1. Clique na bolinha direita de um card para iniciar conexão\n2. Clique na bolinha esquerda de outro card para conectar\n3. Use Auto para organizar automaticamente\n4. Use Fit para centralizar a visão')
}

const downloadFunnel = async () => {
  try {
    // Esconder minimapa e controles
    const minimap = document.querySelector('.vue-flow__minimap')
    const controls = document.querySelector('.vue-flow__controls')
    if (minimap) minimap.style.display = 'none'
    if (controls) controls.style.display = 'none'
    
    // Aguardar renderização completa
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Capturar apenas o canvas do Vue Flow
    const canvas = document.querySelector('.funnel-canvas')
    if (!canvas) return
    
    // Usar html2canvas com configurações otimizadas
    const html2canvas = (await import('html2canvas')).default
    
    const canvasElement = await html2canvas(canvas, {
      backgroundColor: '#667eea',
      scale: 1,
      useCORS: true,
      allowTaint: true,
      width: canvas.offsetWidth + 200,
      height: canvas.offsetHeight + 200,
      x: -100,
      y: -100
    })
    
    // Restaurar minimapa e controles
    if (minimap) minimap.style.display = ''
    if (controls) controls.style.display = ''
    
    // Criar link de download
    const link = document.createElement('a')
    link.download = `funil-${funnelStore.currentFunnel?.name || 'mapa'}.png`
    link.href = canvasElement.toDataURL('image/png')
    link.click()
    
    console.log('💾 Download do funil iniciado')
  } catch (error) {
    console.error('Erro ao fazer download:', error)
    // Restaurar elementos em caso de erro
    const minimap = document.querySelector('.vue-flow__minimap')
    const controls = document.querySelector('.vue-flow__controls')
    if (minimap) minimap.style.display = ''
    if (controls) controls.style.display = ''
  }
}

const onStartConnection = (nodeId) => {
  console.log('🔵 Recebido start-connection para:', nodeId)
  connectionSourceNode.value = nodeId
  globalConnectionMode.value = true
  
  console.log('🔵 Estados atualizados:')
  console.log('- connectionSourceNode:', connectionSourceNode.value)
  console.log('- globalConnectionMode:', globalConnectionMode.value)
  
  // Encontrar posição real do nó no DOM
  const nodeElement = document.querySelector(`[data-id="${nodeId}"]`)
  if (nodeElement) {
    const canvas = document.querySelector('.funnel-canvas')
    const canvasRect = canvas.getBoundingClientRect()
    const nodeRect = nodeElement.getBoundingClientRect()
    
    sourceNodePosition.value = {
      x: nodeRect.right - canvasRect.left, // bolinha direita
      y: nodeRect.top + nodeRect.height/2 - canvasRect.top // meio do card
    }
    console.log('🔵 Posição real do nó origem:', sourceNodePosition.value)
  } else {
    // Fallback para posição calculada
    const sourceNode = funnelStore.nodes.find(n => n.id === nodeId)
    if (sourceNode) {
      sourceNodePosition.value = {
        x: sourceNode.position.x + 200,
        y: sourceNode.position.y + 100
      }
    }
  }
  
  // Adicionar listeners para mouse e teclado
  document.addEventListener('mousemove', trackMouse)
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('click', handleCanvasClick)
  document.body.style.cursor = 'crosshair'
  console.log('🔵 Cursor e listeners adicionados')
}

const onCreateConnection = async (connection) => {
  if (!connectionSourceNode.value) return
  
  console.log('Criando conexão:', connectionSourceNode.value, '→', connection.target)
  
  const newEdge = {
    id: `${connectionSourceNode.value}-${connection.target}`,
    source: connectionSourceNode.value,
    target: connection.target,
    sourceHandle: 'source',
    targetHandle: 'target',
    label: '',
    style: {
      stroke: '#e8eaf6',
      strokeWidth: 4,
      strokeDasharray: '12,6'
    },
    markerEnd: {
      type: 'arrowclosed',
      color: '#e8eaf6',
      width: 10,
      height: 8
    },
    data: { filter: {} }
  }
  
  // Adicionar à lista de edges
  edges.value.push(newEdge)
  
  // Salvar no banco automaticamente
  await funnelStore.saveEdge(newEdge)
  
  // Reset connection mode
  resetConnectionMode()
  
  console.log('Edge criada e salva:', newEdge)
}

const resetConnectionMode = () => {
  connectionSourceNode.value = null
  globalConnectionMode.value = false
  document.removeEventListener('mousemove', trackMouse)
  document.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('click', handleCanvasClick)
  document.body.style.cursor = 'default'
  console.log('🔵 Modo de conexão cancelado')
}

const trackMouse = (event) => {
  const canvas = document.querySelector('.funnel-canvas')
  if (canvas) {
    const rect = canvas.getBoundingClientRect()
    mousePosition.value = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }
}

const handleKeyDown = (event) => {
  if (event.key === 'Escape' && globalConnectionMode.value) {
    resetConnectionMode()
  }
}

const handleCanvasClick = (event) => {
  if (!globalConnectionMode.value) return
  
  // Verificar se clicou em um card ou handle
  const clickedOnNode = event.target.closest('.vue-flow__node')
  const clickedOnHandle = event.target.closest('.vue-flow__handle')
  
  // Se não clicou em nada relevante, cancelar conexão
  if (!clickedOnNode && !clickedOnHandle) {
    resetConnectionMode()
  }
}

const toggleCompactMode = () => {
  compactMode.value = !compactMode.value
  console.log('Modo compacto:', compactMode.value)
}

const onEdgeClick = (event) => {
  const options = [
    'Excluir conexão',
    'Alterar destino',
    'Cancelar'
  ]
  
  const choice = prompt(`Escolha uma opção:\n1 - ${options[0]}\n2 - ${options[1]}\n3 - ${options[2]}\n\nDigite o número:`)
  
  if (choice === '1') {
    if (confirm('Excluir esta conexão?')) {
      funnelStore.deleteEdge(event.edge.id)
    }
  } else if (choice === '2') {
    // Iniciar modo de realocação
    startEdgeReallocation(event.edge)
  }
}

const startEdgeReallocation = (edge) => {
  // Excluir edge atual
  funnelStore.deleteEdge(edge.id)
  
  // Iniciar nova conexão do mesmo nó origem
  onStartConnection(edge.source)
  
  alert('Clique na bolinha esquerda do novo destino para reconectar')
}

const getEdgePulses = (edgeId) => {
  return pulses.value.filter(p => p.edgeId === edgeId)
}

onMounted(async () => {
  await funnelStore.loadFunnel(route.params.id)
  await funnelStore.loadEdges(route.params.id)
  setTimeout(() => fitView(), 100)
  
  // Listeners para eventos globais de conexão
  window.addEventListener('funnel-start-connection', (event) => {
    onStartConnection(event.detail.nodeId)
  })
  
  window.addEventListener('funnel-complete-connection', (event) => {
    onCreateConnection({ target: event.detail.targetNodeId })
  })
})

onUnmounted(() => {
  funnelStore.stopRealtime()
  resetConnectionMode()
  
  // Remover listeners globais
  window.removeEventListener('funnel-start-connection', onStartConnection)
  window.removeEventListener('funnel-complete-connection', onCreateConnection)
})
</script>

<style scoped>
.funnel-builder {
  display: flex;
  height: calc(100vh - 64px);
}

.palette-sidebar {
  border-right: 1px solid #e0e0e0;
}

.palette-item {
  cursor: grab;
}

.palette-item:active {
  cursor: grabbing;
}

.canvas-container {
  flex: 1;
  position: relative;
}

.funnel-canvas {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-attachment: fixed;
}

.connection-line-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
}

.edge-label {
  position: relative;
  background: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid #e0e0e0;
}

.pulse {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #4caf50;
  border-radius: 50%;
  animation: pulse-flow 2s ease-in-out;
}

@keyframes pulse-flow {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  50% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
</style>