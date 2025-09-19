<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-6">Métricas</h1>
      </v-col>
    </v-row>

    <!-- Filtros -->
    <v-row class="mb-4">
      <v-col cols="12" md="3">
        <v-select
          v-model="filters.period"
          :items="periodOptions"
          label="Período"
          variant="outlined"
          density="compact"
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          v-model="filters.pillar"
          :items="pillars"
          item-title="name"
          item-value="id"
          label="Pilar"
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
          label="Formato"
          clearable
          variant="outlined"
          density="compact"
        />
      </v-col>
    </v-row>

    <!-- Cards de Métricas Gerais -->
    <v-row class="mb-6">
      <v-col cols="12" md="3">
        <v-card color="primary" variant="tonal">
          <v-card-text class="text-center">
            <v-icon size="48" class="mb-2">mdi-heart</v-icon>
            <div class="text-h4 font-weight-bold">{{ overallMetrics.avg_save_rate }}%</div>
            <div class="text-subtitle-2">Taxa de Salvamento Média</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card color="success" variant="tonal">
          <v-card-text class="text-center">
            <v-icon size="48" class="mb-2">mdi-share</v-icon>
            <div class="text-h4 font-weight-bold">{{ overallMetrics.avg_share_rate }}%</div>
            <div class="text-subtitle-2">Taxa de Compartilhamento</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card color="info" variant="tonal">
          <v-card-text class="text-center">
            <v-icon size="48" class="mb-2">mdi-message</v-icon>
            <div class="text-h4 font-weight-bold">{{ overallMetrics.avg_dms }}</div>
            <div class="text-subtitle-2">DMs Médias por Post</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card color="warning" variant="tonal">
          <v-card-text class="text-center">
            <v-icon size="48" class="mb-2">mdi-mouse</v-icon>
            <div class="text-h4 font-weight-bold">{{ overallMetrics.avg_link_clicks }}</div>
            <div class="text-subtitle-2">Cliques em Links</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Tabela de Métricas Detalhadas -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            <span>Métricas Detalhadas</span>
            <v-btn
              color="primary"
              prepend-icon="mdi-plus"
              @click="openMetricDialog"
            >
              Adicionar Métrica
            </v-btn>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="filteredMetrics"
            :loading="loading"
            class="elevation-1"
          >
            <template #item.content_title="{ item }">
              <div class="d-flex align-center">
                <v-chip
                  :color="getPillarColor(item.pillar_name)"
                  size="small"
                  variant="flat"
                  class="mr-2"
                >
                  {{ item.pillar_name }}
                </v-chip>
                {{ item.content_title }}
              </div>
            </template>
            
            <template #item.hook_rate="{ item }">
              <v-progress-linear
                :model-value="item.hook_rate"
                color="primary"
                height="20"
                rounded
              >
                <template #default="{ value }">
                  <small>{{ Math.ceil(value) }}%</small>
                </template>
              </v-progress-linear>
            </template>
            
            <template #item.save_rate="{ item }">
              <v-progress-linear
                :model-value="item.save_rate"
                color="success"
                height="20"
                rounded
              >
                <template #default="{ value }">
                  <small>{{ Math.ceil(value) }}%</small>
                </template>
              </v-progress-linear>
            </template>
            
            <template #item.share_rate="{ item }">
              <v-progress-linear
                :model-value="item.share_rate"
                color="info"
                height="20"
                rounded
              >
                <template #default="{ value }">
                  <small>{{ Math.ceil(value) }}%</small>
                </template>
              </v-progress-linear>
            </template>
            
            <template #item.actions="{ item }">
              <v-btn
                icon="mdi-pencil"
                size="small"
                @click="editMetric(item)"
              />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Gráficos -->
    <v-row class="mt-6">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Performance por Pilar</v-card-title>
          <v-card-text>
            <div class="text-center py-8">
              <v-icon size="64" color="grey">mdi-chart-bar</v-icon>
              <p class="text-grey mt-2">Gráfico em desenvolvimento</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Ranking de Hooks</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(hook, index) in topHooks"
                :key="hook.pattern"
              >
                <template #prepend>
                  <v-chip
                    :color="index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze'"
                    size="small"
                  >
                    {{ index + 1 }}
                  </v-chip>
                </template>
                <v-list-item-title>{{ hook.pattern }}</v-list-item-title>
                <v-list-item-subtitle>{{ hook.avg_rate }}% de engajamento</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog para adicionar/editar métrica -->
    <v-dialog v-model="metricDialog" max-width="600px">
      <v-card>
        <v-card-title>
          {{ editingMetric ? 'Editar' : 'Adicionar' }} Métrica
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-select
              v-model="metricForm.content_id"
              :items="contentItems"
              item-title="title"
              item-value="id"
              label="Conteúdo"
              variant="outlined"
              class="mb-4"
            />
            
            <v-text-field
              v-model="metricForm.date"
              label="Data"
              type="date"
              variant="outlined"
              class="mb-4"
            />
            
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="metricForm.hook_rate"
                  label="Taxa de Hook (%)"
                  type="number"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="metricForm.save_rate"
                  label="Taxa de Salvamento (%)"
                  type="number"
                  variant="outlined"
                />
              </v-col>
            </v-row>
            
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="metricForm.share_rate"
                  label="Taxa de Compartilhamento (%)"
                  type="number"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="metricForm.link_clicks"
                  label="Cliques em Links"
                  type="number"
                  variant="outlined"
                />
              </v-col>
            </v-row>
            
            <v-text-field
              v-model="metricForm.dms"
              label="DMs Recebidas"
              type="number"
              variant="outlined"
              class="mb-4"
            />
            
            <v-textarea
              v-model="metricForm.notes"
              label="Observações"
              variant="outlined"
              rows="3"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="metricDialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="saveMetric">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import dayjs from 'dayjs'

const loading = ref(false)
const metricDialog = ref(false)
const editingMetric = ref(null)

const filters = ref({
  period: '30d',
  pillar: null,
  format: null
})

const metricForm = ref({
  content_id: null,
  date: dayjs().format('YYYY-MM-DD'),
  hook_rate: 0,
  save_rate: 0,
  share_rate: 0,
  link_clicks: 0,
  dms: 0,
  notes: ''
})

const periodOptions = [
  { title: 'Últimos 7 dias', value: '7d' },
  { title: 'Últimos 30 dias', value: '30d' },
  { title: 'Últimos 90 dias', value: '90d' }
]

const pillars = ref([])
const formats = ref([])
const contentItems = ref([])

// Carregar dados do Supabase
const loadData = async () => {
  const [pillarsRes, formatsRes, contentRes] = await Promise.all([
    supabase.from('pillars').select('*'),
    supabase.from('formats').select('*'),
    supabase.from('content_items').select('id, title')
  ])
  
  pillars.value = pillarsRes.data || []
  formats.value = formatsRes.data || []
  contentItems.value = contentRes.data || []
}

const headers = [
  { title: 'Conteúdo', key: 'content_title' },
  { title: 'Data', key: 'date' },
  { title: 'Hook', key: 'hook_rate' },
  { title: 'Salvamento', key: 'save_rate' },
  { title: 'Compartilhamento', key: 'share_rate' },
  { title: 'Cliques', key: 'link_clicks' },
  { title: 'DMs', key: 'dms' },
  { title: 'Ações', key: 'actions', sortable: false }
]

const metrics = ref([
  {
    id: 1,
    content_id: 1,
    content_title: 'Como criar conteúdo viral',
    pillar_name: 'Educação',
    date: '2024-01-15',
    hook_rate: 85,
    save_rate: 12,
    share_rate: 8,
    link_clicks: 45,
    dms: 23,
    notes: 'Ótima performance'
  },
  {
    id: 2,
    content_id: 2,
    content_title: 'Motivação para segunda-feira',
    pillar_name: 'Inspiração',
    date: '2024-01-14',
    hook_rate: 72,
    save_rate: 18,
    share_rate: 15,
    link_clicks: 12,
    dms: 8,
    notes: 'Bom engajamento'
  }
])



const overallMetrics = computed(() => {
  const filtered = filteredMetrics.value
  if (filtered.length === 0) return { avg_save_rate: 0, avg_share_rate: 0, avg_dms: 0, avg_link_clicks: 0 }
  
  return {
    avg_save_rate: Math.round(filtered.reduce((sum, m) => sum + m.save_rate, 0) / filtered.length),
    avg_share_rate: Math.round(filtered.reduce((sum, m) => sum + m.share_rate, 0) / filtered.length),
    avg_dms: Math.round(filtered.reduce((sum, m) => sum + m.dms, 0) / filtered.length),
    avg_link_clicks: Math.round(filtered.reduce((sum, m) => sum + m.link_clicks, 0) / filtered.length)
  }
})

const filteredMetrics = computed(() => {
  let filtered = metrics.value
  
  if (filters.value.pillar) {
    filtered = filtered.filter(m => m.pillar_id === filters.value.pillar)
  }
  
  if (filters.value.format) {
    filtered = filtered.filter(m => m.format_id === filters.value.format)
  }
  
  return filtered
})

const topHooks = ref([
  { pattern: 'Você sabia que...', avg_rate: 85 },
  { pattern: 'O segredo para...', avg_rate: 78 },
  { pattern: 'Pare tudo e veja...', avg_rate: 72 }
])

const getPillarColor = (pillarName) => {
  const colors = {
    'Educação': 'primary',
    'Inspiração': 'success',
    'Entretenimento': 'warning'
  }
  return colors[pillarName] || 'grey'
}

const openMetricDialog = () => {
  editingMetric.value = null
  Object.keys(metricForm.value).forEach(key => {
    if (key === 'date') {
      metricForm.value[key] = dayjs().format('YYYY-MM-DD')
    } else if (typeof metricForm.value[key] === 'number') {
      metricForm.value[key] = 0
    } else {
      metricForm.value[key] = null
    }
  })
  metricDialog.value = true
}

const editMetric = (metric) => {
  editingMetric.value = metric
  Object.assign(metricForm.value, metric)
  metricDialog.value = true
}

const saveMetric = () => {
  // TODO: Implementar salvamento real
  console.log('Saving metric:', metricForm.value)
  metricDialog.value = false
}

onMounted(() => {
  loadData()
})
</script>