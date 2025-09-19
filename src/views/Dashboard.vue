<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="d-flex align-center gap-2 mb-6">
          <h1 class="text-h4">Dashboard</h1>
          <DocHotspot topic="dashboard-overview" title="Como usar o Dashboard" />
        </div>
      </v-col>
    </v-row>

    <!-- Peças de hoje -->
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>Peças de Hoje</v-card-title>
          <v-card-text>
            <div class="d-flex flex-wrap gap-2">
              <v-chip
                v-for="(count, status) in todayStats"
                :key="status"
                :color="getStatusColor(status)"
                variant="flat"
              >
                {{ formatStatus(status) }}: {{ count }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Ações Rápidas</v-card-title>
          <v-card-text>
            <v-btn
              block
              color="primary"
              prepend-icon="mdi-plus"
              class="mb-2"
              @click="$router.push('/editor/new')"
            >
              Novo Conteúdo
            </v-btn>
            <v-btn
              block
              color="secondary"
              prepend-icon="mdi-auto-fix"
              class="mb-2"
            >
              Gerar 3 Copies
            </v-btn>
            <v-btn
              block
              color="accent"
              prepend-icon="mdi-pencil"
              @click="$router.push('/editor/last')"
            >
              Ir ao Editor
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Próximas ações -->
    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Minhas Próximas Ações</v-card-title>
          <v-card-text>
            <v-list density="compact">
              <v-list-item
                v-for="action in nextActions"
                :key="action.id"
                :prepend-icon="action.icon"
                :title="action.title"
                :subtitle="action.subtitle"
                @click="$router.push(action.route)"
              />
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Performance por Pilar</v-card-title>
          <v-card-text>
            <div class="text-center text-grey">
              <v-icon size="64">mdi-chart-line</v-icon>
              <p>Gráficos em desenvolvimento</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useContentStore } from '@/stores/content'
import DocHotspot from '@/components/docs/DocHotspot.vue'
import dayjs from 'dayjs'

const contentStore = useContentStore()

const todayStats = computed(() => {
  const today = dayjs().format('YYYY-MM-DD')
  return contentStore.items
    .filter(item => dayjs(item.scheduled_date).format('YYYY-MM-DD') === today)
    .reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1
      return acc
    }, {})
})

const nextActions = ref([
  {
    id: 1,
    icon: 'mdi-pencil',
    title: 'Finalizar copy do carrossel',
    subtitle: 'Pilar: Educação • Vence hoje',
    route: '/editor/123'
  },
  {
    id: 2,
    icon: 'mdi-image',
    title: 'Aprovar design do post',
    subtitle: 'Pilar: Inspiração • Vence amanhã',
    route: '/pipeline'
  },
  {
    id: 3,
    icon: 'mdi-calendar',
    title: 'Agendar 3 posts da semana',
    subtitle: 'Pendente desde ontem',
    route: '/calendar'
  }
])

const getStatusColor = (status) => {
  const colors = {
    backlog: 'grey',
    brief: 'blue',
    draft_copy: 'orange',
    design: 'purple',
    ready: 'green',
    scheduled: 'teal',
    published: 'success',
    rework: 'error'
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
    published: 'Publicado',
    rework: 'Retrabalho'
  }
  return labels[status] || status
}

onMounted(() => {
  contentStore.fetchItems()
})
</script>