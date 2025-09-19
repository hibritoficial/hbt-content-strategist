import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const useLibraryStore = defineStore('library', () => {
  const pillars = ref([])
  const angles = ref([])
  const formats = ref([])
  const molds = ref([])
  const loading = ref(false)

  const loadAll = async () => {
    loading.value = true
    try {
      const [pillarsRes, anglesRes, formatsRes, moldsRes] = await Promise.all([
        supabase.from('pillars').select('*').order('name'),
        supabase.from('angles').select('*').order('name'),
        supabase.from('formats').select('*').order('name'),
        supabase.from('molds').select('*').order('name')
      ])
      
      pillars.value = pillarsRes.data || []
      angles.value = anglesRes.data || []
      formats.value = formatsRes.data || []
      molds.value = moldsRes.data || []
    } finally {
      loading.value = false
    }
  }

  const createPillar = async (data) => {
    const { data: newItem, error } = await supabase
      .from('pillars')
      .insert([data])
      .select()
      .single()
    
    if (!error) pillars.value.unshift(newItem)
    return { success: !error, data: newItem, error }
  }

  const createAngle = async (data) => {
    const { data: newItem, error } = await supabase
      .from('angles')
      .insert([data])
      .select()
      .single()
    
    if (!error) angles.value.unshift(newItem)
    return { success: !error, data: newItem, error }
  }

  const createMold = async (data) => {
    const { data: newItem, error } = await supabase
      .from('molds')
      .insert([data])
      .select()
      .single()
    
    if (!error) molds.value.unshift(newItem)
    return { success: !error, data: newItem, error }
  }

  const deletePillar = async (id) => {
    const { error } = await supabase
      .from('pillars')
      .delete()
      .eq('id', id)
    
    if (!error) {
      const index = pillars.value.findIndex(p => p.id === id)
      if (index > -1) pillars.value.splice(index, 1)
    }
    return { success: !error, error }
  }

  const deleteAngle = async (id) => {
    const { error } = await supabase
      .from('angles')
      .delete()
      .eq('id', id)
    
    if (!error) {
      const index = angles.value.findIndex(a => a.id === id)
      if (index > -1) angles.value.splice(index, 1)
    }
    return { success: !error, error }
  }

  const deleteMold = async (id) => {
    const { error } = await supabase
      .from('molds')
      .delete()
      .eq('id', id)
    
    if (!error) {
      const index = molds.value.findIndex(m => m.id === id)
      if (index > -1) molds.value.splice(index, 1)
    }
    return { success: !error, error }
  }

  return {
    pillars,
    angles,
    formats,
    molds,
    loading,
    loadAll,
    createPillar,
    createAngle,
    createMold,
    deletePillar,
    deleteAngle,
    deleteMold
  }
})