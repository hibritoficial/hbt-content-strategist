<template>
  <v-tooltip location="top">
    <template #activator="{ props }">
      <v-btn
        icon="mdi-help-circle-outline"
        size="x-small"
        variant="text"
        color="grey-darken-1"
        v-bind="props"
        @click="openDoc"
        class="doc-hotspot"
      />
    </template>
    <span>Ajuda: {{ title }}</span>
  </v-tooltip>
</template>

<script setup>
import { useDocsStore } from '@/stores/docs'

const props = defineProps({
  topic: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Ver ajuda'
  }
})

const docsStore = useDocsStore()

const openDoc = () => {
  docsStore.openTopic(props.topic)
}
</script>

<style scoped>
.doc-hotspot {
  opacity: 0.6;
  transition: opacity 0.2s;
}

.doc-hotspot:hover {
  opacity: 1;
}
</style>