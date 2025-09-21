<template>
  <v-navigation-drawer
    v-model="docsStore.isOpen"
    location="right"
    width="380"
    temporary
    class="doc-dock"
  >
    <v-card flat height="100%">
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Ajuda</span>
        <v-btn
          icon="mdi-close"
          size="small"
          variant="text"
          @click="docsStore.toggle"
        />
      </v-card-title>

      <v-card-text class="pa-0">
        <!-- Search -->
        <v-text-field
          v-model="searchQuery"
          placeholder="Buscar ajuda..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          class="ma-4"
          @input="handleSearch"
        />

        <!-- Content -->
        <div v-if="currentTopic" class="px-4">
          <!-- Breadcrumb -->
          <div v-if="currentTopic.breadcrumb" class="breadcrumb mb-3">
            <span class="breadcrumb-text">{{ currentTopic.breadcrumb }}</span>
          </div>
          
          <h3 class="text-h6 mb-3">{{ currentTopic.title }}</h3>
          
          <v-tabs v-model="docsStore.activeTab" density="compact">
            <v-tab value="sistema">Sistema</v-tab>
            <v-tab value="metodo">Método</v-tab>
            <v-tab value="conhecimento">Conhecimento</v-tab>
          </v-tabs>

          <v-window v-model="docsStore.activeTab" class="mt-4">
            <v-window-item
              v-for="(content, dimension) in currentTopic.content"
              :key="dimension"
              :value="dimension"
            >
              <div class="doc-content" v-html="formatContent(content)"></div>
            </v-window-item>
          </v-window>

          <!-- Related Topics -->
          <div v-if="currentTopic.related?.length" class="mt-6">
            <h4 class="text-subtitle-2 mb-2">Ver também</h4>
            <div class="d-flex flex-wrap gap-1">
              <v-chip
                v-for="relatedId in currentTopic.related"
                :key="relatedId"
                size="small"
                variant="outlined"
                @click="docsStore.openTopic(relatedId)"
              >
                {{ getTopicTitle(relatedId) }}
              </v-chip>
            </div>
          </div>
        </div>

        <!-- Search Results -->
        <div v-else-if="searchResults.length" class="px-4">
          <h3 class="text-h6 mb-3">Resultados</h3>
          <v-list density="compact">
            <v-list-item
              v-for="result in searchResults"
              :key="result.id"
              @click="docsStore.openTopic(result.id)"
            >
              <v-list-item-title>{{ result.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>

        <!-- Default Content -->
        <div v-else class="px-4">
          <h3 class="text-h6 mb-3">Tópicos Populares</h3>
          <v-list density="compact">
            <v-list-item
              v-for="topic in popularTopics"
              :key="topic.id"
              @click="docsStore.openTopic(topic.id)"
            >
              <v-list-item-title>{{ topic.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDocsStore } from '@/stores/docs'

const docsStore = useDocsStore()
const searchQuery = ref('')
const searchResults = ref([])

const currentTopic = computed(() => docsStore.currentTopic)

const popularTopics = computed(() => 
  Object.values(docsStore.topics).slice(0, 5)
)

const handleSearch = () => {
  if (searchQuery.value.length > 2) {
    searchResults.value = docsStore.searchTopics(searchQuery.value)
  } else {
    searchResults.value = []
  }
}

const getTopicTitle = (topicId) => {
  return docsStore.topics[topicId]?.title || topicId
}

const formatContent = (content) => {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
    .replace(/• /g, '&nbsp;&nbsp;• ')
}
</script>

<style scoped>
.doc-dock {
  z-index: 2000;
}

.breadcrumb {
  padding: 8px 12px;
  background: rgba(37, 99, 235, 0.1);
  border-radius: 6px;
  border-left: 3px solid #2563eb;
}

.breadcrumb-text {
  font-size: 0.8rem;
  color: #2563eb;
  font-weight: 500;
}

.doc-content {
  line-height: 1.6;
  font-size: 0.9rem;
}

.doc-content strong {
  color: #1f2937;
  font-weight: 600;
}

.doc-content em {
  color: #6b7280;
  font-style: italic;
}

.doc-content code {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.85em;
}
</style>