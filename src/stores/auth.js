import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)
  const initialized = ref(false)

  const signIn = async (email, password) => {
    loading.value = true
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      user.value = data.user
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      user.value = null
    }
  }

  const initialize = async () => {
    if (initialized.value) return
    
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    user.value = currentUser
    initialized.value = true

    supabase.auth.onAuthStateChange((event, session) => {
      user.value = session?.user || null
    })
  }

  return {
    user,
    loading,
    initialized,
    signIn,
    signOut,
    initialize
  }
})