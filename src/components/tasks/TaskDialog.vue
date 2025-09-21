<template>
  <v-dialog v-model="dialog" max-width="800" persistent>
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <span>{{ isEditing ? 'Editar Tarefa' : 'Nova Tarefa' }}</span>
        <v-btn icon="mdi-close" @click="close" />
      </v-card-title>
      
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12" md="8">
              <v-text-field
                v-model="formData.title"
                label="Título da Tarefa"
                variant="outlined"
                :rules="[v => !!v || 'Título é obrigatório']"
                required
              />
            </v-col>
            
            <v-col cols="12" md="4">
              <v-select
                v-model="formData.priority"
                :items="priorityOptions"
                label="Prioridade"
                variant="outlined"
                :rules="[v => !!v || 'Prioridade é obrigatória']"
                required
              />
            </v-col>
            
            <v-col cols="12">
              <v-textarea
                v-model="formData.description"
                label="Descrição"
                variant="outlined"
                rows="3"
              />
            </v-col>
            
            <v-col cols="12" md="6">
              <v-select
                v-model="formData.workspace_id"
                :items="workspaceOptions"
                label="Cliente"
                variant="outlined"
                :rules="[v => !!v || 'Cliente é obrigatório']"
                required
              />
            </v-col>
            
            <v-col cols="12" md="6">
              <v-select
                v-model="formData.service_category_id"
                :items="categoryOptions"
                label="Categoria de Serviço"
                variant="outlined"
                :rules="[v => !!v || 'Categoria é obrigatória']"
                required
              />
            </v-col>
            
            <v-col cols="12" md="4">
              <v-select
                v-model="formData.status"
                :items="statusOptions"
                label="Status"
                variant="outlined"
              />
            </v-col>
            
            <v-col cols="12" md="4">
              <v-text-field
                v-model="formData.start_date"
                label="Data de Início"
                type="date"
                variant="outlined"
              />
            </v-col>
            
            <v-col cols="12" md="4">
              <v-text-field
                v-model="formData.due_date"
                label="Data de Entrega"
                type="date"
                variant="outlined"
              />
            </v-col>
            
            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="formData.estimated_hours"
                label="Horas Estimadas"
                type="number"
                variant="outlined"
                min="0"
                step="0.5"
              />
            </v-col>
            
            <v-col cols="12" md="6">
              <v-select
                v-model="formData.assigned_to_email"
                :items="userOptions"
                label="Responsável"
                variant="outlined"
                clearable
              />
            </v-col>
            
            <v-col cols="12">
              <v-combobox
                v-model="formData.tags"
                label="Tags"
                variant="outlined"
                multiple
                chips
                closable-chips
                hint="Pressione Enter para adicionar uma tag"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      
      <v-card-actions>
        <v-spacer />
        <v-btn @click="close">Cancelar</v-btn>
        <v-btn 
          color="primary" 
          :loading="saving"
          :disabled="!valid"
          @click="save"
        >
          {{ isEditing ? 'Atualizar' : 'Criar' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { supabase } from '@/lib/supabase'

const props = defineProps({
  modelValue: Boolean,
  task: Object,
  categories: Array,
  workspaces: Array
})

const emit = defineEmits(['update:modelValue', 'save'])

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const form = ref(null)
const valid = ref(false)
const saving = ref(false)

const formData = ref({
  title: '',
  description: '',
  workspace_id: null,
  service_category_id: null,
  status: 'todo',
  priority: 'medium',
  start_date: '',
  due_date: '',
  estimated_hours: null,
  assigned_to_email: '',
  tags: []
})

const isEditing = computed(() => !!props.task?.id)

const priorityOptions = [
  { title: 'Baixa', value: 'low' },
  { title: 'Média', value: 'medium' },
  { title: 'Alta', value: 'high' },
  { title: 'Urgente', value: 'urgent' }
]

const statusOptions = [
  { title: 'A Fazer', value: 'todo' },
  { title: 'Em Andamento', value: 'in_progress' },
  { title: 'Revisão', value: 'review' },
  { title: 'Concluído', value: 'done' },
  { title: 'Bloqueado', value: 'blocked' }
]

const workspaceOptions = computed(() => 
  props.workspaces?.map(w => ({ title: w.name, value: w.id })) || []
)

const categoryOptions = computed(() => 
  props.categories?.map(c => ({ title: c.name, value: c.id })) || []
)

const userOptions = [
  { title: 'André Ortega', value: 'andre@hibrit.com' },
  { title: 'Equipe Hibrit', value: 'equipe@hibrit.com' }
]

const close = () => {
  dialog.value = false
}

const save = async () => {
  if (!form.value.validate()) return
  
  saving.value = true
  try {
    const taskData = { ...formData.value }
    
    // Remover campos que não existem na tabela
    delete taskData.assigned_to_email
    
    // Converter email para user_id se necessário
    if (formData.value.assigned_to_email) {
      // Por enquanto, vamos deixar null - implementar busca de user_id depois
      taskData.assigned_to = null
    }
    
    if (isEditing.value) {
      const { error } = await supabase
        .from('tasks')
        .update(taskData)
        .eq('id', props.task.id)
      
      if (error) throw error
    } else {
      const { error } = await supabase
        .from('tasks')
        .insert([taskData])
      
      if (error) throw error
    }
    
    emit('save', taskData)
  } catch (error) {
    console.error('Erro ao salvar tarefa:', error)
  } finally {
    saving.value = false
  }
}

watch(() => props.task, (newTask) => {
  if (newTask) {
    formData.value = { ...newTask }
  } else {
    formData.value = {
      title: '',
      description: '',
      workspace_id: null,
      service_category_id: null,
      status: 'todo',
      priority: 'medium',
      start_date: '',
      due_date: '',
      estimated_hours: null,
      assigned_to_email: '',
      tags: []
    }
  }
})
</script>