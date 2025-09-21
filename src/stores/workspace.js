import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'

export const useWorkspaceStore = defineStore('workspace', () => {
  const current = ref(null)
  const list = ref([])
  const loading = ref(false)

  const isSelected = computed(() => !!current.value)
  const currentId = computed(() => current.value?.id)
  const currentName = computed(() => current.value?.name)
  const currentSlug = computed(() => current.value?.slug)

  const loadMyWorkspaces = async () => {
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('workspaces')
        .select(`
          id,
          name,
          slug,
          brand_settings,
          workspace_members!inner(role)
        `)
        .order('name')

      if (error) throw error
      
      list.value = data || []
      
      // Se não há workspace atual, selecionar o primeiro
      if (!current.value && list.value.length > 0) {
        await setCurrent(list.value[0].id)
      }
      
      return { success: true, data }
    } catch (error) {
      console.error('Error loading workspaces:', error)
      return { success: false, error }
    } finally {
      loading.value = false
    }
  }

  const setCurrent = async (workspaceId) => {
    const workspace = list.value.find(w => w.id === workspaceId)
    if (workspace) {
      current.value = workspace
      // Persistir no localStorage
      localStorage.setItem('hibrit_current_workspace', workspaceId)
      return true
    }
    return false
  }

  const createWorkspace = async (data) => {
    try {
      const { data: newWorkspace, error } = await supabase
        .from('workspaces')
        .insert([{
          name: data.name,
          slug: data.slug,
          brand_settings: data.brand_settings || {}
        }])
        .select()
        .single()

      if (error) throw error

      // Adicionar usuário atual como owner
      const { error: memberError } = await supabase
        .from('workspace_members')
        .insert([{
          workspace_id: newWorkspace.id,
          user_id: (await supabase.auth.getUser()).data.user.id,
          role: 'owner'
        }])

      if (memberError) throw memberError

      // Adicionar à lista e selecionar
      list.value.unshift(newWorkspace)
      await setCurrent(newWorkspace.id)

      return { success: true, data: newWorkspace }
    } catch (error) {
      console.error('Error creating workspace:', error)
      return { success: false, error }
    }
  }

  const updateWorkspace = async (id, data) => {
    try {
      const { data: updatedWorkspace, error } = await supabase
        .from('workspaces')
        .update(data)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      // Atualizar na lista
      const index = list.value.findIndex(w => w.id === id)
      if (index > -1) {
        list.value[index] = updatedWorkspace
      }

      // Atualizar current se for o mesmo
      if (current.value?.id === id) {
        current.value = updatedWorkspace
      }

      return { success: true, data: updatedWorkspace }
    } catch (error) {
      console.error('Error updating workspace:', error)
      return { success: false, error }
    }
  }

  const initialize = async () => {
    await loadMyWorkspaces()
    
    // Tentar restaurar workspace do localStorage
    const savedWorkspaceId = localStorage.getItem('hibrit_current_workspace')
    if (savedWorkspaceId && list.value.some(w => w.id === savedWorkspaceId)) {
      await setCurrent(savedWorkspaceId)
    }
  }

  const requireWorkspace = () => {
    return isSelected.value
  }

  return {
    // State
    current,
    list,
    loading,
    
    // Getters
    isSelected,
    currentId,
    currentName,
    currentSlug,
    
    // Actions
    loadMyWorkspaces,
    setCurrent,
    createWorkspace,
    updateWorkspace,
    initialize,
    requireWorkspace
  }
})