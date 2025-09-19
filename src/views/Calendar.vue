<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center mb-6">
          <h1 class="text-h4">Calendar</h1>
          <div class="d-flex gap-2">
            <v-btn-toggle v-model="viewMode" mandatory>
              <v-btn value="week">Semana</v-btn>
              <v-btn value="month">Mês</v-btn>
            </v-btn-toggle>
            <v-btn
              color="primary"
              prepend-icon="mdi-plus"
              @click="createNew"
            >
              Novo Conteúdo
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Filtros -->
    <v-row class="mb-4">
      <v-col cols="12" md="3">
        <v-select
          v-model="filters.pillar"
          :items="pillars"
          item-title="name"
          item-value="id"
          label="Filtrar por Pilar"
          clearable
          variant="outlined"
          density="compact"
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          v-model="filters.status"
          :items="statusOptions"
          label="Filtrar por Status"
          clearable
          variant="outlined"
          density="compact"
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          v-model="filters.format"
          :items="formats"
          item-title="name"
          item-value="id"
          label="Filtrar por Formato"
          clearable
          variant="outlined"
          density="compact"
        />
      </v-col>
    </v-row>

    <!-- Calendar Grid -->
    <v-card>
      <v-card-text>
        <div v-if="viewMode === 'week'" class="calendar-week">
          <div class="calendar-header">
            <div
              v-for="day in weekDays"
              :key="day.date"
              class="calendar-day-header"
            >
              <div class="text-subtitle-2 font-weight-bold">
                {{ day.name }}
              </div>
              <div class="text-caption text-grey">
                {{ day.date }}
              </div>
            </div>
          </div>
          
          <div class="calendar-body">
            <div
              v-for="day in weekDays"
              :key="day.date"
              class="calendar-day-column"
              @drop="onDrop($event, day.date)"
              @dragover.prevent
            >
              <v-card
                v-for="item in getItemsForDate(day.date)"
                :key="item.id"
                class="calendar-item mb-2"
                :color="getStatusColor(item.status)"
                variant="tonal"
                draggable="true"
                @dragstart="onDragStart($event, item)"
                @click="openEditor(item.id)"
              >
                <v-card-text class="pa-2">
                  <div class="text-caption font-weight-bold">
                    {{ item.title }}
                  </div>
                  <div class="text-caption text-grey-darken-1">
                    {{ item.pillars?.name }}
                  </div>
                  <v-chip
                    size="x-small"
                    :color="getStatusColor(item.status)"
                    variant="flat"
                    class="mt-1"
                  >
                    {{ formatStatus(item.status) }}
                  </v-chip>
                </v-card-text>
              </v-card>
            </div>
          </div>
        </div>

        <!-- Month view placeholder -->
        <div v-else class="text-center py-8">
          <v-icon size="64" color="grey">mdi-calendar-month</v-icon>
          <p class="text-grey mt-2">Visão mensal em desenvolvimento</p>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useContentStore } from '@/stores/content'
import { useLibraryStore } from '@/stores/library'
import dayjs from 'dayjs'

const router = useRouter()
const contentStore = useContentStore()

const viewMode = ref('week')
const filters = ref({
  pillar: null,
  status: null,
  format: null
})

const libraryStore = useLibraryStore()
const { pillars, formats } = libraryStore

const statusOptions = [
  { title: 'Backlog', value: 'backlog' },
  { title: 'Brief', value: 'brief' },
  { title: 'Copy', value: 'draft_copy' },
  { title: 'Design', value: 'design' },
  { title: 'Pronto', value: 'ready' },
  { title: 'Agendado', value: 'scheduled' },
  { title: 'Publicado', value: 'published' }
]

const weekDays = computed(() => {
  const startOfWeek = dayjs().startOf('week')
  return Array.from({ length: 7 }, (_, i) => {
    const date = startOfWeek.add(i, 'day')
    return {
      name: date.format('ddd'),
      date: date.format('YYYY-MM-DD')
    }
  })
})

const filteredItems = computed(() => {
  let items = contentStore.items
  
  if (filters.value.pillar) {
    items = items.filter(item => item.pillar_id === filters.value.pillar)
  }
  
  if (filters.value.status) {
    items = items.filter(item => item.status === filters.value.status)
  }
  
  if (filters.value.format) {
    items = items.filter(item => item.format_id === filters.value.format)
  }
  
  return items
})

const getItemsForDate = (date) => {
  return filteredItems.value.filter(item => 
    dayjs(item.scheduled_date).format('YYYY-MM-DD') === date
  )
}

const getStatusColor = (status) => {
  const colors = {
    backlog: 'grey',
    brief: 'blue',
    draft_copy: 'orange',
    design: 'purple',
    ready: 'green',
    scheduled: 'teal',
    published: 'success'
  }
  return colors[status] || 'grey'
}

const formatStatus = (status) => {
  const labels = {
    backlog: 'Backlog',
    brief: 'Brief',
    draft_copy: 'Copy',
    design: 'Design',
    ready: 'Pronto',
    scheduled: 'Agendado',
    published: 'Publicado'
  }
  return labels[status] || status
}

const createNew = () => {
  router.push('/editor/new')
}

const openEditor = (id) => {
  router.push(`/editor/${id}`)
}

let draggedItem = null

const onDragStart = (event, item) => {
  draggedItem = item
  event.dataTransfer.effectAllowed = 'move'
}

const onDrop = async (event, date) => {
  event.preventDefault()
  
  if (draggedItem && draggedItem.scheduled_date !== date) {
    await contentStore.updateItem(draggedItem.id, {
      scheduled_date: date
    })
    draggedItem = null
  }
}

onMounted(async () => {
  await Promise.all([
    contentStore.fetchItems(),
    libraryStore.loadAll()
  ])
})
</script>

<style scoped>
.calendar-week {
  min-height: 500px;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

.calendar-day-header {
  text-align: center;
  padding: 8px;
  border-bottom: 2px solid #e0e0e0;
}

.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  min-height: 400px;
}

.calendar-day-column {
  border: 1px dashed #e0e0e0;
  border-radius: 4px;
  padding: 8px;
  min-height: 400px;
}

.calendar-item {
  cursor: pointer;
  transition: transform 0.2s;
}

.calendar-item:hover {
  transform: scale(1.02);
}
</style>