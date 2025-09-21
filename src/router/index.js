import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

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
    path: '/content-center',
    name: 'ContentCenter',
    component: () => import('@/views/ContentCenter.vue'),
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