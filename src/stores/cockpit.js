import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from './auth'

export const useCockpitStore = defineStore('cockpit', () => {
  const authStore = useAuthStore()
  
  // Escopo: 'portfolio' ou 'client'
  const scope = ref('portfolio')
  const fixedClient = ref(null)
  const userWorkspaces = ref([])
  const portfolioData = ref([])
  const portfolioAlerts = ref([])
  const clientData = ref(null)
  const clientAlerts = ref([])
  const loading = ref(false)

  const isHibrit = computed(() => {
    const userData = authStore.user?.user_metadata || authStore.user?.raw_user_meta_data || {}
    return userData.org === 'hibrit' || userData.role === 'hibrit_staff'
  })

  const isPortfolioScope = computed(() => scope.value === 'portfolio')
  const isClientScope = computed(() => scope.value === 'client')
  const canSwitchScope = computed(() => isHibrit.value)
  const currentClient = computed(() => fixedClient.value)

  const initialize = async () => {
    await loadUserWorkspaces()
    
    // Auto-configurar baseado no role
    if (isHibrit.value) {
      // Hibrit inicia em Portfólio
      scope.value = 'portfolio'
      await loadPortfolioData()
    } else if (userWorkspaces.value.length > 0) {
      // Cliente inicia em Cliente (workspace único)
      scope.value = 'client'
      fixedClient.value = userWorkspaces.value[0]
      await loadClientData()
    }
  }

  const loadUserWorkspaces = async () => {
    try {
      const { data, error } = await supabase.rpc('get_user_workspaces', {
        user_uuid: authStore.user.id
      })
      
      if (error) throw error
      userWorkspaces.value = data || []
    } catch (error) {
      console.error('Erro ao carregar workspaces:', error)
      userWorkspaces.value = []
    }
  }

  const loadPortfolioData = async () => {
    if (!isHibrit.value) return
    
    loading.value = true
    try {
      // Carregar métricas do portfólio
      const { data: metricsData, error: metricsError } = await supabase
        .from('portfolio_metrics')
        .select('*')
        .order('health_score', { ascending: false })
      
      if (metricsError) throw metricsError
      portfolioData.value = metricsData || []

      // Carregar alertas do portfólio
      const { data: alertsData, error: alertsError } = await supabase
        .from('portfolio_alerts')
        .select('*')
        .neq('severity', 'green')
        .order('severity', { ascending: false })
      
      if (alertsError) throw alertsError
      portfolioAlerts.value = alertsData || []
      
    } catch (error) {
      console.error('Erro ao carregar dados do portfólio:', error)
    } finally {
      loading.value = false
    }
  }

  const loadClientData = async () => {
    if (!fixedClient.value) return
    
    loading.value = true
    try {
      const workspaceId = fixedClient.value.workspace_id || fixedClient.value.id
      
      // Carregar dados do cockpit do cliente
      const { data: cockpitData, error: cockpitError } = await supabase
        .from('portfolio_cockpit')
        .select('*')
        .eq('workspace_id', workspaceId)
        .single()
      
      if (cockpitError && cockpitError.code !== 'PGRST116') {
        throw cockpitError
      }
      clientData.value = cockpitData || {}

      // Carregar alertas do cliente
      const { data: alertsData, error: alertsError } = await supabase
        .from('portfolio_alerts')
        .select('*')
        .eq('workspace_id', workspaceId)
        .neq('severity', 'green')
      
      if (alertsError) throw alertsError
      clientAlerts.value = alertsData || []
      
    } catch (error) {
      console.error('Erro ao carregar dados do cliente:', error)
      clientData.value = {}
      clientAlerts.value = []
    } finally {
      loading.value = false
    }
  }

  const switchToPortfolio = async () => {
    if (!isHibrit.value) return
    
    scope.value = 'portfolio'
    fixedClient.value = null
    await loadPortfolioData()
  }

  const switchToClient = async (client = null) => {
    if (client) {
      fixedClient.value = client
    }
    
    if (!fixedClient.value && userWorkspaces.value.length > 0) {
      fixedClient.value = userWorkspaces.value[0]
    }
    
    scope.value = 'client'
    await loadClientData()
  }

  const fixClient = async (client) => {
    fixedClient.value = client
    scope.value = 'client'
    await loadClientData()
    
    // Persistir cliente fixado
    localStorage.setItem('hibrit_fixed_client', JSON.stringify(client))
  }

  const refreshData = async () => {
    if (isPortfolioMode.value) {
      await loadPortfolioData()
    } else {
      await loadClientData()
    }
  }

  const getHealthColor = (score) => {
    if (score >= 80) return 'success'
    if (score >= 60) return 'warning'
    return 'error'
  }

  const getAlertColor = (severity) => {
    const colors = {
      green: 'success',
      yellow: 'warning', 
      red: 'error'
    }
    return colors[severity] || 'grey'
  }

  const getClientAlerts = (workspaceId) => {
    return portfolioAlerts.value.filter(alert => alert.workspace_id === workspaceId)
  }

  return {
    // State
    scope,
    fixedClient,
    userWorkspaces,
    portfolioData,
    portfolioAlerts,
    clientData,
    clientAlerts,
    loading,
    
    // Computed
    isHibrit,
    isPortfolioScope,
    isClientScope,
    canSwitchScope,
    currentClient,
    
    // Actions
    initialize,
    loadUserWorkspaces,
    loadPortfolioData,
    loadClientData,
    switchToPortfolio,
    switchToClient,
    fixClient,
    refreshData,
    
    // Helpers
    getHealthColor,
    getAlertColor,
    getClientAlerts
  }
})