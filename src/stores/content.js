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

  const fetchItems = async () => {
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('content_items')
        .select(`
          *,
          pillars(name),
          angles(name),
          formats(name),
          molds(name)
        `)
        .order('updated_at', { ascending: false })
      
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
      const { data, error } = await supabase
        .from('content_items')
        .insert([itemData])
        .select()
        .single()
      
      if (error) throw error
      items.value.unshift(data)
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const updateItem = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('content_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      
      const index = items.value.findIndex(item => item.id === id)
      if (index !== -1) {
        items.value[index] = data
      }
      
      return { success: true, data }
    } catch (error) {
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