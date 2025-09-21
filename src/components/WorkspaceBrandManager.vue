<template>
  <v-card>
    <v-card-title class="d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <v-icon class="mr-3" color="primary">mdi-link-variant</v-icon>
        Vínculos Workspace ↔ Brand
      </div>
      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        @click="showCreateDialog = true"
      >
        Novo Vínculo
      </v-btn>
    </v-card-title>

    <v-card-text>
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <v-progress-circular indeterminate color="primary" />
        <p class="mt-4">Carregando vínculos...</p>
      </div>

      <!-- Data Grid -->
      <v-data-table
        v-else
        :headers="headers"
        :items="workspacesBrands"
        :loading="loading"
        class="elevation-1"
        item-key="workspace_id"
      >
        <!-- Workspace Column -->
        <template #item.workspace="{ item }">
          <div class="d-flex align-center">
            <v-avatar size="32" class="mr-3" :color="item.workspace_color || 'grey'">
              <span class="text-white text-caption">
                {{ item.workspace_name?.charAt(0) }}
              </span>
            </v-avatar>
            <div>
              <div class="font-weight-medium">{{ item.workspace_name }}</div>
              <div class="text-caption text-grey">{{ item.workspace_slug }}</div>
            </div>
          </div>
        </template>

        <!-- Brand Column -->
        <template #item.brand="{ item }">
          <div v-if="item.brand_id" class="d-flex align-center">
            <v-avatar 
              size="32" 
              class="mr-3" 
              :color="item.brand_settings?.primaryColor || 'primary'"
            >
              <span class="text-white text-caption">
                {{ item.brand_name?.charAt(0) }}
              </span>
            </v-avatar>
            <div>
              <div class="font-weight-medium">{{ item.brand_name }}</div>
              <v-chip 
                v-if="item.brand_settings?.segment"
                size="x-small" 
                variant="outlined"
                class="mt-1"
              >
                {{ item.brand_settings.segment }}
              </v-chip>
            </div>
          </div>
          <div v-else class="text-center">
            <v-chip color="warning" size="small" variant="outlined">
              Sem Brand
            </v-chip>
          </div>
        </template>

        <!-- Status Column -->
        <template #item.status="{ item }">
          <v-chip
            :color="getStatusColor(item)"
            size="small"
            variant="flat"
          >
            {{ getStatusText(item) }}
          </v-chip>
        </template>

        <!-- Content Count Column -->
        <template #item.content_count="{ item }">
          <div class="text-center">
            <v-chip
              :color="item.content_count > 0 ? 'success' : 'grey'"
              size="small"
              variant="outlined"
            >
              {{ item.content_count }} conteúdos
            </v-chip>
          </div>
        </template>

        <!-- Actions Column -->
        <template #item.actions="{ item }">
          <div class="d-flex gap-1">
            <v-btn
              v-if="!item.brand_id"
              icon="mdi-plus"
              size="small"
              color="primary"
              variant="outlined"
              @click="createBrandForWorkspace(item)"
              title="Criar Brand"
            />
            <v-btn
              v-if="item.brand_id"
              icon="mdi-pencil"
              size="small"
              color="primary"
              variant="text"
              @click="editBrand(item)"
              title="Editar Brand"
            />
            <v-btn
              icon="mdi-eye"
              size="small"
              color="info"
              variant="text"
              @click="viewDetails(item)"
              title="Ver Detalhes"
            />
          </div>
        </template>
      </v-data-table>
    </v-card-text>

    <!-- Create Brand Dialog -->
    <v-dialog v-model="showCreateDialog" max-width="500">
      <v-card>
        <v-card-title>Criar Novo Brand</v-card-title>
        <v-card-text>
          <v-form ref="createForm" v-model="createValid">
            <v-select
              v-model="newBrand.workspace_id"
              :items="availableWorkspaces"
              item-title="name"
              item-value="id"
              label="Workspace"
              variant="outlined"
              :rules="[v => !!v || 'Workspace é obrigatório']"
              class="mb-4"
            />
            <v-text-field
              v-model="newBrand.name"
              label="Nome do Brand"
              variant="outlined"
              :rules="[v => !!v || 'Nome é obrigatório']"
              class="mb-4"
            />
            <v-select
              v-model="newBrand.segment"
              :items="segments"
              label="Segmento"
              variant="outlined"
              class="mb-4"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="outlined" @click="showCreateDialog = false">
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            :disabled="!createValid"
            :loading="creating"
            @click="createBrand"
          >
            Criar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Details Dialog -->
    <v-dialog v-model="showDetailsDialog" max-width="600">
      <v-card v-if="selectedItem">
        <v-card-title class="d-flex align-center">
          <v-icon class="mr-3">mdi-information</v-icon>
          Detalhes do Vínculo
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <h4>Workspace</h4>
              <p><strong>Nome:</strong> {{ selectedItem.workspace_name }}</p>
              <p><strong>Slug:</strong> {{ selectedItem.workspace_slug }}</p>
              <p><strong>ID:</strong> <code>{{ selectedItem.workspace_id }}</code></p>
            </v-col>
            <v-col cols="6">
              <h4>Brand</h4>
              <div v-if="selectedItem.brand_id">
                <p><strong>Nome:</strong> {{ selectedItem.brand_name }}</p>
                <p><strong>Slug:</strong> {{ selectedItem.brand_slug }}</p>
                <p><strong>Segmento:</strong> {{ selectedItem.brand_settings?.segment || 'N/A' }}</p>
                <p><strong>Cor:</strong> 
                  <v-chip 
                    :color="selectedItem.brand_settings?.primaryColor" 
                    size="small"
                  >
                    {{ selectedItem.brand_settings?.primaryColor }}
                  </v-chip>
                </p>
              </div>
              <p v-else class="text-grey">Nenhum brand associado</p>
            </v-col>
          </v-row>
          <v-divider class="my-4" />
          <h4>Estatísticas</h4>
          <p><strong>Conteúdos:</strong> {{ selectedItem.content_count }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="outlined" @click="showDetailsDialog = false">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '@/lib/supabase'

const loading = ref(false)
const workspacesBrands = ref([])
const showCreateDialog = ref(false)
const showDetailsDialog = ref(false)
const selectedItem = ref(null)
const createValid = ref(false)
const creating = ref(false)

const newBrand = ref({
  workspace_id: null,
  name: '',
  segment: ''
})

const segments = [
  'E-commerce', 'Educação', 'Saúde & Bem-estar', 'Tecnologia',
  'Consultoria', 'Alimentação', 'Moda & Beleza', 'Imobiliário',
  'Serviços Financeiros', 'Entretenimento', 'Outro'
]

const headers = [
  { title: 'Workspace', key: 'workspace', sortable: true },
  { title: 'Brand', key: 'brand', sortable: false },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Conteúdos', key: 'content_count', sortable: true },
  { title: 'Ações', key: 'actions', sortable: false, align: 'center' }
]

const availableWorkspaces = computed(() => {
  return workspacesBrands.value
    .filter(item => !item.brand_id)
    .map(item => ({
      id: item.workspace_id,
      name: item.workspace_name
    }))
})

const getStatusColor = (item) => {
  if (!item.brand_id) return 'warning'
  if (item.content_count > 0) return 'success'
  return 'info'
}

const getStatusText = (item) => {
  if (!item.brand_id) return 'Sem Brand'
  if (item.content_count > 0) return 'Ativo'
  return 'Configurado'
}

const loadData = async () => {
  loading.value = true
  try {
    // Query complexa para pegar workspaces, brands e contagem de conteúdos
    const { data, error } = await supabase
      .from('workspaces')
      .select(`
        id,
        name,
        slug,
        brands (
          id,
          name,
          slug,
          settings
        )
      `)
    
    if (error) throw error

    // Buscar contagem de conteúdos por brand
    const { data: contentCounts } = await supabase
      .from('content_items')
      .select('brand_id')
    
    const contentCountMap = {}
    contentCounts?.forEach(item => {
      contentCountMap[item.brand_id] = (contentCountMap[item.brand_id] || 0) + 1
    })

    // Processar dados
    workspacesBrands.value = data.map(workspace => {
      const brand = workspace.brands?.[0]
      return {
        workspace_id: workspace.id,
        workspace_name: workspace.name,
        workspace_slug: workspace.slug,
        brand_id: brand?.id || null,
        brand_name: brand?.name || null,
        brand_slug: brand?.slug || null,
        brand_settings: brand?.settings || {},
        content_count: contentCountMap[brand?.id] || 0
      }
    })
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
}

const createBrandForWorkspace = (workspace) => {
  newBrand.value = {
    workspace_id: workspace.workspace_id,
    name: workspace.workspace_name,
    segment: ''
  }
  showCreateDialog.value = true
}

const createBrand = async () => {
  creating.value = true
  try {
    const { error } = await supabase
      .from('brands')
      .insert({
        name: newBrand.value.name,
        slug: newBrand.value.name.toLowerCase().replace(/\s+/g, '-'),
        workspace_id: newBrand.value.workspace_id,
        settings: {
          segment: newBrand.value.segment,
          primaryColor: '#1976D2'
        }
      })
    
    if (error) throw error
    
    showCreateDialog.value = false
    await loadData()
  } catch (error) {
    console.error('Error creating brand:', error)
  } finally {
    creating.value = false
  }
}

const editBrand = (item) => {
  // TODO: Implementar edição
  console.log('Edit brand:', item)
}

const viewDetails = (item) => {
  selectedItem.value = item
  showDetailsDialog.value = true
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.v-data-table {
  border-radius: 8px;
}
</style>