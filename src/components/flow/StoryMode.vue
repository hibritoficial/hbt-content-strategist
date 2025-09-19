<template>
  <v-dialog v-model="isActive" max-width="500" persistent>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>🎬 Tour HIBRIT STRATEGIST</span>
        <v-btn icon="mdi-close" size="small" @click="close" />
      </v-card-title>
      
      <v-card-text>
        <div class="text-center mb-4">
          <v-progress-linear
            :model-value="progress"
            color="primary"
            height="4"
            rounded
          />
          <div class="text-caption mt-1">
            Etapa {{ currentStep + 1 }} de {{ steps.length }}
          </div>
        </div>
        
        <div class="story-content">
          <div class="d-flex align-center mb-3">
            <v-avatar :color="currentStepData.color" size="40" class="mr-3">
              <span class="text-white font-weight-bold">{{ currentStepData.id.toUpperCase() }}</span>
            </v-avatar>
            <div>
              <h3>{{ currentStepData.title }}</h3>
              <div class="text-caption text-grey">{{ currentStepData.duration }}</div>
            </div>
          </div>
          
          <p class="text-body-2 mb-4">{{ currentStepData.description }}</p>
          
          <v-alert
            :color="currentStepData.color"
            variant="tonal"
            density="compact"
            class="mb-4"
          >
            <strong>💡 Dica Pro:</strong> {{ currentStepData.tip }}
          </v-alert>
          
          <div class="example-box">
            <div class="text-subtitle-2 mb-2">📝 Exemplo prático:</div>
            <div class="text-body-2 font-italic">{{ currentStepData.example }}</div>
          </div>
        </div>
      </v-card-text>
      
      <v-card-actions class="justify-space-between">
        <v-btn
          :disabled="currentStep === 0"
          variant="outlined"
          @click="previousStep"
        >
          Anterior
        </v-btn>
        
        <v-btn
          v-if="currentStep < steps.length - 1"
          color="primary"
          @click="nextStep"
        >
          Próximo
        </v-btn>
        
        <v-btn
          v-else
          color="success"
          @click="finish"
        >
          Finalizar Tour
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useFlowStore } from '@/stores/flow'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'highlight-node'])

const flowStore = useFlowStore()
const isActive = ref(props.modelValue)
const currentStep = ref(0)

const steps = [
  {
    id: 'pa',
    title: 'A) Seleção Rápida',
    duration: '5-10 min',
    color: 'blue',
    description: 'Escolha o recorte da peça: pilar, ângulo, formato e molde. Define a direção antes de escrever.',
    tip: 'Uma ideia clara no início economiza horas de retrabalho.',
    example: 'Pilar: Manejo | Ângulo: Tutorial | Molde: Carrossel 6x | CTA: "DM DOSAGEM"'
  },
  {
    id: 'pb', 
    title: 'B) IA: 3 Variações',
    duration: '10-15 min',
    color: 'purple',
    description: 'IA gera 3 versões de copy baseadas no brief. Produção rápida de rascunhos alinhados.',
    tip: 'Quanto melhor o brief, melhores as variações da IA.',
    example: 'Variação A: Técnica | Variação B: Benefícios | Variação C: Urgência'
  },
  {
    id: 'pc',
    title: 'C) Curadoria',
    duration: '15-20 min', 
    color: 'orange',
    description: 'Scorecard 6x2 avalia as variações. Escolha objetiva da melhor copy sem drama.',
    tip: 'Score ≥5/6 garante qualidade. Menos que isso, refaça.',
    example: 'Clareza: 2/2 | Relevância: 2/2 | CTA: 1/2 | Total: 5/6 ✅'
  },
  {
    id: 'pd',
    title: 'D) Montagem',
    duration: '20-30 min',
    color: 'green', 
    description: 'Encaixe o texto no molde visual. Arte consistente com tokens da marca.',
    tip: 'CTA deve estar visível e destacado em todos os slides.',
    example: 'S1: Hook | S2: Problema | S3-4: Solução | S5: Prova | S6: CTA'
  },
  {
    id: 'pe',
    title: 'E) Revisão CXA',
    duration: '10-15 min',
    color: 'teal',
    description: 'Checklist de continuidade: link, UTM, automação. Garante que a peça "aponta" para o próximo passo.',
    tip: 'Teste a automação antes de publicar. DM quebrada = lead perdido.',
    example: 'UTM: ?utm_campaign=manejo-tutorial | Automação: responde "DOSAGEM" ✅'
  },
  {
    id: 'pf',
    title: 'F) Publicação',
    duration: '5 min',
    color: 'indigo',
    description: 'Agendar com rastreabilidade. Tag de experimento para análise posterior.',
    tip: 'Publique em horários de maior engajamento da sua audiência.',
    example: 'Agendado: 19h | Tag: manejo-tutorial-reels-2025-01-20'
  },
  {
    id: 'pg',
    title: 'G) Loop Métricas',
    duration: '24-72h depois',
    color: 'red',
    description: 'Colete métricas e decida próxima ação. Aprendizado alimenta próxima rodada.',
    tip: 'Registre o que funcionou. Padrões emergem com o tempo.',
    example: 'Save: 8.2% | DMs: 47 | Ação: Testar novo hook similar'
  }
]

const currentStepData = computed(() => steps[currentStep.value])
const progress = computed(() => ((currentStep.value + 1) / steps.length) * 100)

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
    highlightCurrentNode()
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
    highlightCurrentNode()
  }
}

const highlightCurrentNode = () => {
  emit('highlight-node', currentStepData.value.id)
}

const finish = () => {
  close()
}

const close = () => {
  isActive.value = false
  emit('update:modelValue', false)
  emit('highlight-node', null)
}

watch(() => props.modelValue, (val) => {
  isActive.value = val
  if (val) {
    currentStep.value = 0
    highlightCurrentNode()
  }
})

watch(isActive, (val) => {
  if (val) {
    highlightCurrentNode()
  }
})
</script>

<style scoped>
.story-content {
  min-height: 200px;
}

.example-box {
  background: rgba(0,0,0,0.05);
  padding: 12px;
  border-radius: 8px;
  border-left: 4px solid #1976d2;
}
</style>