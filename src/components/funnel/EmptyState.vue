<template>
  <div v-if="showEmptyState && !showTourState" class="empty-state">
    <v-card
      class="empty-state-card"
      elevation="0"
      variant="outlined"
    >
      <v-card-text class="text-center py-8">
        <v-icon size="64" color="grey-lighten-1">mdi-connection</v-icon>
        <h3 class="mt-4 mb-2">Conecte os nós</h3>
        <p class="text-body-2 text-grey mb-4">
          Arraste do ponto azul <span class="connection-demo"></span> para criar conexões entre os nós
        </p>
        <v-btn
          size="small"
          variant="outlined"
          @click="startTour"
        >
          Tour rápido (20s)
        </v-btn>
        
        <v-btn
          size="small"
          variant="text"
          class="ml-2"
          @click="$emit('dismiss')"
        >
          Dispensar
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  nodes: Array,
  edges: Array
})

const emit = defineEmits(['start-tour', 'dismiss'])

const showEmptyState = computed(() => {
  return props.nodes.length > 1 && props.edges.length === 0
})

const showTourState = ref(false)

const startTour = () => {
  showTourState.value = true
  emit('start-tour')
  
  // Simular tour de 3 segundos e fechar
  setTimeout(() => {
    showTourState.value = false
  }, 3000)
}
</script>

<style scoped>
.empty-state {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  pointer-events: none;
}

.empty-state-card {
  pointer-events: all;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
}

.connection-demo {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1976d2;
  margin: 0 4px;
}
</style>