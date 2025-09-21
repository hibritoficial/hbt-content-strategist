<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      width="280"
    >
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          :to="'/dashboard'"
        />
        
        <v-list-item
          prepend-icon="mdi-chart-sankey"
          title="Funnel Builder"
          :to="'/funnel-builder'"
        />
        
        <v-list-item
          prepend-icon="mdi-file-document-multiple"
          title="Editor"
          :to="'/editor'"
        />
        
        <v-list-item
          prepend-icon="mdi-view-column"
          title="Pipeline"
          :to="'/pipeline'"
        />
        
        <v-list-item
          prepend-icon="mdi-calendar"
          title="Calendário"
          :to="'/calendar'"
        />
        
        <v-list-item
          prepend-icon="mdi-library"
          title="Biblioteca"
          :to="'/library'"
        />
        
        <v-list-item
          prepend-icon="mdi-chart-line"
          title="Métricas"
          :to="'/metrics'"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar
      app
      clipped-left
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      
      <v-toolbar-title>HBT Content Strategist</v-toolbar-title>
      
      <v-spacer />
      
      <!-- Workspace Switcher -->
      <WorkspaceSwitcher v-if="workspaceStore.list.length > 0" />
      
      <v-btn icon @click="authStore.signOut">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useWorkspaceStore } from '@/stores/workspace'
import WorkspaceSwitcher from '@/components/workspace/WorkspaceSwitcher.vue'

const authStore = useAuthStore()
const workspaceStore = useWorkspaceStore()

const drawer = ref(true)

onMounted(async () => {
  await authStore.initialize()
  await workspaceStore.initialize()
})
</script>