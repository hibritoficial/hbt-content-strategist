import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

// Development-only auth bypass (runtime via URL/localStorage, or env)
const LOCALSTORAGE_KEY_BYPASS = 'hibrit_auth_bypass'
const LOCALSTORAGE_KEY_BYPASS_USER = 'hibrit_auth_bypass_user'
const getEnvBypassFlag = () => String(import.meta.env.VITE_AUTH_BYPASS || '').toLowerCase() === 'true'

const DEFAULT_BYPASS_USER = {
  id: 'dev-bypass-user',
  email: 'dev@hibrit.local',
  app_metadata: { provider: 'bypass' },
  user_metadata: { org: 'hibrit', role: 'hibrit_staff', name: 'Dev Bypass' },
  raw_user_meta_data: { org: 'hibrit', role: 'hibrit_staff', name: 'Dev Bypass' }
}

const persistBypassFromUrlIfPresent = () => {
  if (typeof window === 'undefined') return
  try {
    const url = new URL(window.location.href)
    const bypassParam = url.searchParams.get('bypass')
    if (bypassParam !== null) {
      const enable = ['1', 'true', 'yes', 'on'].includes(String(bypassParam).toLowerCase())
      if (enable) {
        localStorage.setItem(LOCALSTORAGE_KEY_BYPASS, 'true')
      } else {
        localStorage.removeItem(LOCALSTORAGE_KEY_BYPASS)
        localStorage.removeItem(LOCALSTORAGE_KEY_BYPASS_USER)
      }
    }

    // Optional user overrides
    const org = url.searchParams.get('org')
    const role = url.searchParams.get('role')
    const name = url.searchParams.get('name')
    const email = url.searchParams.get('email')
    if (org || role || name || email) {
      const current = getBypassUserFromStorage() || DEFAULT_BYPASS_USER
      const merged = {
        ...current,
        email: email || current.email,
        user_metadata: {
          ...current.user_metadata,
          org: org || current.user_metadata?.org,
          role: role || current.user_metadata?.role,
          name: name || current.user_metadata?.name
        },
        raw_user_meta_data: {
          ...current.raw_user_meta_data,
          org: org || current.raw_user_meta_data?.org,
          role: role || current.raw_user_meta_data?.role,
          name: name || current.raw_user_meta_data?.name
        }
      }
      localStorage.setItem(LOCALSTORAGE_KEY_BYPASS_USER, JSON.stringify(merged))
    }
  } catch {
    // ignore
  }
}

const getBypassUserFromStorage = () => {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(LOCALSTORAGE_KEY_BYPASS_USER)
    return raw ? JSON.parse(raw) : DEFAULT_BYPASS_USER
  } catch {
    return DEFAULT_BYPASS_USER
  }
}

const isBypassActive = () => {
  if (typeof window === 'undefined') return getEnvBypassFlag()
  const ls = localStorage.getItem(LOCALSTORAGE_KEY_BYPASS) === 'true'
  return getEnvBypassFlag() || ls
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)
  const initialized = ref(false)

  const signIn = async (email, password) => {
    loading.value = true
    try {
      if (isBypassActive()) {
        user.value = getBypassUserFromStorage() || DEFAULT_BYPASS_USER
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
    if (isBypassActive()) {
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
    // Capture URL-driven bypass intent first
    persistBypassFromUrlIfPresent()
    if (isBypassActive()) {
      user.value = getBypassUserFromStorage() || DEFAULT_BYPASS_USER
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
    if (isBypassActive()) {
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