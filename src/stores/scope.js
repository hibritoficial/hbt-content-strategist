import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'

export const useScopeStore = defineStore('scope', () => {
  const userRole = ref(null) // 'hibrit_staff' | 'client_user'
  const currentScope = ref('portfolio') // 'portfolio' | 'client'
  const selectedClient = ref(null) // workspace object when in client scope
  const availableClients = ref([])
  const loading = ref(false)

  // Computed
  const isHibrit = computed(() => userRole.value === 'hibrit_staff')
  const isClient = computed(() => userRole.value === 'client_user')
  const isPortfolioScope = computed(() => currentScope.value === 'portfolio')
  const isClientScope = computed(() => currentScope.value === 'client')
  const canAccessAdmin = computed(() => isHibrit.value)
  const needsClientSelection = computed(() => 
    isHibrit.value && isClientScope.value && !selectedClient.value
  )

  // Initialize user role and scope
  const initialize = async () => {
    loading.value = true
    try {
      // Get user role
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) return

      const { data: roleData } = await supabase.rpc('get_user_role')
      userRole.value = roleData

      // Load available workspaces based on role
      await loadAvailableClients()

      // Set initial scope
      if (isClient.value) {
        // Client users always start in client scope with their workspace
        currentScope.value = 'client'
        if (availableClients.value.length > 0) {
          selectedClient.value = availableClients.value[0]
        }
      } else if (isHibrit.value) {
        // Hibrit starts in portfolio, restore client if saved
        currentScope.value = 'portfolio'
        const savedClientId = localStorage.getItem('hibrit_selected_client')
        if (savedClientId) {
          const savedClient = availableClients.value.find(c => c.workspace_id === savedClientId)
          if (savedClient) {
            selectedClient.value = savedClient
            currentScope.value = 'client'
          }
        }
      }
    } finally {
      loading.value = false
    }
  }

  const loadAvailableClients = async () => {
    const { data, error } = await supabase.rpc('get_user_workspaces')
    if (!error) {
      availableClients.value = data || []
    }
  }

  // Switch to portfolio scope (Hibrit only)
  const switchToPortfolio = () => {
    if (!isHibrit.value) return
    
    currentScope.value = 'portfolio'
    selectedClient.value = null
    localStorage.removeItem('hibrit_selected_client')
  }

  // Switch to client scope
  const switchToClient = (client = null) => {
    currentScope.value = 'client'
    
    if (client) {
      selectedClient.value = client
      if (isHibrit.value) {
        localStorage.setItem('hibrit_selected_client', client.workspace_id)
      }
    } else if (isClient.value && availableClients.value.length > 0) {
      // Auto-select for client users
      selectedClient.value = availableClients.value[0]
    }
  }

  // Get current workspace ID for queries
  const getCurrentWorkspaceId = () => {
    if (isClientScope.value && selectedClient.value) {
      return selectedClient.value.workspace_id
    }
    return null
  }

  // Check if user can access a specific module
  const canAccessModule = (module) => {
    const moduleRules = {
      cockpit: true, // Always accessible
      funnel: isClientScope.value && selectedClient.value, // Requires client
      content: isClientScope.value && selectedClient.value, // Requires client  
      metrics: true, // Portfolio & Client
      training: true, // Always accessible
      admin: isHibrit.value // Hibrit only
    }
    
    return moduleRules[module] || false
  }

  // Get portfolio data (Hibrit only)
  const getPortfolioData = async () => {
    if (!isHibrit.value) return null

    const { data, error } = await supabase
      .from('portfolio_cockpit')
      .select('*')
      .order('workspace_name')

    return { data, error }
  }

  // Get portfolio alerts (Hibrit only)
  const getPortfolioAlerts = async () => {
    if (!isHibrit.value) return null

    const { data, error } = await supabase
      .from('portfolio_alerts')
      .select('*')
      .order('severity', { ascending: false })
      .order('created_at', { ascending: false })

    return { data, error }
  }

  // Get portfolio metrics (Hibrit only)
  const getPortfolioMetrics = async () => {
    if (!isHibrit.value) return null

    const { data, error } = await supabase
      .from('portfolio_metrics')
      .select('*')
      .order('completion_rate', { ascending: false })

    return { data, error }
  }

  return {
    // State
    userRole,
    currentScope,
    selectedClient,
    availableClients,
    loading,

    // Computed
    isHibrit,
    isClient,
    isPortfolioScope,
    isClientScope,
    canAccessAdmin,
    needsClientSelection,

    // Actions
    initialize,
    loadAvailableClients,
    switchToPortfolio,
    switchToClient,
    getCurrentWorkspaceId,
    canAccessModule,
    getPortfolioData,
    getPortfolioAlerts,
    getPortfolioMetrics
  }
})