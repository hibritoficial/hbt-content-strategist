<template>
  <v-card class="context-bar" elevation="1">
    <v-card-text class="py-1 px-4">
      <div class="d-flex align-center">
        <span class="text-caption text-grey mr-2">Cliente:</span>
        
        <v-select
          v-model="selectedBrand"
          :items="brandOptions"
          item-title="name"
          item-value="id"
          variant="outlined"
          density="compact"
          hide-details
          class="scope-selector"
          prepend-inner-icon="mdi-account-circle"
        />
        
        <v-btn
          icon="mdi-refresh"
          size="small"
          variant="text"
          @click="loadBrands"
          class="ml-2"
          title="Atualizar lista de clientes"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { supabase } from '@/lib/supabase'

// Estado global simples - usando brands
const currentBrandId = ref(null)
const brands = ref([])

const brandOptions = computed(() => brands.value)

const selectedBrand = computed({
  get: () => currentBrandId.value,
  set: (value) => {
    currentBrandId.value = value
    // Emitir evento global para outras telas
    window.dispatchEvent(new CustomEvent('brand-changed', { 
      detail: { brandId: value } 
    }))
  }
})

const loadBrands = async () => {
  try {
    const { data, error } = await supabase
      .from('brands')
      .select('id, name, slug')
      .order('name')
    
    if (error) {
      console.error('Error loading brands:', error)
      return
    }
    
    // Forçar atualização completa
    brands.value = []
    await new Promise(resolve => setTimeout(resolve, 100))
    brands.value = data || []
    
    console.log('Brands updated:', brands.value.length, 'brands loaded')
    
    // Selecionar primeiro brand por padrão
    if (data?.length > 0 && !currentBrandId.value) {
      currentBrandId.value = data[0].id
    }
  } catch (error) {
    console.error('Error loading brands:', error)
  }
}

const handleBrandCreated = () => {
  console.log('Brand created, refreshing list...')
  loadBrands()
}

onMounted(() => {
  loadBrands()
  window.addEventListener('brand-created', handleBrandCreated)
  
  // Refresh brands every 30 seconds to catch changes
  const refreshInterval = setInterval(loadBrands, 30000)
  
  // Cleanup interval on unmount
  window.contextBarCleanup = () => clearInterval(refreshInterval)
})

onUnmounted(() => {
  window.removeEventListener('brand-created', handleBrandCreated)
  if (window.contextBarCleanup) {
    window.contextBarCleanup()
  }
})

// Expor globalmente para outras telas
window.getCurrentBrandId = () => currentBrandId.value
</script>

<style scoped>
.context-bar {
  border-radius: 0;
  border-bottom: 1px solid rgba(0,0,0,0.12);
  position: sticky;
  top: 0;
  z-index: 1;
}

.scope-selector {
  max-width: 300px;
  min-width: 200px;
}
</style>