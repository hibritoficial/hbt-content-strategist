<template>
  <v-container>
    <v-card>
      <v-card-title>Setup Sistema Admin</v-card-title>
      <v-card-text>
        <v-btn @click="setupAdminSystem" color="primary" :loading="loading">
          Criar Views e Funções Admin
        </v-btn>
        
        <v-alert v-if="message" :type="alertType" class="mt-4">
          {{ message }}
        </v-alert>
        
        <div v-if="results.length" class="mt-4">
          <h3>Resultados:</h3>
          <div v-for="(result, index) in results" :key="index" class="mb-2">
            <v-chip :color="result.success ? 'success' : 'error'" size="small">
              {{ result.name }}: {{ result.success ? 'OK' : 'ERRO' }}
            </v-chip>
            <div v-if="result.error" class="text-caption text-error">
              {{ result.error }}
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

const loading = ref(false)
const message = ref('')
const alertType = ref('info')
const results = ref([])

const setupAdminSystem = async () => {
  loading.value = true
  message.value = ''
  results.value = []
  
  try {
    // 1. Criar view admin_users_overview
    const usersViewSQL = `
      CREATE OR REPLACE VIEW admin_users_overview AS
      SELECT 
          u.id as user_id,
          u.email,
          u.created_at as user_created_at,
          u.last_sign_in_at,
          u.raw_user_meta_data->>'org' as org,
          u.raw_user_meta_data->>'role' as user_role,
          
          -- Workspaces do usuário
          array_agg(DISTINCT w.name) FILTER (WHERE w.id IS NOT NULL) as workspaces,
          array_agg(DISTINCT wm.role) FILTER (WHERE wm.role IS NOT NULL) as workspace_roles,
          
          -- Estatísticas
          COUNT(DISTINCT wm.workspace_id) as total_workspaces,
          COUNT(DISTINCT CASE WHEN wm.role = 'owner' THEN wm.workspace_id END) as owned_workspaces,
          
          -- Status
          CASE 
              WHEN u.raw_user_meta_data->>'org' = 'hibrit' THEN 'hibrit_staff'
              WHEN COUNT(DISTINCT wm.workspace_id) > 0 THEN 'client_user'
              ELSE 'no_access'
          END as access_level
          
      FROM auth.users u
      LEFT JOIN workspace_members wm ON wm.user_id = u.id
      LEFT JOIN workspaces w ON w.id = wm.workspace_id
      GROUP BY u.id, u.email, u.created_at, u.last_sign_in_at, u.raw_user_meta_data
      ORDER BY u.created_at DESC;
    `
    
    const { error: usersViewError } = await supabase.rpc('exec_sql', { sql: usersViewSQL })
    results.value.push({
      name: 'admin_users_overview',
      success: !usersViewError,
      error: usersViewError?.message
    })
    
    // 2. Criar view admin_workspaces_overview
    const workspacesViewSQL = `
      CREATE OR REPLACE VIEW admin_workspaces_overview AS
      SELECT 
          w.id as workspace_id,
          w.name as workspace_name,
          w.slug as workspace_slug,
          w.created_at as workspace_created_at,
          w.updated_at as workspace_updated_at,
          
          -- Membros
          COUNT(DISTINCT wm.user_id) as total_members,
          COUNT(DISTINCT CASE WHEN wm.role = 'owner' THEN wm.user_id END) as owners_count,
          COUNT(DISTINCT CASE WHEN wm.role = 'manager' THEN wm.user_id END) as managers_count,
          COUNT(DISTINCT CASE WHEN wm.role = 'editor' THEN wm.user_id END) as editors_count,
          
          -- Atividade
          0 as total_content_items,
          COUNT(DISTINCT f.id) as total_funnels,
          COALESCE(MAX(f.updated_at), w.updated_at) as last_activity,
          
          -- Status
          CASE 
              WHEN COUNT(DISTINCT wm.user_id) = 0 THEN 'no_members'
              WHEN COALESCE(MAX(f.updated_at), w.updated_at) < CURRENT_DATE - INTERVAL '30 days' THEN 'inactive'
              ELSE 'active'
          END as status
          
      FROM workspaces w
      LEFT JOIN workspace_members wm ON wm.workspace_id = w.id
      LEFT JOIN funnels f ON f.workspace_id = w.id
      GROUP BY w.id, w.name, w.slug, w.created_at, w.updated_at
      ORDER BY w.created_at DESC;
    `
    
    const { error: workspacesViewError } = await supabase.rpc('exec_sql', { sql: workspacesViewSQL })
    results.value.push({
      name: 'admin_workspaces_overview',
      success: !workspacesViewError,
      error: workspacesViewError?.message
    })
    
    // Se as views foram criadas com sucesso
    const successCount = results.value.filter(r => r.success).length
    if (successCount === 2) {
      message.value = 'Sistema admin configurado com sucesso! Recarregue a página /admin'
      alertType.value = 'success'
    } else {
      message.value = 'Algumas operações falharam. Verifique os resultados.'
      alertType.value = 'warning'
    }
    
  } catch (error) {
    console.error('Erro:', error)
    message.value = `Erro: ${error.message}`
    alertType.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>