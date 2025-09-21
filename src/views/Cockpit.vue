<template>
  <v-container fluid>
    <!-- Barra de Contexto -->
    <v-card class="mb-4" elevation="1">
      <v-card-text class="py-2">
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center gap-4">
            <div class="d-flex align-center gap-2">
              <span class="text-body-2 text-grey">Escopo:</span>
              <v-chip 
                :color="effectiveIsPortfolioMode ? 'primary' : 'default'"
                size="small"
                @click="toggleScope"
                :disabled="!effectiveCanSwitchScope"
              >
                {{ effectiveIsPortfolioMode ? 'Portfólio' : 'Cliente' }}
                <v-icon v-if="simulationStore.isSimulating" class="ml-1" size="14">mdi-account-switch</v-icon>
              </v-chip>
            </div>
            
            <div v-if="!effectiveIsPortfolioMode" class="d-flex align-center gap-2">
              <span class="text-body-2 text-grey">Cliente:</span>
              <v-chip 
                color="success" 
                size="small"
                @click="openClientSelector"
                :disabled="!effectiveCanSwitchScope"
              >
                {{ currentWorkspace?.name || 'Selecionar' }}
                <v-icon v-if="canSwitchScope" end size="16">mdi-chevron-down</v-icon>
              </v-chip>
            </div>
          </div>
          
          <div class="d-flex align-center gap-2">
            <v-btn-toggle v-model="period" mandatory size="small">
              <v-btn value="7d">7d</v-btn>
              <v-btn value="30d">30d</v-btn>
              <v-btn value="90d">90d</v-btn>
            </v-btn-toggle>
            

            
            <v-btn 
              color="primary" 
              prepend-icon="mdi-eye"
              @click="goToLive"
              :disabled="effectiveIsPortfolioMode"
            >
              Ver ao vivo
            </v-btn>
            
            <v-btn 
              v-if="effectiveCanSwitchScope && !effectiveIsPortfolioMode"
              color="orange"
              prepend-icon="mdi-account-switch"
              @click="simulateClient"
              class="ml-2"
            >
              Simular Cliente
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- Cockpit Portfólio (Hibrit) -->
    <div v-if="effectiveIsPortfolioMode && effectiveCanSwitchScope">
      <h1 class="text-h4 mb-6">Cockpit Executivo - Portfólio</h1>
      
      <!-- Ranking de Clientes -->
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Ranking de Clientes</v-card-title>
            <v-card-text>
              <v-data-table
                :headers="portfolioHeaders"
                :items="portfolioData"
                :loading="loading"
                item-key="workspace_id"
                @click:row="selectClient"
              >
                <template #item.health_score="{ item }">
                  <v-chip 
                    :color="getHealthColor(item.health_score)"
                    size="small"
                  >
                    {{ item.health_score }}%
                  </v-chip>
                </template>
                
                <template #item.alerts="{ item }">
                  <div class="d-flex gap-1">
                    <v-icon 
                      v-for="alert in getClientAlerts(item.workspace_id)"
                      :key="alert.alert_type"
                      :color="getAlertColor(alert.severity)"
                      size="16"
                    >
                      mdi-circle
                    </v-icon>
                  </div>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Cockpit Cliente -->
    <div v-else-if="currentWorkspace">
      <h1 class="text-h4 mb-6">Cockpit Executivo - {{ currentWorkspace.name }}</h1>
      
      <v-row>
        <!-- Saúde do Funil -->
        <v-col cols="12" md="6" lg="3">
          <v-card 
            class="cockpit-card" 
            @click="goToFunnel"
            :color="getFunnelHealthColor()"
          >
            <v-card-text>
              <div class="d-flex align-center justify-space-between">
                <div>
                  <div class="text-h6">Saúde do Funil</div>
                  <div class="text-h4 font-weight-bold">
                    {{ clientData?.active_funnels || 0 }}/{{ clientData?.total_funnels || 0 }}
                  </div>
                  <div class="text-caption">funis ativos</div>
                </div>
                <v-icon size="48" color="white">mdi-chart-sankey</v-icon>
              </div>
              
              <div class="mt-3">
                <v-chip 
                  v-for="bottleneck in funnelBottlenecks"
                  :key="bottleneck"
                  size="x-small"
                  class="mr-1"
                  @click.stop="goToFunnelSection(bottleneck)"
                >
                  {{ bottleneck }}
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Produção de Conteúdo -->
        <v-col cols="12" md="6" lg="3">
          <v-card 
            class="cockpit-card" 
            color="purple"
            @click="goToCalendar"
          >
            <v-card-text>
              <div class="d-flex align-center justify-space-between">
                <div>
                  <div class="text-h6">Produção</div>
                  <div class="text-h4 font-weight-bold">
                    {{ clientData?.next_7_days_count || 0 }}
                  </div>
                  <div class="text-caption">próximos 7 dias</div>
                </div>
                <v-icon size="48" color="white">mdi-calendar-clock</v-icon>
              </div>
              
              <div class="mt-3 d-flex gap-1">
                <v-chip size="x-small" color="orange">
                  {{ clientData?.copy_count || 0 }} copy
                </v-chip>
                <v-chip size="x-small" color="blue">
                  {{ clientData?.design_count || 0 }} design
                </v-chip>
                <v-chip size="x-small" color="green">
                  {{ clientData?.ready_count || 0 }} prontos
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- CTAs & Conversas -->
        <v-col cols="12" md="6" lg="3">
          <v-card 
            class="cockpit-card" 
            color="teal"
            @click="goToMetrics"
          >
            <v-card-text>
              <div class="d-flex align-center justify-space-between">
                <div>
                  <div class="text-h6">CTAs & Conversas</div>
                  <div class="text-h4 font-weight-bold">
                    {{ clientData?.total_ctas || 0 }}
                  </div>
                  <div class="text-caption">gatilhos ativos</div>
                </div>
                <v-icon size="48" color="white">mdi-message-reply</v-icon>
              </div>
              
              <div class="mt-3">
                <v-chip size="x-small" color="success">
                  +{{ Math.floor(Math.random() * 50) }} leads
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Alertas -->
        <v-col cols="12" md="6" lg="3">
          <v-card class="cockpit-card" color="grey-darken-1">
            <v-card-text>
              <div class="d-flex align-center justify-space-between">
                <div>
                  <div class="text-h6">Alertas</div>
                  <div class="text-h4 font-weight-bold">
                    {{ clientAlerts.length }}
                  </div>
                  <div class="text-caption">requerem atenção</div>
                </div>
                <v-icon size="48" color="white">mdi-alert-circle</v-icon>
              </div>
              
              <div class="mt-3">
                <div 
                  v-for="alert in clientAlerts.slice(0, 2)"
                  :key="alert.alert_type"
                  class="d-flex align-center gap-2 mb-1"
                  @click.stop="goToAlert(alert)"
                >
                  <v-icon 
                    :color="getAlertColor(alert.severity)"
                    size="12"
                  >
                    mdi-circle
                  </v-icon>
                  <span class="text-caption">{{ alert.message }}</span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Client Selector Modal -->
    <v-dialog v-model="showClientSelector" max-width="600" fullscreen>
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
          <span>Selecionar Cliente</span>
          <v-btn icon="mdi-close" @click="showClientSelector = false" />
        </v-card-title>
        
        <v-card-text>
          <v-text-field
            v-model="clientSearch"
            prepend-inner-icon="mdi-magnify"
            label="Buscar cliente"
            variant="outlined"
            class="mb-4"
          />
          
          <v-list>
            <v-list-item
              v-for="workspace in filteredWorkspaces"
              :key="workspace.workspace_id"
              @click="selectWorkspace(workspace)"
            >
              <template #prepend>
                <v-avatar color="primary">
                  {{ workspace.workspace_name.charAt(0) }}
                </v-avatar>
              </template>
              
              <v-list-item-title>{{ workspace.workspace_name }}</v-list-item-title>
              <v-list-item-subtitle>{{ workspace.workspace_slug }}</v-list-item-subtitle>
              
              <template #append>
                <v-chip size="small" color="success">
                  {{ workspace.user_role }}
                </v-chip>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCockpitStore } from '@/stores/cockpit'

const router = useRouter()
const cockpitStore = useCockpitStore()

const period = ref('30d')
const showClientSelector = ref(false)
const clientSearch = ref('')

// Usar dados do store
const {
  isPortfolioScope,
  isClientScope,
  currentClient,
  userWorkspaces,
  portfolioData,
  clientData,
  clientAlerts,
  loading,
  isHibrit,
  canSwitchScope
} = cockpitStore

const filteredWorkspaces = computed(() => {
  if (!clientSearch.value) return userWorkspaces
  return userWorkspaces.filter(w => 
    w.workspace_name.toLowerCase().includes(clientSearch.value.toLowerCase())
  )
})

const portfolioHeaders = [
  { title: 'Cliente', key: 'client_name' },
  { title: 'Saúde', key: 'health_score' },
  { title: 'Publicados (30d)', key: 'published_last_30d' },
  { title: 'Pipeline', key: 'pipeline_conversion_rate' },
  { title: 'Alertas', key: 'alerts' }
]

const funnelBottlenecks = computed(() => {
  // Simular gargalos baseado nos dados
  const bottlenecks = []
  if (clientData.value?.copy_count > 3) bottlenecks.push('Copy')
  if (clientData.value?.design_count > 2) bottlenecks.push('Design')
  return bottlenecks
})

const toggleScope = async () => {
  if (effectiveCanSwitchScope.value) {
    if (effectiveIsPortfolioMode.value) {
      await cockpitStore.switchToClient()
    } else {
      await cockpitStore.switchToPortfolio()
    }
  }
}

const openClientSelector = () => {
  if (effectiveCanSwitchScope.value) {
    showClientSelector.value = true
  }
}

const selectClient = (event, { item }) => {
  const workspace = userWorkspaces.find(w => w.workspace_id === item.workspace_id)
  if (workspace) {
    selectWorkspace(workspace)
  }
}

const selectWorkspace = async (workspace) => {
  await cockpitStore.selectWorkspace(workspace)
  showClientSelector.value = false
}

const getFunnelHealthColor = () => {
  const active = clientData?.active_funnels || 0
  const total = clientData?.total_funnels || 0
  
  if (active === 0) return 'error'
  if (active / total >= 0.8) return 'success'
  return 'warning'
}

// Usar helpers do store
const { getHealthColor, getAlertColor, getClientAlerts } = cockpitStore

// Navegação
const goToAdmin = () => router.push('/admin')
const goToLive = () => router.push('/funnels')
const goToFunnel = () => router.push('/funnels')
const goToCalendar = () => router.push('/calendar')
const goToMetrics = () => router.push('/metrics')
const goToFunnelSection = (section) => router.push(`/funnels?focus=${section}`)
const goToAlert = (alert) => router.push(alert.action_url)

const simulateClient = () => {
  if (currentWorkspace?.value) {
    const url = `${window.location.origin}/?simulate=${currentWorkspace.value.workspace_id}&workspace=${currentWorkspace.value.workspace_slug}`
    window.open(url, '_blank')
  }
}

onMounted(async () => {
  await cockpitStore.initialize()
})
</script>

<style scoped>
.cockpit-card {
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
}

.cockpit-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.cockpit-card .v-card-text {
  color: white !important;
}

.cockpit-card .text-h6,
.cockpit-card .text-h4,
.cockpit-card .text-caption {
  color: white !important;
}
</style>