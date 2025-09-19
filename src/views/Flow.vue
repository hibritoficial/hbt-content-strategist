<template>
  <v-container fluid class="pa-0" style="height: 100vh;">
    <!-- Header Controls -->
    <v-app-bar density="compact" color="white" elevation="1">
      <v-toolbar-title class="d-flex align-center gap-2">
        <v-icon>mdi-sitemap</v-icon>
        Fluxo HIBRIT STRATEGIST
        <DocHotspot topic="flow-overview" title="Como usar o Fluxo Canvas" />
      </v-toolbar-title>
      
      <v-spacer />
      
      <v-btn-group density="compact">
        <v-btn
          :color="focusMode ? 'primary' : 'default'"
          @click="toggleFocusMode"
        >
          <v-icon>mdi-focus-field</v-icon>
          Focus
        </v-btn>
        <v-btn @click="fitView">
          <v-icon>mdi-fit-to-screen</v-icon>
          Fit
        </v-btn>
        <v-btn @click="exportCanvas">
          <v-icon>mdi-download</v-icon>
          Export
        </v-btn>
        <v-btn @click="startStoryMode" color="success">
          <v-icon>mdi-play</v-icon>
          Tour 30s
        </v-btn>
      </v-btn-group>
    </v-app-bar>

    <!-- Breadcrumb -->
    <v-breadcrumbs
      v-if="selectedNode"
      :items="breadcrumbItems"
      density="compact"
      class="px-4 py-2"
    />

    <!-- Canvas -->
    <div class="flow-container">
      <VueFlow
        v-model:nodes="computedNodes"
        v-model:edges="edges"
        :node-types="nodeTypes"
        class="vue-flow"
        @node-click="onNodeClick"
        @node-drag-stop="onNodeDragStop"
        @node-double-click="onNodeDoubleClick"
      >
        <!-- <Background /> -->
        <MiniMap />
        <Controls />
      </VueFlow>
    </div>

    <!-- Lane Labels -->
    <div class="lane-labels">
      <div class="lane-label lane-label--entradas">
        <v-icon color="green">mdi-import</v-icon>
        Entradas
      </div>
      <div class="lane-label lane-label--processo">
        <v-icon color="orange">mdi-cog</v-icon>
        Processamento A-G
      </div>
      <div class="lane-label lane-label--saidas">
        <v-icon color="blue">mdi-export</v-icon>
        Saídas
      </div>
    </div>
    
    <!-- Story Mode -->
    <StoryMode
      v-model="storyMode"
      @highlight-node="onHighlightNode"
    />
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, markRaw } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
// import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { useFlowStore } from '@/stores/flow'
import { useDocsStore } from '@/stores/docs'
import FlowNode from '@/components/flow/FlowNode.vue'
import DocHotspot from '@/components/docs/DocHotspot.vue'
import StoryMode from '@/components/flow/StoryMode.vue'
import '@vue-flow/core/dist/style.css'
import '@/styles/vue-flow.css'

const flowStore = useFlowStore()
const docsStore = useDocsStore()
const { fitView: vueFlowFitView } = useVueFlow()

const storyMode = ref(false)
const highlightedNode = ref(null)

const nodes = computed({
  get: () => flowStore.nodes,
  set: (value) => {
    flowStore.nodes = value
  }
})

const edges = computed({
  get: () => flowStore.edges,
  set: (value) => {
    flowStore.edges = value
  }
})

const computedNodes = computed({
  get: () => flowStore.nodes.map(node => ({
    ...node,
    data: {
      ...node.data,
      highlighted: highlightedNode.value === node.id
    }
  })),
  set: (value) => {
    flowStore.nodes = value
  }
})
const selectedNode = computed(() => flowStore.selectedNode)
const focusMode = computed(() => flowStore.focusMode)

const nodeTypes = {
  stage: markRaw(FlowNode)
}

const breadcrumbItems = computed(() => {
  if (!selectedNode.value) return []
  
  return [
    { title: 'Fluxo', disabled: false },
    { title: selectedNode.value.lane, disabled: false },
    { title: selectedNode.value.label, disabled: true }
  ]
})

const onNodeClick = (event) => {
  flowStore.selectNode(event.node.id)
  docsStore.openTopic(event.node.id)
}

const toggleFocusMode = () => {
  flowStore.toggleFocusMode()
}

const fitView = () => {
  vueFlowFitView({ padding: 0.2 })
}

const exportCanvas = () => {
  // TODO: Implementar export PNG/SVG
  console.log('Exporting canvas...')
}

const startStoryMode = () => {
  storyMode.value = true
}

const onHighlightNode = (nodeId) => {
  highlightedNode.value = nodeId
  if (nodeId) {
    // Focar no nó destacado
    const node = flowStore.nodes.find(n => n.id === nodeId)
    if (node) {
      flowStore.selectNode(nodeId)
    }
  }
}

const onNodeDragStop = (event) => {
  const { node } = event
  flowStore.saveNodePosition(node.id, node.position)
}

const onNodeDoubleClick = (event) => {
  const { node } = event
  // Alternar status do nó
  const currentStatus = node.data.status || 'pending'
  const nextStatus = {
    'pending': 'active',
    'active': 'completed',
    'completed': 'pending'
  }[currentStatus]
  
  flowStore.updateNodeStatus(node.id, nextStatus)
}

onMounted(async () => {
  await flowStore.initializeFlow()
  setTimeout(() => fitView(), 100)
})
</script>

<style scoped>
.flow-container {
  height: calc(100vh - 120px);
  position: relative;
}

.vue-flow {
  background: #fafafa;
}

.lane-labels {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  pointer-events: none;
}

.lane-label {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 120px;
  font-weight: 500;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
</style>

