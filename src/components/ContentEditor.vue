<template>
  <!-- Brand Setup Wizard -->
  <BrandSetupWizard
    v-if="showBrandSetup"
    :workspace-id="currentWorkspaceId"
    :workspace-name="currentWorkspaceName"
    @completed="onBrandCreated"
    @skipped="onBrandSkipped"
  />
  
  <v-form @submit.prevent="saveContent">
    <!-- Campos básicos -->
    <v-text-field
      v-model="form.title"
      label="Título da Peça"
      variant="outlined"
      class="mb-4"
      required
    />
    
    <v-row>
      <v-col cols="6">
        <v-select
          v-model="form.pillar_id"
          :items="libraryStore.pillars"
          item-title="name"
          item-value="id"
          label="Pilar"
          variant="outlined"
          clearable
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="form.angle_id"
          :items="libraryStore.angles"
          item-title="name"
          item-value="id"
          label="Ângulo"
          variant="outlined"
          clearable
        />
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="6">
        <v-select
          v-model="form.format_id"
          :items="libraryStore.formats"
          item-title="name"
          item-value="id"
          label="Formato"
          variant="outlined"
          clearable
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="form.mold_id"
          :items="libraryStore.molds"
          item-title="name"
          item-value="id"
          label="Molde"
          variant="outlined"
          clearable
        />
      </v-col>
    </v-row>
    
    <!-- Campos de copy -->
    <v-textarea
      v-model="form.offer"
      label="Oferta/Hook"
      variant="outlined"
      rows="2"
      class="mb-4"
    />
    
    <v-textarea
      v-model="form.proof_anchor"
      label="Prova/Âncora"
      variant="outlined"
      rows="2"
      class="mb-4"
    />
    
    <v-text-field
      v-model="form.cta_text"
      label="Texto do CTA"
      variant="outlined"
      class="mb-4"
    />
    
    <v-text-field
      v-model="form.hashtags_cluster"
      label="Clusters de Hashtags"
      variant="outlined"
      class="mb-4"
    />
    
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="form.utm_campaign"
          label="UTM Campaign"
          variant="outlined"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="form.utm_content"
          label="UTM Content"
          variant="outlined"
        />
      </v-col>
    </v-row>
    
    <v-text-field
      v-model="form.scheduled_date"
      label="Data de Agendamento"
      type="date"
      variant="outlined"
      class="mb-4"
    />
    
    <v-select
      v-model="form.status"
      :items="statusOptions"
      item-title="title"
      item-value="value"
      label="Status"
      variant="outlined"
      class="mb-6"
    />
    
    <!-- Ações -->
    <div class="d-flex gap-2">
      <v-btn
        color="info"
        prepend-icon="mdi-auto-fix"
        @click="autofillForm"
        variant="outlined"
      >
        Autopreencher
      </v-btn>
      
      <v-spacer />
      
      <v-btn
        variant="outlined"
        @click="$emit('cancel')"
      >
        Cancelar
      </v-btn>
      
      <v-btn
        color="primary"
        type="submit"
        :loading="saving"
        prepend-icon="mdi-content-save"
      >
        Salvar
      </v-btn>
    </div>
  </v-form>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useContentStore } from '@/stores/content'
import { useLibraryStore } from '@/stores/library'
import BrandSetupWizard from './BrandSetupWizard.vue'
import { supabase } from '@/lib/supabase'

const props = defineProps({
  item: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['saved', 'cancel'])

const contentStore = useContentStore()
const libraryStore = useLibraryStore()
const saving = ref(false)

// Brand setup state
const showBrandSetup = ref(false)
const currentWorkspaceId = ref(null)
const currentWorkspaceName = ref('')
const currentBrandId = ref(null)

const form = ref({
  title: '',
  pillar_id: null,
  angle_id: null,
  format_id: null,
  mold_id: null,
  offer: '',
  proof_anchor: '',
  cta_text: '',
  hashtags_cluster: '',
  utm_campaign: '',
  utm_content: '',
  scheduled_date: '',
  status: 'backlog'
})

const statusOptions = [
  { title: 'Backlog', value: 'backlog' },
  { title: 'Brief', value: 'brief' },
  { title: 'Copy', value: 'draft_copy' },
  { title: 'Design', value: 'design' },
  { title: 'Pronto', value: 'ready' },
  { title: 'Agendado', value: 'scheduled' },
  { title: 'Publicado', value: 'published' }
]

const autofillForm = () => {
  form.value.title = '5 Dicas Para Aumentar Suas Vendas no Instagram'
  form.value.offer = 'Você sabia que 90% dos empreendedores cometem este erro no Instagram?'
  form.value.proof_anchor = 'Mais de 1.000 alunos já aplicaram essa estratégia e aumentaram suas vendas em 300%'
  form.value.cta_text = 'Comente QUERO para receber o guia completo'
  form.value.hashtags_cluster = '#marketing #instagram #vendas #empreendedorismo #digitalmarketing'
  form.value.utm_campaign = 'instagram_post_vendas_q1_2024'
  form.value.utm_content = 'carrossel_5_dicas_vendas'
  
  // Selecionar opções aleatórias nos selects
  if (libraryStore.pillars?.length) {
    const randomPillar = libraryStore.pillars[Math.floor(Math.random() * libraryStore.pillars.length)]
    form.value.pillar_id = randomPillar.id
  }
  
  if (libraryStore.angles?.length) {
    const randomAngle = libraryStore.angles[Math.floor(Math.random() * libraryStore.angles.length)]
    form.value.angle_id = randomAngle.id
  }
  
  if (libraryStore.formats?.length) {
    const randomFormat = libraryStore.formats[Math.floor(Math.random() * libraryStore.formats.length)]
    form.value.format_id = randomFormat.id
  }
  
  if (libraryStore.molds?.length) {
    const randomMold = libraryStore.molds[Math.floor(Math.random() * libraryStore.molds.length)]
    form.value.mold_id = randomMold.id
  }
  
  // Data de agendamento para próxima semana
  const nextWeek = new Date()
  nextWeek.setDate(nextWeek.getDate() + 7)
  form.value.scheduled_date = nextWeek.toISOString().split('T')[0]
}

const checkBrandExists = async () => {
  // Pegar brand selecionado do ContextBar
  currentBrandId.value = window.getCurrentBrandId?.()
  
  if (currentBrandId.value) {
    // Já tem brand selecionado, não precisa do wizard
    console.log('Using selected brand:', currentBrandId.value)
    return
  }
  
  // Se não tem brand selecionado, verificar se existem brands
  const { data: brands } = await supabase
    .from('brands')
    .select('*')
    .limit(1)
  
  if (brands?.length > 0) {
    // Existem brands, usar o primeiro
    currentBrandId.value = brands[0].id
    console.log('Using first available brand:', brands[0].name)
  } else {
    // Não existem brands, mostrar wizard
    showBrandSetup.value = true
  }
}

const onBrandCreated = (brand) => {
  currentBrandId.value = brand.id
  showBrandSetup.value = false
  // Atualizar ContextBar
  window.dispatchEvent(new CustomEvent('brand-created', { detail: { brand } }))
}

const onBrandSkipped = () => {
  showBrandSetup.value = false
  // Criar brand básico automaticamente
  createBasicBrand()
}

const createBasicBrand = async () => {
  try {
    const { data: brand } = await supabase
      .from('brands')
      .insert({
        name: currentWorkspaceName.value || 'Minha Marca',
        slug: (currentWorkspaceName.value || 'minha-marca').toLowerCase().replace(/\s+/g, '-'),
        workspace_id: currentWorkspaceId.value,
        settings: { segment: 'Outro', primaryColor: '#1976D2' }
      })
      .select()
      .single()
    
    currentBrandId.value = brand.id
    window.dispatchEvent(new CustomEvent('brand-created', { detail: { brand } }))
  } catch (error) {
    console.error('Error creating basic brand:', error)
  }
}

const saveContent = async () => {
  saving.value = true
  
  try {
    // Garantir que temos um brand_id
    const brandId = currentBrandId.value || window.getCurrentBrandId?.()
    
    if (!brandId) {
      console.error('No brand selected')
      return
    }
    
    if (props.item) {
      // Editar item existente
      await contentStore.updateItem(props.item.id, form.value)
    } else {
      // Criar novo item
      await contentStore.createItem({
        ...form.value,
        brand_id: brandId,
        channel: 'instagram'
      })
    }
    
    emit('saved')
  } catch (error) {
    console.error('Error saving content:', error)
  } finally {
    saving.value = false
  }
}

// Preencher form quando item muda
watch(() => props.item, (newItem) => {
  if (newItem) {
    Object.assign(form.value, newItem)
  } else {
    // Reset form for new item
    form.value = {
      title: '',
      pillar_id: null,
      angle_id: null,
      format_id: null,
      mold_id: null,
      offer: '',
      proof_anchor: '',
      cta_text: '',
      hashtags_cluster: '',
      utm_campaign: '',
      utm_content: '',
      scheduled_date: '',
      status: 'backlog'
    }
  }
}, { immediate: true })

onMounted(async () => {
  await Promise.all([
    libraryStore.loadAll(),
    checkBrandExists()
  ])
})
</script>