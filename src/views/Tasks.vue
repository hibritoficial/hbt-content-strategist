<template>
  <v-container fluid>
    <div class="d-flex justify-space-between align-center mb-6">
      <h1 class="text-h4">Tarefas Internas</h1>
      
      <div class="d-flex align-center gap-2">
        <v-btn-toggle v-model="viewMode" mandatory>
          <v-btn value="table" icon="mdi-table" title="Tabela" />
          <v-btn value="kanban" icon="mdi-view-column" title="Kanban" />
          <v-btn value="gantt" icon="mdi-chart-gantt" title="Gantt" />
        </v-btn-toggle>
        
        <v-btn color="primary" prepend-icon="mdi-plus" @click="openTaskDialog">
          Nova Tarefa
        </v-btn>
      </div>
    </div>

    <!-- Filtros -->
    <v-card class="mb-4" elevation="1">
      <v-card-text class="py-2">
        <v-row>
          <v-col cols="12" md="3">
            <v-select
              v-model="filters.workspace"
              :items="workspaceOptions"
              label="Cliente"
              variant="outlined"
              density="compact"
              clearable
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="filters.category"
              :items="categoryOptions"
              label="Categoria"
              variant="outlined"
              density="compact"
              clearable
            />
          </v-col>
          <v-col cols="12" md="2">
            <v-select
              v-model="filters.status"
              :items="statusOptions"
              label="Status"
              variant="outlined"
              density="compact"
              clearable
            />
          </v-col>
          <v-col cols="12" md="2">
            <v-select
              v-model="filters.priority"
              :items="priorityOptions"
              label="Prioridade"
              variant="outlined"
              density="compact"
              clearable
            />
          </v-col>
          <v-col cols="12" md="2">
            <v-select
              v-model="filters.assigned"
              :items="userOptions"
              label="Responsável"
              variant="outlined"
              density="compact"
              clearable
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Visualização Tabela -->
    <v-card v-if="viewMode === 'table'">
      <v-data-table
        :headers="tableHeaders"
        :items="filteredTasks"
        :loading="loading"
        item-key="id"
        @click:row="editTask"
      >
        <template #item.workspace_name="{ item }">
          <v-chip size="small" variant="outlined">
            {{ item.workspace_name }}
          </v-chip>
        </template>
        
        <template #item.category_name="{ item }">
          <div class="d-flex align-center gap-2">
            <v-icon :color="item.category_color" size="16">
              {{ item.category_icon }}
            </v-icon>
            {{ item.category_name }}
          </div>
        </template>
        
        <template #item.status="{ item }">
          <v-chip :color="getStatusColor(item.status)" size="small">
            {{ getStatusLabel(item.status) }}
          </v-chip>
        </template>
        
        <template #item.priority="{ item }">
          <v-chip :color="getPriorityColor(item.priority)" size="small">
            {{ getPriorityLabel(item.priority) }}
          </v-chip>
        </template>
        
        <template #item.due_date="{ item }">
          <div v-if="item.due_date" :class="getDateClass(item.urgency_status)">
            {{ formatDate(item.due_date) }}
          </div>
        </template>
        
        <template #item.assigned_to_email="{ item }">
          <v-avatar v-if="item.assigned_to_email" size="24" class="mr-2">
            {{ item.assigned_to_email.charAt(0).toUpperCase() }}
          </v-avatar>
        </template>
      </v-data-table>
    </v-card>

    <!-- Visualização Kanban -->
    <div v-if="viewMode === 'kanban'" class="kanban-board">
      <v-row>
        <v-col v-for="status in kanbanColumns" :key="status.value" cols="12" md="2.4">
          <v-card class="kanban-column" :color="status.color" variant="outlined">
            <v-card-title class="text-center py-2">
              <v-icon :icon="status.icon" class="mr-2" />
              {{ status.title }}
              <v-chip size="x-small" class="ml-2">
                {{ getTasksByStatus(status.value).length }}
              </v-chip>
            </v-card-title>
            
            <v-card-text class="pa-2">
              <div class="kanban-tasks">
                <v-card
                  v-for="task in getTasksByStatus(status.value)"
                  :key="task.id"
                  class="mb-2 task-card"
                  elevation="2"
                  @click="editTask(null, { item: task })"
                >
                  <v-card-text class="pa-3">
                    <div class="d-flex align-center justify-space-between mb-2">
                      <v-chip :color="getPriorityColor(task.priority)" size="x-small">
                        {{ getPriorityLabel(task.priority) }}
                      </v-chip>
                      <v-chip size="x-small" variant="outlined">
                        {{ task.workspace_name }}
                      </v-chip>
                    </div>
                    
                    <div class="text-subtitle-2 mb-2">{{ task.title }}</div>
                    
                    <div class="d-flex align-center justify-space-between">
                      <div class="d-flex align-center gap-1">
                        <v-icon :color="task.category_color" size="14">
                          {{ task.category_icon }}
                        </v-icon>
                        <span class="text-caption">{{ task.category_name }}</span>
                      </div>
                      
                      <div v-if="task.due_date" class="text-caption" :class="getDateClass(task.urgency_status)">
                        {{ formatDate(task.due_date) }}
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Visualização Gantt -->
    <v-card v-if="viewMode === 'gantt'">
      <v-card-title>Cronograma de Tarefas</v-card-title>
      <v-card-text>
        <div class="gantt-container">
          <div class="gantt-header">
            <div class="gantt-task-column">Tarefa</div>
            <div class="gantt-timeline">
              <div v-for="date in timelineWeeks" :key="date" class="gantt-week">
                {{ formatWeek(date) }}
              </div>
            </div>
          </div>
          
          <div class="gantt-body">
            <div v-for="task in ganttTasks" :key="task.id" class="gantt-row">
              <div class="gantt-task-info">
                <div class="task-title">{{ task.title }}</div>
                <div class="task-meta">
                  <v-chip size="x-small" :color="task.category_color">
                    {{ task.category_name }}
                  </v-chip>
                  <span class="text-caption ml-2">{{ task.workspace_name }}</span>
                </div>
              </div>
              
              <div class="gantt-timeline">
                <div 
                  v-if="task.start_date && task.due_date"
                  class="gantt-bar"
                  :style="getGanttBarStyle(task)"
                  :class="getGanttBarClass(task)"
                >
                  <span class="gantt-bar-text">{{ task.duration_days }}d</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- Dialog de Tarefa -->
    <TaskDialog
      v-model="taskDialog"
      :task="selectedTask"
      :categories="categories"
      :workspaces="workspaces"
      @save="saveTask"
    />
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import TaskDialog from '@/components/tasks/TaskDialog.vue'

const viewMode = ref('table')
const loading = ref(false)
const taskDialog = ref(false)
const selectedTask = ref(null)

const tasks = ref([])
const categories = ref([])
const workspaces = ref([])

const filters = ref({
  workspace: null,
  category: null,
  status: null,
  priority: null,
  assigned: null
})

const tableHeaders = [
  { title: 'Tarefa', key: 'title' },
  { title: 'Cliente', key: 'workspace_name' },
  { title: 'Categoria', key: 'category_name' },
  { title: 'Status', key: 'status' },
  { title: 'Prioridade', key: 'priority' },
  { title: 'Prazo', key: 'due_date' },
  { title: 'Responsável', key: 'assigned_to_email' }
]

const kanbanColumns = [
  { value: 'todo', title: 'A Fazer', color: 'grey-lighten-2', icon: 'mdi-inbox' },
  { value: 'in_progress', title: 'Em Andamento', color: 'blue-lighten-2', icon: 'mdi-play' },
  { value: 'review', title: 'Revisão', color: 'orange-lighten-2', icon: 'mdi-eye' },
  { value: 'done', title: 'Concluído', color: 'green-lighten-2', icon: 'mdi-check' },
  { value: 'blocked', title: 'Bloqueado', color: 'red-lighten-2', icon: 'mdi-block-helper' }
]

const statusOptions = [
  { title: 'A Fazer', value: 'todo' },
  { title: 'Em Andamento', value: 'in_progress' },
  { title: 'Revisão', value: 'review' },
  { title: 'Concluído', value: 'done' },
  { title: 'Bloqueado', value: 'blocked' }
]

const priorityOptions = [
  { title: 'Baixa', value: 'low' },
  { title: 'Média', value: 'medium' },
  { title: 'Alta', value: 'high' },
  { title: 'Urgente', value: 'urgent' }
]

const workspaceOptions = computed(() => 
  workspaces.value.map(w => ({ title: w.name, value: w.id }))
)

const categoryOptions = computed(() => 
  categories.value.map(c => ({ title: c.name, value: c.id }))
)

const userOptions = computed(() => [
  { title: 'André Ortega', value: 'andre@hibrit.com' },
  { title: 'Equipe Hibrit', value: 'equipe@hibrit.com' }
])

const filteredTasks = computed(() => {
  let filtered = tasks.value
  
  if (filters.value.workspace) {
    filtered = filtered.filter(t => t.workspace_id === filters.value.workspace)
  }
  if (filters.value.category) {
    filtered = filtered.filter(t => t.service_category_id === filters.value.category)
  }
  if (filters.value.status) {
    filtered = filtered.filter(t => t.status === filters.value.status)
  }
  if (filters.value.priority) {
    filtered = filtered.filter(t => t.priority === filters.value.priority)
  }
  if (filters.value.assigned) {
    filtered = filtered.filter(t => t.assigned_to_email === filters.value.assigned)
  }
  
  return filtered
})

const ganttTasks = computed(() => 
  filteredTasks.value.filter(t => t.start_date && t.due_date)
)

const timelineWeeks = computed(() => {
  const weeks = []
  const today = new Date()
  const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay())
  
  for (let i = 0; i < 12; i++) {
    const weekStart = new Date(startDate)
    weekStart.setDate(startDate.getDate() + (i * 7))
    weeks.push(weekStart)
  }
  
  return weeks
})

const getTasksByStatus = (status) => {
  return filteredTasks.value.filter(task => task.status === status)
}

const getStatusColor = (status) => {
  const colors = {
    todo: 'grey',
    in_progress: 'blue',
    review: 'orange',
    done: 'green',
    blocked: 'red'
  }
  return colors[status] || 'grey'
}

const getStatusLabel = (status) => {
  const labels = {
    todo: 'A Fazer',
    in_progress: 'Em Andamento',
    review: 'Revisão',
    done: 'Concluído',
    blocked: 'Bloqueado'
  }
  return labels[status] || status
}

const getPriorityColor = (priority) => {
  const colors = {
    low: 'green',
    medium: 'orange',
    high: 'red',
    urgent: 'purple'
  }
  return colors[priority] || 'grey'
}

const getPriorityLabel = (priority) => {
  const labels = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta',
    urgent: 'Urgente'
  }
  return labels[priority] || priority
}

const getDateClass = (urgencyStatus) => {
  const classes = {
    overdue: 'text-red font-weight-bold',
    due_today: 'text-orange font-weight-bold',
    due_soon: 'text-amber',
    on_track: ''
  }
  return classes[urgencyStatus] || ''
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR')
}

const formatWeek = (date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  return `${day}/${month}`
}

const getGanttBarStyle = (task) => {
  const startDate = new Date(task.start_date)
  const endDate = new Date(task.due_date)
  const timelineStart = timelineWeeks.value[0]
  const timelineEnd = new Date(timelineWeeks.value[timelineWeeks.value.length - 1])
  timelineEnd.setDate(timelineEnd.getDate() + 7)
  
  const totalDays = (timelineEnd - timelineStart) / (1000 * 60 * 60 * 24)
  const startOffset = Math.max(0, (startDate - timelineStart) / (1000 * 60 * 60 * 24))
  const duration = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1
  
  const left = (startOffset / totalDays) * 100
  const width = (duration / totalDays) * 100
  
  return {
    left: `${left}%`,
    width: `${Math.min(width, 100 - left)}%`,
    backgroundColor: task.category_color
  }
}

const getGanttBarClass = (task) => {
  return {
    'gantt-bar-overdue': task.urgency_status === 'overdue',
    'gantt-bar-due-soon': task.urgency_status === 'due_soon'
  }
}

const openTaskDialog = () => {
  selectedTask.value = null
  taskDialog.value = true
}

const editTask = (event, { item }) => {
  selectedTask.value = item
  taskDialog.value = true
}

const saveTask = async (taskData) => {
  // Implementar salvamento
  await loadTasks()
  taskDialog.value = false
}

const loadTasks = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select(`
        *,
        workspace:workspaces(name, slug),
        service_category:service_categories(name, color, icon)
      `)
    
    if (error) throw error
    
    // Processar dados para o formato esperado
    tasks.value = data?.map(task => ({
      ...task,
      workspace_name: task.workspace?.name,
      workspace_slug: task.workspace?.slug,
      category_name: task.service_category?.name,
      category_color: task.service_category?.color,
      category_icon: task.service_category?.icon,
      urgency_status: getUrgencyStatus(task),
      duration_days: getDurationDays(task)
    })) || []
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error)
  } finally {
    loading.value = false
  }
}

const getUrgencyStatus = (task) => {
  if (!task.due_date || task.status === 'done') return 'on_track'
  
  const today = new Date()
  const dueDate = new Date(task.due_date)
  const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'overdue'
  if (diffDays === 0) return 'due_today'
  if (diffDays <= 3) return 'due_soon'
  return 'on_track'
}

const getDurationDays = (task) => {
  if (!task.start_date || !task.due_date) return null
  
  const start = new Date(task.start_date)
  const end = new Date(task.due_date)
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
}

const loadCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('service_categories')
      .select('*')
      .order('name')
    
    if (error) throw error
    categories.value = data || []
  } catch (error) {
    console.error('Erro ao carregar categorias:', error)
  }
}

const loadWorkspaces = async () => {
  try {
    const { data, error } = await supabase
      .from('workspaces')
      .select('id, name, slug')
      .order('name')
    
    if (error) throw error
    workspaces.value = data || []
  } catch (error) {
    console.error('Erro ao carregar workspaces:', error)
  }
}

onMounted(async () => {
  await Promise.all([
    loadTasks(),
    loadCategories(),
    loadWorkspaces()
  ])
})
</script>

<style scoped>
.kanban-board {
  min-height: 600px;
}

.kanban-column {
  height: 600px;
}

.kanban-tasks {
  height: 520px;
  overflow-y: auto;
}

.task-card {
  cursor: pointer;
  transition: all 0.2s ease;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.gantt-container {
  overflow-x: auto;
  min-width: 800px;
}

.gantt-header {
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  background: #f5f5f5;
}

.gantt-task-column {
  width: 300px;
  padding: 12px;
  font-weight: bold;
  border-right: 1px solid #e0e0e0;
}

.gantt-timeline {
  flex: 1;
  display: flex;
  position: relative;
}

.gantt-week {
  flex: 1;
  padding: 12px 8px;
  text-align: center;
  border-right: 1px solid #e0e0e0;
  font-size: 12px;
}

.gantt-body {
  max-height: 400px;
  overflow-y: auto;
}

.gantt-row {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  min-height: 60px;
}

.gantt-task-info {
  width: 300px;
  padding: 12px;
  border-right: 1px solid #e0e0e0;
}

.task-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.task-meta {
  display: flex;
  align-items: center;
}

.gantt-bar {
  position: absolute;
  height: 24px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 11px;
  font-weight: bold;
  min-width: 40px;
}

.gantt-bar-text {
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.gantt-bar-overdue {
  background: linear-gradient(45deg, #f44336, #d32f2f) !important;
  animation: pulse 2s infinite;
}

.gantt-bar-due-soon {
  background: linear-gradient(45deg, #ff9800, #f57c00) !important;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}
</style>