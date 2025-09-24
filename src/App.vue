<template>
  <v-app>
    <template v-if="!isLoginPage">
      <!-- Navigation Rail Inteligente -->
      <v-navigation-drawer
        v-if="navState !== 'hidden'"
        v-model="drawer"
        :rail="navState === 'compact'"
        permanent
        color="grey-lighten-5"
        app
        :width="navState === 'expanded' ? 280 : 72"
        class="navigation-rail"
      >
        <!-- Header/Brand Area -->
        <div class="navigation-header pa-4">
          <div v-if="navState === 'expanded'" class="d-flex align-center cursor-pointer" @click="goToHome">
            <v-icon color="primary" size="28" class="mr-3">mdi-brain</v-icon>
            <div>
              <div class="text-h6 font-weight-bold text-primary">Hibrit</div>
              <div class="text-caption text-grey-darken-1">Content Strategist</div>
            </div>
          </div>
          
          <div v-else class="d-flex flex-column align-center">
            <v-icon color="primary" size="32" class="mb-2 cursor-pointer" @click="goToHome">mdi-brain</v-icon>
            <v-btn
              icon="mdi-chevron-right"
              size="small"
              variant="text"
              @click="expandNavigation"
              title="Expandir menu"
            />
          </div>
        </div>
        
        <v-divider class="mb-2" />
        
        <v-list density="compact" nav>
          <!-- Cockpit -->
          <v-list-item
            prepend-icon="mdi-monitor-dashboard"
            :title="navState === 'expanded' ? 'Cockpit' : undefined"
            value="cockpit"
            :to="{ name: 'Cockpit' }"
            color="primary"
          >
            <v-tooltip
              v-if="navState === 'compact'"
              activator="parent"
              location="end"
            >
              Cockpit
            </v-tooltip>
          </v-list-item>
          
          <!-- Funis -->
          <v-list-item
            prepend-icon="mdi-filter-variant"
            :title="navState === 'expanded' ? 'Funis' : undefined"
            value="funnels"
            :to="{ name: 'Funnels' }"
            color="primary"
          >
            <v-tooltip
              v-if="navState === 'compact'"
              activator="parent"
              location="end"
            >
              Funis
            </v-tooltip>
          </v-list-item>
          
          <!-- Pipeline -->
          <v-list-item
            prepend-icon="mdi-view-column"
            :title="navState === 'expanded' ? 'Pipeline' : undefined"
            value="pipeline"
            :to="{ name: 'Pipeline' }"
            color="primary"
          >
            <v-tooltip
              v-if="navState === 'compact'"
              activator="parent"
              location="end"
            >
              Pipeline
            </v-tooltip>
          </v-list-item>
          
          <v-divider class="my-2" />
          
          <!-- Biblioteca -->
          <v-list-item
            prepend-icon="mdi-library"
            :title="navState === 'expanded' ? 'Biblioteca' : undefined"
            value="library"
            :to="{ name: 'Library' }"
            color="primary"
          >
            <v-tooltip
              v-if="navState === 'compact'"
              activator="parent"
              location="end"
            >
              Biblioteca
            </v-tooltip>
          </v-list-item>
          
          <!-- Instagram -->
          <v-list-item
            prepend-icon="mdi-instagram"
            :title="navState === 'expanded' ? 'Instagram' : undefined"
            value="instagram"
            :to="{ name: 'Instagram' }"
            color="primary"
          >
            <v-tooltip
              v-if="navState === 'compact'"
              activator="parent"
              location="end"
            >
              Instagram
            </v-tooltip>
          </v-list-item>
          
          <!-- Métricas -->
          <v-list-item
            prepend-icon="mdi-chart-line"
            :title="navState === 'expanded' ? 'Métricas' : undefined"
            value="metrics"
            :to="{ name: 'Metrics' }"
            color="primary"
          >
            <v-tooltip
              v-if="navState === 'compact'"
              activator="parent"
              location="end"
            >
              Métricas
            </v-tooltip>
          </v-list-item>
          
          <!-- CRM -->
          <v-list-item
            prepend-icon="mdi-account-group"
            :title="navState === 'expanded' ? 'CRM' : undefined"
            value="crm"
            :to="{ name: 'CRM' }"
            color="primary"
          >
            <v-tooltip
              v-if="navState === 'compact'"
              activator="parent"
              location="end"
            >
              CRM
            </v-tooltip>
          </v-list-item>
          
          <!-- Admin (Hibrit only) -->
          <template v-if="isHibrit">
            <v-divider class="my-2" />
            
            <v-list-item
              prepend-icon="mdi-shield-crown"
              :title="navState === 'expanded' ? 'Admin' : undefined"
              value="admin"
              :to="{ name: 'Admin' }"
              color="purple"
            >
              <v-tooltip
                v-if="navState === 'compact'"
                activator="parent"
                location="end"
              >
                Admin Hibrit
              </v-tooltip>
            </v-list-item>
            
            <v-list-item
              prepend-icon="mdi-clipboard-check"
              :title="navState === 'expanded' ? 'Tarefas' : undefined"
              value="tasks"
              :to="{ name: 'Tasks' }"
              color="indigo"
            >
              <v-tooltip
                v-if="navState === 'compact'"
                activator="parent"
                location="end"
              >
                Tarefas Internas
              </v-tooltip>
            </v-list-item>
          </template>
        </v-list>
        
        <!-- Botão Fechar no rodapé -->
        <template #append>
          <div style="border-top: 1px solid rgba(0,0,0,0.12);">
            <v-btn
              v-if="navState === 'expanded'"
              prepend-icon="mdi-close"
              variant="text"
              @click="hideNavigation"
              block
              class="pa-4"
              style="border-radius: 0;"
            >
              Fechar Menu
            </v-btn>
            
            <v-btn
              v-else
              variant="text"
              @click="hideNavigation"
              block
              class="pa-4"
              style="border-radius: 0;"
            >
              <v-icon>mdi-close</v-icon>
              <v-tooltip activator="parent" location="end">
                Fechar menu
              </v-tooltip>
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      


      <v-app-bar color="white" elevation="1" app>
        <!-- Botão para mostrar menu quando oculto -->
        <v-btn
          v-if="navState === 'hidden'"
          icon="mdi-menu"
          variant="text"
          @click="showNavigation"
          title="Mostrar menu"
          class="mr-2"
        />
        
        <!-- Botão para compactar quando expandido -->
        <v-btn
          v-if="navState === 'expanded'"
          icon="mdi-chevron-left"
          variant="text"
          @click="() => navState = 'compact'"
          title="Compactar menu"
          class="mr-2"
        />
        
        <!-- Left side buttons -->
        <v-btn
          color="deep-purple"
          prepend-icon="mdi-crown"
          variant="elevated"
          class="mr-4 funnel-ultimate-btn"
          @click="openFunnelCenter"
        >
          Funnel ULTIMATE
        </v-btn>
        
        <v-btn
          color="primary"
          prepend-icon="mdi-chart-timeline-variant"
          variant="elevated"
          class="mr-4"
          @click="openContentCenter"
        >
          Content Center
        </v-btn>
        
        <v-btn
          color="orange"
          prepend-icon="mdi-factory"
          variant="elevated"
          class="mr-4"
          @click="openCOC"
        >
          COC
        </v-btn>
        
        <v-btn
          color="success"
          prepend-icon="mdi-flask"
          variant="elevated"
          class="hibrit-labs-btn"
          @click="() => router.push('/labs')"
        >
          HIBRIT LABS
        </v-btn>
        
        <v-spacer />
        
        <!-- Launcher -->
        <v-menu>
          <template #activator="{ props }">
            <v-btn
              icon="mdi-apps"
              v-bind="props"
              title="Launcher"
              class="ml-2"
            />
          </template>
          <LauncherMenu />
        </v-menu>
        
        <v-btn
          v-if="isHibrit && !simulationStore.isSimulating"
          icon="mdi-clipboard-check"
          color="indigo"
          :to="{ name: 'Tasks' }"
          class="ml-2"
          title="Tarefas Internas"
        />
        
        <v-btn
          v-if="isHibrit && !simulationStore.isSimulating"
          icon="mdi-shield-crown"
          color="purple"
          :to="{ name: 'Admin' }"
          class="ml-2"
          title="Administração Hibrit"
        />
        
        <v-btn
          v-if="simulationStore.isSimulating"
          color="error"
          prepend-icon="mdi-close"
          @click="stopSimulation"
          class="ml-2"
        >
          Sair da Simulação
        </v-btn>
        
        <v-menu>
          <template #activator="{ props }">
            <v-btn
              icon="mdi-account-circle"
              v-bind="props"
              class="ml-4"
              :class="{ 'simulation-avatar': simulationStore.isSimulating }"
            />
          </template>
          <v-list>
            <v-list-item @click="signOut">
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </template>

    <v-main>
      <!-- Context Bar -->
      <ContextBar v-if="needsContextBar" />
      
      <router-view />
    </v-main>

    <!-- Documentação -->
    <DocDock />

    <!-- Navegação de Cockpits -->
    <CockpitNavigation v-if="!isLoginPage" />

    <!-- Snackbar para feedback -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useDocsStore } from '@/stores/docs'
import { useSimulationStore } from '@/stores/simulation'
import { useCockpitStore } from '@/stores/cockpit'
import { useKeyboardShortcuts } from '@/composables/useKeyboardShortcuts'
import { useDocHotspot } from '@/composables/useDocHotspot'
import DocDock from '@/components/docs/DocDock.vue'
import ContextBar from '@/components/ContextBar.vue'
import LauncherMenu from '@/components/LauncherMenu.vue'
import CockpitNavigation from '@/components/CockpitNavigation.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const docsStore = useDocsStore()
const simulationStore = useSimulationStore()
const cockpitStore = useCockpitStore()

const drawer = ref(true)
const navState = ref('compact') // 'expanded', 'compact', 'hidden'

const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
})

const isLoginPage = computed(() => route.name === 'Login')

// Telas que precisam da ContextBar (seleção de workspace/brand)
const needsContextBar = computed(() => {
  const contextBarRoutes = [
    'Pipeline', 'Editor', 'Library', 'Metrics', 'Instagram', 
    'Calendar', 'Funnels', 'FunnelBuilder'
  ]
  return contextBarRoutes.includes(route.name) && !isLoginPage.value
})

const isHibrit = computed(() => {
  const userData = authStore.user?.user_metadata || authStore.user?.raw_user_meta_data || {}
  return userData.org === 'hibrit' || userData.role === 'hibrit_staff'
})

const openContentCenter = () => {
  router.push({ name: 'ContentCenter' })
}

const openCOC = () => {
  router.push({ name: 'ContentOperationalCenter' })
}

const openFunnelCenter = () => {
  router.push({ name: 'FunnelCenter' })
}

const generateCopies = () => {
  // Implementar geração de copies
  showSnackbar('Gerando 3 variações...', 'info')
}

const goToHome = () => {
  router.push('/cockpit')
}

const signOut = async () => {
  await authStore.signOut()
  router.push('/login')
}

const showSnackbar = (text, color = 'success') => {
  snackbar.value = { show: true, text, color }
}

const showNavigation = () => {
  navState.value = 'expanded'
}

const expandNavigation = () => {
  navState.value = 'expanded'
}

const hideNavigation = () => {
  navState.value = 'hidden'
}

const stopSimulation = () => {
  simulationStore.stopSimulation()
  // Remover parâmetros da URL
  const url = new URL(window.location)
  url.searchParams.delete('simulate')
  url.searchParams.delete('workspace')
  window.history.replaceState({}, '', url)
  
  showSnackbar('Simulação encerrada', 'info')
}

// Atalhos de teclado
useKeyboardShortcuts({
  '/': () => document.querySelector('input[placeholder*="Buscar"]')?.focus(),
  'g+c': () => router.push({ name: 'Calendar' }),
  'g+p': () => router.push({ name: 'Pipeline' })
})

// Atalhos de documentação
useDocHotspot()

onMounted(async () => {
  await authStore.initialize()
  await cockpitStore.initialize()
  
  // Verificar se deve iniciar simulação
  if (simulationStore.initializeFromUrl()) {
    showSnackbar('Modo simulação ativado', 'warning')
  }
})
</script>

<style scoped>
.simulation-avatar {
  border: 2px solid #FFC107 !important;
  border-radius: 50% !important;
  animation: pulse-border 2s infinite;
}

@keyframes pulse-border {
  0% {
    border-color: #FFC107;
    box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.4);
  }
  50% {
    border-color: #FF9800;
    box-shadow: 0 0 0 4px rgba(255, 193, 7, 0.2);
  }
  100% {
    border-color: #FFC107;
    box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.4);
  }
}

.navigation-rail {
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.navigation-header {
  border-bottom: 1px solid rgba(0,0,0,0.08);
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.02) 0%, rgba(25, 118, 210, 0.05) 100%);
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Smooth transitions for list items */
.v-list-item {
  transition: all 0.2s ease;
}

.v-list-item:hover {
  transform: translateX(2px);
}

.cursor-pointer {
  cursor: pointer;
}

.cursor-pointer:hover {
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.funnel-ultimate-btn {
  background: linear-gradient(45deg, #673ab7, #9c27b0) !important;
  box-shadow: 0 4px 15px rgba(156, 39, 176, 0.4) !important;
  animation: ultimate-glow 2s ease-in-out infinite alternate;
}

@keyframes ultimate-glow {
  from {
    box-shadow: 0 4px 15px rgba(156, 39, 176, 0.4);
  }
  to {
    box-shadow: 0 6px 20px rgba(156, 39, 176, 0.6);
  }
}

.hibrit-labs-btn {
  background: linear-gradient(45deg, #00ff9d, #007bff) !important;
  box-shadow: 0 4px 15px rgba(0, 255, 157, 0.4) !important;
  animation: labs-glow 2s ease-in-out infinite alternate;
}

@keyframes labs-glow {
  from {
    box-shadow: 0 4px 15px rgba(0, 255, 157, 0.4);
  }
  to {
    box-shadow: 0 6px 20px rgba(0, 255, 157, 0.6);
  }
}


</style>