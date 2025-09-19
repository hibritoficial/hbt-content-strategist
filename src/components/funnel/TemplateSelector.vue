<template>
  <v-dialog v-model="isOpen" max-width="800">
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-sitemap</v-icon>
        Escolher Modelo de Funil
      </v-card-title>
      
      <v-card-text>
        <v-row>
          <v-col 
            v-for="template in templates" 
            :key="template.id"
            cols="12" 
            md="6"
          >
            <v-card 
              elevation="2" 
              class="template-card"
              @click="selectTemplate(template.id)"
              :class="{ 'selected': selectedTemplate === template.id }"
            >
              <v-card-title class="text-h6">
                {{ template.name }}
              </v-card-title>
              
              <v-card-subtitle>
                {{ template.category }}
              </v-card-subtitle>
              
              <v-card-text>
                <p class="text-body-2 mb-3">{{ template.description }}</p>
                
                <!-- Preview dos nós -->
                <div class="template-preview">
                  <div class="preview-flow">
                    <div 
                      v-for="(node, index) in template.nodes" 
                      :key="node.id"
                      class="preview-node"
                    >
                      <v-avatar size="24" :color="getNodeColor(node.type)">
                        <v-icon size="14" color="white">{{ getNodeIcon(node.type) }}</v-icon>
                      </v-avatar>
                      <span class="node-label">{{ node.label }}</span>
                      <v-icon v-if="index < template.nodes.length - 1" size="16" class="arrow">mdi-arrow-right</v-icon>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        
        <!-- Campo nome do funil -->
        <v-text-field
          v-model="funnelName"
          label="Nome do Funil"
          variant="outlined"
          class="mt-4"
          :disabled="!selectedTemplate"
        />
      </v-card-text>
      
      <v-card-actions>
        <v-spacer />
        <v-btn @click="close">Cancelar</v-btn>
        <v-btn 
          color="primary" 
          @click="createFromTemplate"
          :disabled="!selectedTemplate || !funnelName"
          :loading="creating"
        >
          Criar Funil
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { funnelTemplates } from '@/data/funnelTemplates'
import { useFunnelStore } from '@/stores/funnel'

const emit = defineEmits(['created'])

const isOpen = ref(false)
const selectedTemplate = ref(null)
const funnelName = ref('')
const creating = ref(false)

const funnelStore = useFunnelStore()

const templates = computed(() => Object.values(funnelTemplates))

const nodeTypes = {
  traffic: { icon: 'mdi-bullhorn', color: 'blue' },
  landing: { icon: 'mdi-web', color: 'purple' },
  form: { icon: 'mdi-form-textbox', color: 'green' },
  thankyou: { icon: 'mdi-check-circle', color: 'green' },
  checkout: { icon: 'mdi-cart', color: 'green' },
  whatsapp: { icon: 'mdi-whatsapp', color: 'teal' }
}

const getNodeIcon = (type) => nodeTypes[type]?.icon || 'mdi-circle'
const getNodeColor = (type) => nodeTypes[type]?.color || 'grey'

const selectTemplate = (templateId) => {
  selectedTemplate.value = templateId
  if (!funnelName.value) {
    funnelName.value = funnelTemplates[templateId].name
  }
}

const createFromTemplate = async () => {
  creating.value = true
  
  try {
    const result = await funnelStore.createFunnelFromTemplate(
      selectedTemplate.value, 
      funnelName.value
    )
    
    if (result.success) {
      emit('created', result.data)
      close()
    } else {
      alert('Erro ao criar funil: ' + result.error)
    }
  } catch (error) {
    alert('Erro: ' + error.message)
  } finally {
    creating.value = false
  }
}

const open = () => {
  isOpen.value = true
  selectedTemplate.value = null
  funnelName.value = ''
}

const close = () => {
  isOpen.value = false
}

defineExpose({ open })
</script>

<style scoped>
.template-card {
  cursor: pointer;
  transition: all 0.2s;
}

.template-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.template-card.selected {
  border: 2px solid #1976d2;
}

.template-preview {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 12px;
}

.preview-flow {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.preview-node {
  display: flex;
  align-items: center;
  gap: 4px;
}

.node-label {
  font-size: 10px;
  color: #666;
}

.arrow {
  color: #999;
}
</style>