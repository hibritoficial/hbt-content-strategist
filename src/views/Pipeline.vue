<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center mb-6">
          <h1 class="text-h4">Pipeline</h1>
          <v-btn
            color="primary"
            prepend-icon="mdi-plus"
            @click="createNew"
          >
            Novo Conteúdo
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="status in statuses"
        :key="status.key"
        cols="12"
        md="3"
        lg="2"
      >
        <v-card
          :color="status.color"
          variant="tonal"
          class="pipeline-column"
          min-height="600"
        >
          <v-card-title class="d-flex justify-space-between align-center">
            <span>{{ status.label }}</span>
            <v-chip size="small" variant="flat">
              {{ getItemsByStatus(status.key).length }}
            </v-chip>
          </v-card-title>
          
          <v-card-text>
            <div class="pipeline-items">
              <v-card
                v-for="item in getItemsByStatus(status.key)"
                :key="item.id"
                class="mb-3 pipeline-item"
                elevation="2"
                @click="openEditor(item.id)"
              >
                <v-card-text class="pa-3">
                  <div class="text-subtitle-2 font-weight-bold mb-1">
                    {{ item.title }}
                  </div>
                  <div class="text-caption text-grey-darken-1 mb-2">
                    {{ item.pillars?.name }} • {{ item.formats?.name }}
                  </div>
                  <div class="d-flex justify-space-between align-center">
                    <v-chip
                      size="x-small"
                      :color="getCTAColor(item.cta_keyword_id)"
                      variant="flat"
                    >
                      {{ item.cta_text || 'Sem CTA' }}
                    </v-chip>
                    <v-menu>
                      <template #activator="{ props }">
                        <v-btn
                          icon="mdi-dots-vertical"
                          size="x-small"
                          variant="text"
                          v-bind="props"
                          @click.stop
                        />
                      </template>
                      <v-list density="compact">
                        <v-list-item @click="duplicateItem(item)">
                          <v-list-item-title>Duplicar</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="generateVariations(item)">
                          <v-list-item-title>Gerar 3 Variações</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="deleteItem(item.id)">
                          <v-list-item-title>Excluir</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useContentStore } from '@/stores/content'
import dayjs from 'dayjs'

const router = useRouter()
const contentStore = useContentStore()

const statuses = [
  { key: 'backlog', label: 'Backlog', color: 'grey' },
  { key: 'brief', label: 'Brief', color: 'blue' },
  { key: 'draft_copy', label: 'Copy', color: 'orange' },
  { key: 'design', label: 'Design', color: 'purple' },
  { key: 'ready', label: 'Pronto', color: 'green' },
  { key: 'scheduled', label: 'Agendado', color: 'teal' },
  { key: 'published', label: 'Publicado', color: 'success' }
]

const getItemsByStatus = (status) => {
  return contentStore.items.filter(item => item.status === status)
}

const getCTAColor = (keywordId) => {
  // Implementar lógica de cores por keyword
  return keywordId ? 'primary' : 'grey'
}

const createNew = () => {
  router.push('/editor/new')
}

const openEditor = (id) => {
  router.push(`/editor/${id}`)
}

const duplicateItem = async (item) => {
  const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD')
  const duplicatedItem = {
    ...item,
    id: undefined,
    title: `${item.title} (Cópia)`,
    status: 'backlog',
    scheduled_date: tomorrow,
    created_at: undefined,
    updated_at: undefined
  }
  
  await contentStore.createItem(duplicatedItem)
}

const generateVariations = (item) => {
  // Implementar geração de variações por IA
  console.log('Generating variations for:', item.title)
}

const deleteItem = async (id) => {
  if (confirm('Tem certeza que deseja excluir este item?')) {
    await contentStore.deleteItem(id)
  }
}

onMounted(() => {
  contentStore.fetchItems()
})
</script>

<style scoped>
.pipeline-column {
  min-height: 600px;
}

.pipeline-items {
  min-height: 500px;
}

.pipeline-item {
  cursor: pointer;
  transition: transform 0.2s;
}

.pipeline-item:hover {
  transform: translateY(-2px);
}
</style>