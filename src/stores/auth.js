import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

// Development-only auth bypass
const AUTH_BYPASS_ENABLED = String(import.meta.env.VITE_AUTH_BYPASS || '').toLowerCase() === 'true'
const BYPASS_MOCK_USER = {
  id: 'dev-bypass-user',
  email: 'dev@hibrit.local',
  app_metadata: { provider: 'bypass' },
  user_metadata: { org: 'hibrit', role: 'hibrit_staff', name: 'Dev Bypass' },
  raw_user_meta_data: { org: 'hibrit', role: 'hibrit_staff', name: 'Dev Bypass' }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)
  const initialized = ref(false)

  const signIn = async (email, password) => {
    loading.value = true
    try {
      if (AUTH_BYPASS_ENABLED) {
        user.value = BYPASS_MOCK_USER
        return { success: true }
      }
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
    if (AUTH_BYPASS_ENABLED) {
      user.value = null
      return
    }
    const { error } = await supabase.auth.signOut()
    if (!error) {
      user.value = null
    }
  }

  const initialize = async () => {
    if (initialized.value) return
    if (AUTH_BYPASS_ENABLED) {
      user.value = BYPASS_MOCK_USER
      initialized.value = true
      return
    }
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    user.value = currentUser
    initialized.value = true
    supabase.auth.onAuthStateChange((event, session) => {
      user.value = session?.user || null
    })
  }

  const refreshUser = async () => {
    if (AUTH_BYPASS_ENABLED) {
      return user.value
    }
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    user.value = currentUser
    return currentUser
  }

  return {
    user,
    loading,
    initialized,
    signIn,
    signOut,
    initialize,
    refreshUser
  }
})