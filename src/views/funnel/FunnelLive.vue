<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center mb-6">
          <div>
            <h1 class="text-h4">Funnel Live</h1>
            <p class="text-subtitle-1 text-grey-darken-1">
              Visualização em tempo real do funil ativo
            </p>
          </div>
          
          <div class="d-flex gap-2">
            <v-btn-toggle v-model="timeWindow" mandatory>
              <v-btn value="5min">5min</v-btn>
              <v-btn value="30min">30min</v-btn>
              <v-btn value="120min">2h</v-btn>
            </v-btn-toggle>
            
            <v-btn
              color="primary"
              prepend-icon="mdi-pencil"
              :to="'/funnel/design'"
            >
              Editar Funil
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <div class="funnel-live-container">
              <!-- Vue Flow em modo read-only -->
              <VueFlow
                :nodes="nodes"
                :edges="edges"
                :node-types="nodeTypes"
                class="funnel-flow"
                :default-viewport="{ zoom: 0.8 }"
                :nodes-draggable="false"
                :nodes-connectable="false"
                :elements-selectable="false"
              >
                <Background />
                <MiniMap />
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
import { useFunnelStore } from '@/stores/funnel'
import { useWorkspaceStore } from '@/stores/workspace'
import FunnelNode from '@/components/funnel/FunnelNode.vue'

const funnelStore = useFunnelStore()
const workspaceStore = useWorkspaceStore()

const timeWindow = ref('30min')
const nodes = ref([])
const edges = ref([])

const nodeTypes = {
  funnel: FunnelNode
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
.funnel-live-container {
  height: 600px;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
}

.funnel-flow {
  height: 100%;
}
</style>