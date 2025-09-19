<template>
  <v-app>
    <template v-if="!isLoginPage">
      <v-navigation-drawer
        v-model="drawer"
        rail
        permanent
        color="grey-lighten-5"
      >
        <v-list density="compact" nav>
          <!-- Negócio -->
          <v-list-subheader>NEGÓCIO</v-list-subheader>

          
          <!-- Marca & Marketing -->
          <v-list-subheader>MARCA & MARKETING</v-list-subheader>
          <v-list-item
            prepend-icon="mdi-library"
            title="Biblioteca"
            value="library"
            :to="{ name: 'Library' }"
          />
          <v-list-item
            prepend-icon="mdi-cog"
            title="Configurações"
            value="settings"
            :to="{ name: 'Settings' }"
          />
          
          <!-- Canais -->
          <v-list-subheader>CANAIS</v-list-subheader>
          <v-list-item
            prepend-icon="mdi-instagram"
            title="Instagram"
            value="instagram"
            :to="{ name: 'Instagram' }"
            color="primary"
          />
          <v-list-item
            prepend-icon="mdi-youtube"
            title="YouTube"
            value="youtube"
            :to="{ name: 'YouTube' }"
            disabled
          />
          <v-list-item
            prepend-icon="mdi-post"
            title="Blog"
            value="blog"
            :to="{ name: 'Blog' }"
            disabled
          />
        </v-list>
      </v-navigation-drawer>

      <v-app-bar color="white" elevation="1">
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        
        <v-btn
          icon="mdi-view-dashboard"
          :to="{ name: 'Dashboard' }"
          class="mr-2"
        />
        <v-btn
          icon="mdi-calendar"
          :to="{ name: 'Calendar' }"
          class="mr-2"
        />
        <v-btn
          icon="mdi-view-column"
          :to="{ name: 'Pipeline' }"
          class="mr-2"
        />
        <v-btn
          icon="mdi-library"
          :to="{ name: 'Library' }"
          class="mr-2"
        />
        <v-btn
          icon="mdi-chart-line"
          :to="{ name: 'Metrics' }"
          class="mr-2"
        />
        <v-btn
          icon="mdi-sitemap"
          :to="{ name: 'Flow' }"
          class="mr-2"
        />
        <v-btn
          icon="mdi-chart-sankey"
          :to="{ name: 'Funnels' }"
          class="mr-2"
        />
        
        <v-spacer />
        
        <!-- Command Bar -->
        <v-text-field
          v-model="searchQuery"
          prepend-inner-icon="mdi-magnify"
          placeholder="Buscar... (pressione /)"
          variant="outlined"
          density="compact"
          hide-details
          class="mx-4"
          style="max-width: 400px"
          @keydown="handleSearchKeydown"
        />
        
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          @click="createNew"
        >
          Novo (N)
        </v-btn>
        
        <v-btn
          color="secondary"
          prepend-icon="mdi-auto-fix"
          class="ml-2"
          @click="generateCopies"
        >
          Gerar 3 Copies
        </v-btn>
        
        <v-btn
          icon="mdi-help-circle-outline"
          @click="docsStore.toggle"
          class="ml-2"
        />
        
        <v-menu>
          <template #activator="{ props }">
            <v-btn
              icon="mdi-account-circle"
              v-bind="props"
              class="ml-4"
            />
          </template>
          <v-list>
            <v-list-item @click="signOut">
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </template>

    <v-main>
      <router-view />
    </v-main>

    <!-- Documentação -->
    <DocDock />

    <!-- Snackbar para feedback -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useDocsStore } from '@/stores/docs'
import { useKeyboardShortcuts } from '@/composables/useKeyboardShortcuts'
import { useDocHotspot } from '@/composables/useDocHotspot'
import DocDock from '@/components/docs/DocDock.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const docsStore = useDocsStore()

const drawer = ref(true)
const searchQuery = ref('')
const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
})

const isLoginPage = computed(() => route.name === 'Login')

const handleSearchKeydown = (event) => {
  if (event.key === 'Enter') {
    // Implementar busca global
    console.log('Searching for:', searchQuery.value)
  }
}

const createNew = () => {
  router.push({ name: 'Editor', params: { id: 'new' } })
}

const generateCopies = () => {
  // Implementar geração de copies
  showSnackbar('Gerando 3 variações...', 'info')
}

const signOut = async () => {
  await authStore.signOut()
  router.push('/login')
}

const showSnackbar = (text, color = 'success') => {
  snackbar.value = { show: true, text, color }
}

// Atalhos de teclado
useKeyboardShortcuts({
  'n': createNew,
  '/': () => document.querySelector('input[placeholder*="Buscar"]')?.focus(),
  'g+c': () => router.push({ name: 'Calendar' }),
  'g+p': () => router.push({ name: 'Pipeline' })
})

// Atalhos de documentação
useDocHotspot()

onMounted(async () => {
  await authStore.initialize()
})
</script>