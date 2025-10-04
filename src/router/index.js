import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Runtime dev bypass helper (mirrors auth store logic)
const LOCALSTORAGE_KEY_BYPASS = 'hibrit_auth_bypass'
const getEnvBypassFlag = () => String(import.meta.env.VITE_AUTH_BYPASS || '').toLowerCase() === 'true'
const isBypassActive = () => {
  if (typeof window === 'undefined') return getEnvBypassFlag()
  return getEnvBypassFlag() || localStorage.getItem(LOCALSTORAGE_KEY_BYPASS) === 'true'
}

const routes = [
  {
    path: '/',
    redirect: '/cockpit'
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    meta: { requiresAuth: true, requiresHibrit: true }
  },
  {
    path: '/labs',
    name: 'HibritLabs',
    component: () => import('@/views/HibritLabs.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/labs/scientific-laboratories',
    name: 'ScientificLaboratories',
    component: () => import('@/views/ScientificLaboratories.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/labs/neural-research-engine',
    name: 'NeuralResearchEngine',
    component: () => import('@/views/NeuralResearchEngine.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/neural-nexus',
    name: 'NeuralNexusCenter',
    component: () => import('@/views/NeuralNexusCenter.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/neural-nexus/conversational-intelligence',
    name: 'ConversationalIntelligenceLab',
    component: () => import('@/views/ai/ConversationalIntelligenceLab.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/neural-nexus/conversational-intelligence/chat-simulator',
    name: 'ChatSimulator',
    component: () => import('@/views/ai/ChatSimulator.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/knowledge-nexus',
    name: 'KnowledgeNexus',
    component: () => import('@/views/KnowledgeNexus.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/labs/interface-test',
    name: 'InterfaceTest',
    component: () => import('@/views/InterfaceTest.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/labs/cxa-dashboard',
    name: 'CXADashboard',
    component: () => import('@/views/experiments/CXADashboardExperiment.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/labs/cxa-ultimate',
    name: 'CXAUltimate',
    component: () => import('@/views/experiments/CXAUltimateExperiment.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/labs/analytics-overview',
    name: 'AnalyticsOverview',
    component: () => import('@/views/experiments/AnalyticsOverviewExperiment.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/labs/funnel-builder',
    name: 'FunnelBuilderExperiment',
    component: () => import('@/views/experiments/FunnelBuilderExperiment.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/labs/mobile-interface',
    name: 'MobileInterfaceExperiment',
    component: () => import('@/views/experiments/MobileInterfaceExperiment.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/labs/components-test',
    name: 'ComponentsTest',
    component: () => import('@/views/ComponentsTest.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('@/views/Tasks.vue'),
    meta: { requiresAuth: true, requiresHibrit: true }
  },
  {
    path: '/cockpit',
    name: 'Cockpit',
    component: () => import('@/views/CockpitNew.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/cockpit/ocs',
    name: 'CockpitOCS',
    component: () => import('@/views/CockpitOCS.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/content-center',
    name: 'ContentCenter',
    component: () => import('@/views/ContentCenter.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/coc',
    name: 'ContentOperationalCenter',
    component: () => import('@/views/ContentOperationalCenter.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/funnel-center',
    name: 'FunnelCenter',
    component: () => import('@/views/FunnelCenter.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('@/views/Calendar.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pipeline',
    name: 'Pipeline',
    component: () => import('@/views/Pipeline.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/editor/:id',
    name: 'Editor',
    component: () => import('@/views/Editor.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/library',
    name: 'Library',
    component: () => import('@/views/Library.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/metrics',
    name: 'Metrics',
    component: () => import('@/views/Metrics.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/flow',
    name: 'Flow',
    component: () => import('@/views/Flow.vue'),
    meta: { requiresAuth: true, requiresHibrit: true }
  },
  {
    path: '/funnels',
    name: 'Funnels',
    component: () => import('@/views/Funnels.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/funnels/:id',
    name: 'FunnelBuilder',
    component: () => import('@/views/FunnelBuilder.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/crm',
    name: 'CRM',
    component: () => import('@/views/CRM.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/gamification',
    name: 'Gamification',
    component: () => import('@/views/Gamification.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/gamification/operacao-anti-ghosting',
    name: 'OperacaoAntiGhosting',
    component: () => import('@/views/gamification/OperacaoAntiGhosting.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/channels/instagram',
    name: 'Instagram',
    component: () => import('@/views/channels/Instagram.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/channels/youtube',
    name: 'YouTube',
    component: () => import('@/views/channels/YouTube.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/channels/blog',
    name: 'Blog',
    component: () => import('@/views/channels/Blog.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/setup-admin',
    name: 'SetupAdmin',
    component: () => import('@/views/SetupAdmin.vue'),
    meta: { requiresAuth: true, requiresHibrit: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Aguardar inicialização do auth se necessário
  if (!authStore.initialized) {
    await authStore.initialize()
  }
  
  // Se bypass está ativo e usuário tentar ir para /login, redireciona
  if (isBypassActive() && to.path === '/login') {
    next('/cockpit')
    return
  }
  
  if (to.meta.requiresAuth && !authStore.user) {
    next('/login')
    return
  }
  
  // Verificar se precisa ser Hibrit Staff
  if (to.meta.requiresHibrit) {
    const userData = authStore.user?.user_metadata || authStore.user?.raw_user_meta_data || {}
    const isHibrit = userData.org === 'hibrit' || userData.role === 'hibrit_staff'
    if (!isHibrit) {
      next('/cockpit')
      return
    }
  }
  
  next()
})

export default router