import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'

export const useContentStore = defineStore('content', () => {
  const items = ref([])
  const loading = ref(false)

  const itemsByStatus = computed(() => {
    return items.value.reduce((acc, item) => {
      if (!acc[item.status]) acc[item.status] = []
      acc[item.status].push(item)
      return acc
    }, {})
  })

  const fetchItems = async (workspaceId = null) => {
    loading.value = true
    try {
      let query = supabase
        .from('content_items')
        .select(`
          *,
          pillars(name),
          angles(name),
          formats(name),
          molds(name)
        `)
      
      // Filtrar por brand se especificado
      if (workspaceId) {
        query = query.eq('brand_id', workspaceId)
      }
      
      const { data, error } = await query.order('updated_at', { ascending: false })
      
      if (error) throw error
      items.value = data || []
    } catch (error) {
      console.error('Error fetching content items:', error)
    } finally {
      loading.value = false
    }
  }

  const createItem = async (itemData) => {
    try {
      // Clean the data - remove null/undefined values and problematic fields
      const cleanData = Object.fromEntries(
        Object.entries(itemData).filter(([key, value]) => {
          // Skip cta_keyword_id to avoid foreign key issues
          if (key === 'cta_keyword_id') return false
          return value !== null && value !== undefined && value !== ''
        })
      )
      
      const { error } = await supabase
        .from('content_items')
        .insert(cleanData)
      
      if (error) throw error
      
      // Refresh the items list
      await fetchItems()
      
      return { success: true }
    } catch (error) {
      console.error('Create item error:', error)
      return { success: false, error: error.message }
    }
  }

  const updateItem = async (id, updates) => {
    try {
      // Clean the data - remove null/undefined values and problematic fields
      const cleanData = Object.fromEntries(
        Object.entries(updates).filter(([key, value]) => {
          // Skip problematic fields
          if (key === 'cta_keyword_id') return false
          if (key === 'id') return false // Don't update ID
          if (key === 'created_at') return false // Don't update created_at
          if (key === 'pillars') return false // Don't update joined data
          if (key === 'angles') return false
          if (key === 'formats') return false
          if (key === 'molds') return false
          return value !== null && value !== undefined
        })
      )
      
      const { error } = await supabase
        .from('content_items')
        .update(cleanData)
        .eq('id', id)
      
      if (error) throw error
      
      // Refresh the items list
      await fetchItems()
      
      return { success: true }
    } catch (error) {
      console.error('Update item error:', error)
      return { success: false, error: error.message }
    }
  }

  const deleteItem = async (id) => {
    try {
      const { error } = await supabase
        .from('content_items')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      items.value = items.value.filter(item => item.id !== id)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  return {
    items,
    loading,
    itemsByStatus,
    fetchItems,
    createItem,
    updateItem,
    deleteItem
  }
})