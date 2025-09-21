import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'

export const useSimulationStore = defineStore('simulation', () => {
  const authStore = useAuthStore()
  
  const isSimulating = ref(false)
  const simulatedWorkspaceId = ref(null)
  const simulatedWorkspaceSlug = ref(null)

  const isHibrit = computed(() => {
    const userData = authStore.user?.user_metadata || authStore.user?.raw_user_meta_data || {}
    return userData.org === 'hibrit' || userData.role === 'hibrit_staff'
  })

  const canSimulate = computed(() => isHibrit.value)

  const startSimulation = (workspaceId, workspaceSlug) => {
    if (!canSimulate.value) return false
    
    isSimulating.value = true
    simulatedWorkspaceId.value = workspaceId
    simulatedWorkspaceSlug.value = workspaceSlug
    return true
  }

  const stopSimulation = () => {
    isSimulating.value = false
    simulatedWorkspaceId.value = null
    simulatedWorkspaceSlug.value = null
  }

  const initializeFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const simulateParam = urlParams.get('simulate')
    const workspaceParam = urlParams.get('workspace')
    
    if (simulateParam && workspaceParam && canSimulate.value) {
      startSimulation(simulateParam, workspaceParam)
      return true
    }
    
    return false
  }

  return {
    isSimulating,
    simulatedWorkspaceId,
    simulatedWorkspaceSlug,
    isHibrit,
    canSimulate,
    startSimulation,
    stopSimulation,
    initializeFromUrl
  }
})