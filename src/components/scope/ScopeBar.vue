<template>
  <v-toolbar 
    density="compact" 
    color="grey-lighten-4" 
    class="scope-bar px-4"
    height="48"
  >
    <div class="d-flex align-center gap-4">
      <!-- Escopo (apenas para Hibrit) -->
      <div v-if="scopeStore.isHibrit" class="d-flex align-center gap-2">
        <span class="text-caption text-grey-darken-2">Escopo:</span>
        <v-chip-group 
          v-model="selectedScope" 
          mandatory 
          variant="flat"
          @update:model-value="handleScopeChange"
        >
          <v-chip 
            value="portfolio" 
            size="small"
            :color="scopeStore.isPortfolioScope ? 'primary' : 'grey-lighten-2'"
          >
            <v-icon start>mdi-view-dashboard</v-icon>
            Portfólio
          </v-chip>
          <v-chip 
            value="client" 
            size="small"
            :color="scopeStore.isClientScope ? 'primary' : 'grey-lighten-2'"
          >
            <v-icon start>mdi-domain</v-icon>
            Cliente
          </v-chip>
        </v-chip-group>
      </div>

      <v-divider v-if="scopeStore.isHibrit" vertical />

      <!-- Cliente atual -->
      <div class="d-flex align-center gap-2">
        <span class="text-caption text-grey-darken-2">Cliente:</span>
        
        <!-- Para Hibrit: dropdown quando em escopo Cliente -->
        <v-btn
          v-if="scopeStore.isHibrit && scopeStore.isClientScope"
          variant="outlined"
          size="small"
          :disabled="scopeStore.isPortfolioScope"
          @click="openClientSelector"
          class="text-none"
        >
          <v-icon start>mdi-domain</v-icon>
          {{ scopeStore.selectedClient?.workspace_name || 'Selecionar...' }}
          <v-icon end>mdi-chevron-down</v-icon>
        </v-btn>

        <!-- Para Cliente: apenas exibição -->
        <v-chip
          v-else-if="scopeStore.isClient && scopeStore.selectedClient"
          size="small"
          variant="flat"
          color="primary"
        >
          <v-icon start>mdi-domain</v-icon>
          {{ scopeStore.selectedClient.workspace_name }}
        </v-chip>

        <!-- Placeholder quando em Portfólio -->
        <v-chip
          v-else-if="scopeStore.isPortfolioScope"
          size="small"
          variant="outlined"
          disabled
        >
          <v-icon start>mdi-view-dashboard</v-icon>
          Todos os clientes
        </v-chip>
      </div>
    </div>

    <!-- Client Selector Modal -->
    <v-dialog v-model="clientSelectorOpen" fullscreen>
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Selecionar Cliente</v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="clientSelectorOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="pa-6">
          <v-text-field
            v-model="clientSearch"
            label="Buscar cliente..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            clearable
            class="mb-4"
          />

          <v-row>
            <v-col
              v-for="client in filteredClients"
              :key="client.workspace_id"
              cols="12"
              md="6"
              lg="4"
            >
              <v-card
                :color="scopeStore.selectedClient?.workspace_id === client.workspace_id ? 'primary' : ''"
                :variant="scopeStore.selectedClient?.workspace_id === client.workspace_id ? 'flat' : 'outlined'"
                @click="selectClient(client)"
                class="cursor-pointer"
              >
                <v-card-text class="text-center pa-4">
                  <v-avatar size="48" class="mb-2">
                    <v-icon size="24">mdi-domain</v-icon>
                  </v-avatar>
                  <div class="text-h6">{{ client.workspace_name }}</div>
                  <div class="text-caption text-grey-darken-1">{{ client.workspace_slug }}</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useScopeStore } from '@/stores/scope'

const scopeStore = useScopeStore()

const selectedScope = ref(scopeStore.currentScope)
const clientSelectorOpen = ref(false)
const clientSearch = ref('')

// Watch for scope changes from store
watch(() => scopeStore.currentScope, (newScope) => {
  selectedScope.value = newScope
})

// Filtered clients for search
const filteredClients = computed(() => {
  if (!clientSearch.value) return scopeStore.availableClients
  
  const search = clientSearch.value.toLowerCase()
  return scopeStore.availableClients.filter(client => 
    client.workspace_name.toLowerCase().includes(search) ||
    client.workspace_slug.toLowerCase().includes(search)
  )
})

const handleScopeChange = (scope) => {
  if (scope === 'portfolio') {
    scopeStore.switchToPortfolio()
  } else if (scope === 'client') {
    if (scopeStore.selectedClient) {
      scopeStore.switchToClient(scopeStore.selectedClient)
    } else {
      openClientSelector()
    }
  }
}

const openClientSelector = () => {
  clientSelectorOpen.value = true
  clientSearch.value = ''
}

const selectClient = (client) => {
  scopeStore.switchToClient(client)
  clientSelectorOpen.value = false
}
</script>

<style scoped>
.scope-bar {
  border-bottom: 1px solid rgba(0,0,0,0.12);
}

.cursor-pointer {
  cursor: pointer;
}

.gap-2 {
  gap: 8px;
}

.gap-4 {
  gap: 16px;
}
</style>