<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center mb-6">
          <div>
            <h1 class="text-h4">Funnels</h1>
            <p class="text-subtitle-1 text-grey">Canvas Vivo de Marketing & Vendas</p>
          </div>
          <div class="d-flex gap-2">
            <v-btn
              color="primary"
              prepend-icon="mdi-sitemap"
              @click="openTemplateSelector"
            >
              Usar Modelo
            </v-btn>
            <v-btn
              variant="outlined"
              prepend-icon="mdi-plus"
              @click="createDialog = true"
            >
              Funil Vazio
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Lista de Funnels -->
    <v-row>
      <v-col
        v-for="funnel in funnels"
        :key="funnel.id"
        cols="12"
        md="4"
      >
        <v-card
          class="funnel-card"
          elevation="2"
          @click="openFunnel(funnel.id)"
        >
          <v-card-title class="d-flex justify-space-between align-center">
            <span>{{ funnel.name }}</span>
            <v-chip
              :color="funnel.is_active ? 'success' : 'grey'"
              size="small"
            >
              {{ funnel.is_active ? 'Ativo' : 'Pausado' }}
            </v-chip>
          </v-card-title>
          
          <v-card-text>
            <p class="text-body-2 mb-3">{{ funnel.description }}</p>
            
            <!-- Thumbnail do grafo -->
            <div class="funnel-thumbnail">
              <v-icon size="48" color="grey-lighten-1">mdi-sitemap</v-icon>
              <div class="text-caption text-center mt-2">
                Canvas Preview
              </div>
            </div>
          </v-card-text>
          
          <v-card-actions>
            <v-btn
              variant="outlined"
              size="small"
              prepend-icon="mdi-pencil"
              @click.stop="editFunnel(funnel)"
            >
              Editar
            </v-btn>
            <v-spacer />
            <v-btn
              variant="text"
              size="small"
              prepend-icon="mdi-chart-line"
            >
              Métricas
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      
      <!-- Card para criar novo funil -->
      <v-col cols="12" md="4">
        <v-card
          class="funnel-card funnel-card--create"
          elevation="1"
          variant="outlined"
          @click="createDialog = true"
        >
          <v-card-text class="text-center py-8">
            <v-icon size="64" color="primary">mdi-plus-circle-outline</v-icon>
            <h3 class="mt-4">Funil Vazio</h3>
            <p class="text-body-2 text-grey">
              Comece do zero com canvas vazio
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog para criar/editar funil -->
    <v-dialog v-model="createDialog" max-width="500">
      <v-card>
        <v-card-title>
          {{ editingFunnel ? 'Editar Funil' : 'Novo Funil' }}
        </v-card-title>
        
        <v-card-text>
          <v-form ref="form" v-model="formValid">
            <v-text-field
              v-model="funnelForm.name"
              label="Nome do Funil"
              :rules="[v => !!v || 'Nome é obrigatório']"
              variant="outlined"
              class="mb-4"
            />
            
            <v-textarea
              v-model="funnelForm.description"
              label="Descrição"
              variant="outlined"
              rows="3"
              class="mb-4"
            />
            
            <v-switch
              v-model="funnelForm.is_active"
              label="Funil ativo"
              color="success"
            />
          </v-form>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer />
          <v-btn @click="closeDialog">Cancelar</v-btn>
          <v-btn
            color="primary"
            :disabled="!formValid"
            @click="saveFunnel"
          >
            {{ editingFunnel ? 'Salvar' : 'Criar' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Template Selector -->
    <TemplateSelector ref="templateSelector" @created="onFunnelCreated" />
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFunnelStore } from '@/stores/funnel'
import TemplateSelector from '@/components/funnel/TemplateSelector.vue'

const router = useRouter()
const funnelStore = useFunnelStore()

const funnels = ref([])
const createDialog = ref(false)
const editingFunnel = ref(null)
const formValid = ref(false)
const templateSelector = ref(null)

const funnelForm = reactive({
  name: '',
  description: '',
  is_active: true
})

const openFunnel = (funnelId) => {
  router.push(`/funnels/${funnelId}`)
}

const editFunnel = (funnel) => {
  editingFunnel.value = funnel
  funnelForm.name = funnel.name
  funnelForm.description = funnel.description
  funnelForm.is_active = funnel.is_active
  createDialog.value = true
}

const saveFunnel = async () => {
  if (editingFunnel.value) {
    // TODO: Implementar edição
    console.log('Editando funil:', editingFunnel.value.id)
  } else {
    const { data, error } = await funnelStore.createFunnel(funnelForm)
    if (!error && data) {
      router.push(`/funnels/${data.id}`)
    }
  }
  closeDialog()
}

const closeDialog = () => {
  createDialog.value = false
  editingFunnel.value = null
  funnelForm.name = ''
  funnelForm.description = ''
  funnelForm.is_active = true
}

const openTemplateSelector = () => {
  templateSelector.value.open()
}

const onFunnelCreated = (funnel) => {
  router.push(`/funnels/${funnel.id}`)
}

onMounted(async () => {
  const { data } = await funnelStore.loadFunnels()
  funnels.value = data || []
})
</script>

<style scoped>
.funnel-card {
  cursor: pointer;
  transition: all 0.2s ease;
  height: 100%;
}

.funnel-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.funnel-card--create {
  border: 2px dashed #e0e0e0;
}

.funnel-card--create:hover {
  border-color: #1976d2;
}

.funnel-thumbnail {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>