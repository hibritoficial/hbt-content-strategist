<template>
  <v-dialog v-model="dialog" max-width="600" persistent>
    <v-card>
      <v-card-title class="text-h5 d-flex align-center">
        <v-icon class="mr-3" color="primary">mdi-palette</v-icon>
        Configurar sua Marca
      </v-card-title>
      
      <v-card-text>
        <p class="text-subtitle-1 mb-6">
          Vamos configurar sua marca para personalizar a experiência de criação de conteúdo.
        </p>
        
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="brandData.name"
            label="Nome da Marca"
            variant="outlined"
            :rules="[v => !!v || 'Nome é obrigatório']"
            class="mb-4"
            prepend-inner-icon="mdi-store"
          />
          
          <v-select
            v-model="brandData.segment"
            :items="segments"
            label="Segmento"
            variant="outlined"
            class="mb-4"
            prepend-inner-icon="mdi-tag"
          />
          
          <div class="mb-4">
            <v-label class="mb-2">Cor Principal da Marca</v-label>
            <div class="d-flex align-center gap-3">
              <v-btn
                v-for="color in suggestedColors"
                :key="color"
                :color="color"
                size="large"
                icon
                @click="brandData.primaryColor = color"
                :variant="brandData.primaryColor === color ? 'elevated' : 'flat'"
              >
                <v-icon v-if="brandData.primaryColor === color">mdi-check</v-icon>
              </v-btn>
              <v-text-field
                v-model="brandData.primaryColor"
                type="color"
                hide-details
                density="compact"
                style="max-width: 60px;"
              />
            </div>
          </div>
          
          <v-textarea
            v-model="brandData.description"
            label="Descrição da Marca (opcional)"
            variant="outlined"
            rows="2"
            class="mb-4"
            prepend-inner-icon="mdi-text"
          />
        </v-form>
      </v-card-text>
      
      <v-card-actions class="px-6 pb-6">
        <v-spacer />
        <v-btn
          variant="outlined"
          @click="skipSetup"
        >
          Pular por Agora
        </v-btn>
        <v-btn
          color="primary"
          :disabled="!valid"
          :loading="saving"
          @click="saveBrand"
        >
          Criar Marca
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'

const props = defineProps({
  workspaceId: String,
  workspaceName: String
})

const emit = defineEmits(['completed', 'skipped'])

const dialog = ref(true)
const valid = ref(false)
const saving = ref(false)
const form = ref(null)

const brandData = ref({
  name: props.workspaceName || '',
  segment: '',
  primaryColor: '#1976D2',
  description: ''
})

const segments = [
  'E-commerce',
  'Educação',
  'Saúde & Bem-estar',
  'Tecnologia',
  'Consultoria',
  'Alimentação',
  'Moda & Beleza',
  'Imobiliário',
  'Serviços Financeiros',
  'Entretenimento',
  'Outro'
]

const suggestedColors = [
  '#1976D2', // Blue
  '#388E3C', // Green
  '#F57C00', // Orange
  '#7B1FA2', // Purple
  '#D32F2F', // Red
  '#0097A7', // Teal
  '#5D4037', // Brown
  '#616161'  // Grey
]

const saveBrand = async () => {
  if (!form.value.validate()) return
  
  saving.value = true
  try {
    // Criar brand
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .insert({
        name: brandData.value.name,
        slug: brandData.value.name.toLowerCase().replace(/\s+/g, '-'),
        workspace_id: props.workspaceId,
        settings: {
          segment: brandData.value.segment,
          primaryColor: brandData.value.primaryColor,
          description: brandData.value.description
        }
      })
      .select()
      .single()
    
    if (brandError) throw brandError
    
    emit('completed', brand)
    dialog.value = false
  } catch (error) {
    console.error('Error creating brand:', error)
  } finally {
    saving.value = false
  }
}

const skipSetup = () => {
  emit('skipped')
  dialog.value = false
}
</script>