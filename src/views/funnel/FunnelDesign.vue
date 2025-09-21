<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center mb-6">
          <div>
            <h1 class="text-h4">Funnel Design</h1>
            <p class="text-subtitle-1 text-grey-darken-1">
              Editor visual do funil
            </p>
          </div>
          
          <div class="d-flex gap-2">
            <v-btn
              variant="outlined"
              prepend-icon="mdi-eye"
              :to="'/funnel/live'"
            >
              Ver Live
            </v-btn>
            
            <v-btn
              color="primary"
              prepend-icon="mdi-content-save"
              @click="saveFunnel"
              :loading="saving"
            >
              Salvar
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <div class="funnel-design-container">
              <!-- Vue Flow editável -->
              <VueFlow
                v-model:nodes="nodes"
                v-model:edges="edges"
                :node-types="nodeTypes"
                class="funnel-flow"
                :default-viewport="{ zoom: 0.8 }"
                @nodes-change="onNodesChange"
                @edges-change="onEdgesChange"
              >
                <Background />
                <MiniMap />
                <Controls />
              </VueFlow>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import { useFunnelStore } from '@/stores/funnel'
import { useWorkspaceStore } from '@/stores/workspace'
import FunnelNode from '@/components/funnel/FunnelNode.vue'

const funnelStore = useFunnelStore()
const workspaceStore = useWorkspaceStore()

const saving = ref(false)
const nodes = ref([])
const edges = ref([])

const nodeTypes = {
  funnel: FunnelNode
}

const onNodesChange = (changes) => {
  // Handle node changes
}

const onEdgesChange = (changes) => {
  // Handle edge changes
}

const saveFunnel = async () => {
  saving.value = true
  try {
    await funnelStore.saveFunnel(workspaceStore.currentId, nodes.value, edges.value)
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  if (workspaceStore.currentId) {
    await funnelStore.loadFunnel(workspaceStore.currentId)
    nodes.value = funnelStore.nodes
    edges.value = funnelStore.edges
  }
})
</script>

<style scoped>
.funnel-design-container {
  height: 600px;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
}

.funnel-flow {
  height: 100%;
}
</style>