import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
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
  } else {
    next()
  }
})

export default router