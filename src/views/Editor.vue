<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center mb-6">
          <div>
            <h1 class="text-h4">Editor</h1>
            <p class="text-subtitle-1 text-grey-darken-1">
              {{ isNew ? 'Novo conteúdo' : currentItem?.title }}
            </p>
          </div>
          
          <!-- Barra de ações -->
          <div class="d-flex gap-2">
            <v-btn
              color="secondary"
              prepend-icon="mdi-auto-fix"
              @click="generateVariations"
            >
              Gerar 3 Variações
            </v-btn>
            <v-btn
              color="primary"
              prepend-icon="mdi-content-save"
              @click="saveContent"
              :loading="saving"
            >
              Salvar
            </v-btn>
            <v-menu>
              <template #activator="{ props }">
                <v-btn
                  :color="getStatusColor(form.status)"
                  prepend-icon="mdi-circle"
                  v-bind="props"
                >
                  {{ formatStatus(form.status) }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="status in statusOptions"
                  :key="status.value"
                  @click="form.status = status.value"
                >
                  <v-list-item-title>{{ status.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <!-- Left Panel - Brief & Copy -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Brief & Copy</v-card-title>
          <v-card-text>
            <!-- Campos básicos -->
            <v-text-field
              v-model="form.title"
              label="Título da Peça"
              variant="outlined"
              class="mb-4"
            />
            
            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="form.pillar_id"
                  :items="pillars"
                  item-title="name"
                  item-value="id"
                  label="Pilar"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="form.angle_id"
                  :items="angles"
                  item-title="name"
                  item-value="id"
                  label="Ângulo"
                  variant="outlined"
                />
              </v-col>
            </v-row>
            
            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="form.format_id"
                  :items="formats"
                  item-title="name"
                  item-value="id"
                  label="Formato"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="form.mold_id"
                  :items="molds"
                  item-title="name"
                  item-value="id"
                  label="Molde"
                  variant="outlined"
                />
              </v-col>
            </v-row>
            
            <!-- Campos de copy -->
            <v-textarea
              v-model="form.offer"
              label="Oferta"
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
            
            <v-row>
              <v-col cols="8">
                <v-text-field
                  v-model="form.cta_text"
                  label="Texto do CTA"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="form.cta_keyword_id"
                  :items="ctaKeywords"
                  item-title="keyword"
                  item-value="id"
                  label="Palavra-chave"
                  variant="outlined"
                />
              </v-col>
            </v-row>
            
            <v-text-field
              v-model="form.hashtags_cluster"
              label="Clusters de Hashtags"
              placeholder="amplas:nicho:branded"
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
            />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Right Panel - Preview -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Prévia do Molde</v-card-title>
          <v-card-text>
            <div v-if="selectedMold" class="preview-container">
              <!-- Carrossel Preview -->
              <div v-if="selectedMold.name === 'Carrossel 6x'" class="carousel-preview">
                <div class="carousel-slide" v-for="(slide, index) in 6" :key="index">
                  <div class="slide-number">{{ index + 1 }}/6</div>
                  <div class="slide-content">
                    <div v-if="index === 0" class="slide-hook">
                      <h3>{{ form.offer || 'Hook aqui' }}</h3>
                    </div>
                    <div v-else-if="index === 1" class="slide-why">
                      <h3>Por quê?</h3>
                      <p>{{ form.proof_anchor || 'Explicação aqui' }}</p>
                    </div>
                    <div v-else-if="index >= 2 && index <= 3" class="slide-steps">
                      <h3>Passo {{ index - 1 }}</h3>
                      <p>Conteúdo do passo</p>
                    </div>
                    <div v-else-if="index === 4" class="slide-proof">
                      <h3>Prova</h3>
                      <p>{{ form.proof_anchor || 'Prova social aqui' }}</p>
                    </div>
                    <div v-else class="slide-cta">
                      <h3>{{ form.cta_text || 'CTA aqui' }}</h3>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Reels Preview -->
              <div v-else-if="selectedMold.name === 'Reels'" class="reels-preview">
                <div class="reels-timeline">
                  <div class="timeline-item">
                    <span class="time">0-2s</span>
                    <span class="content">Hook: {{ form.offer || 'Hook aqui' }}</span>
                  </div>
                  <div class="timeline-item">
                    <span class="time">3-15s</span>
                    <span class="content">3 pontos principais</span>
                  </div>
                  <div class="timeline-item">
                    <span class="time">16-20s</span>
                    <span class="content">CTA: {{ form.cta_text || 'CTA aqui' }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Default Preview -->
              <div v-else class="default-preview">
                <div class="preview-placeholder">
                  <v-icon size="64">mdi-image</v-icon>
                  <p>Prévia do {{ selectedMold.name }}</p>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <v-icon size="64" color="grey">mdi-image-off</v-icon>
              <p class="text-grey">Selecione um molde para ver a prévia</p>
            </div>
          </v-card-text>
        </v-card>

        <!-- Sidebar de sugestões -->
        <v-card class="mt-4">
          <v-card-title>Sugestões</v-card-title>
          <v-card-text>
            <v-expansion-panels variant="accordion">
              <v-expansion-panel title="Hooks Sugeridos">
                <v-expansion-panel-text>
                  <v-chip
                    v-for="hook in suggestedHooks"
                    :key="hook.id"
                    class="ma-1"
                    size="small"
                    @click="form.offer = hook.pattern"
                  >
                    {{ hook.pattern }}
                  </v-chip>
                </v-expansion-panel-text>
              </v-expansion-panel>
              
              <v-expansion-panel title="Hashtags">
                <v-expansion-panel-text>
                  <div v-for="cluster in hashtagClusters" :key="cluster.id">
                    <v-chip-group>
                      <v-chip
                        v-for="tag in cluster.tags"
                        :key="tag"
                        size="small"
                        variant="outlined"
                      >
                        {{ tag }}
                      </v-chip>
                    </v-chip-group>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContentStore } from '@/stores/content'
import { useLibraryStore } from '@/stores/library'

const route = useRoute()
const router = useRouter()
const contentStore = useContentStore()

const saving = ref(false)
const isNew = computed(() => route.params.id === 'new')

const form = ref({
  title: '',
  pillar_id: null,
  angle_id: null,
  format_id: null,
  mold_id: null,
  offer: '',
  proof_anchor: '',
  cta_text: '',
  cta_keyword_id: null,
  hashtags_cluster: '',
  utm_campaign: '',
  utm_content: '',
  scheduled_date: '',
  status: 'backlog'
})

const currentItem = ref(null)

const libraryStore = useLibraryStore()
const { pillars, angles, formats, molds } = libraryStore

const ctaKeywords = ref([
  { id: 1, keyword: 'SAIBA_MAIS' },
  { id: 2, keyword: 'ACESSE_LINK' },
  { id: 3, keyword: 'COMENTE_AQUI' }
])

const statusOptions = [
  { title: 'Backlog', value: 'backlog' },
  { title: 'Brief', value: 'brief' },
  { title: 'Copy', value: 'draft_copy' },
  { title: 'Design', value: 'design' },
  { title: 'Pronto', value: 'ready' },
  { title: 'Agendado', value: 'scheduled' },
  { title: 'Publicado', value: 'published' }
]

const suggestedHooks = ref([
  { id: 1, pattern: 'Você sabia que...' },
  { id: 2, pattern: 'O segredo para...' },
  { id: 3, pattern: 'Pare tudo e veja isso...' }
])

const hashtagClusters = ref([
  { id: 1, cluster: 'amplas', tags: ['#marketing', '#digital', '#negócios'] },
  { id: 2, cluster: 'nicho', tags: ['#instagram', '#socialmedia', '#content'] },
  { id: 3, cluster: 'branded', tags: ['#hibrit', '#estrategia', '#resultados'] }
])

const selectedMold = computed(() => {
  return molds.value.find(m => m.id === form.value.mold_id)
})

const getStatusColor = (status) => {
  const colors = {
    backlog: 'grey',
    brief: 'blue',
    draft_copy: 'orange',
    design: 'purple',
    ready: 'green',
    scheduled: 'teal',
    published: 'success'
  }
  return colors[status] || 'grey'
}

const formatStatus = (status) => {
  const labels = {
    backlog: 'Backlog',
    brief: 'Brief',
    draft_copy: 'Copy',
    design: 'Design',
    ready: 'Pronto',
    scheduled: 'Agendado',
    published: 'Publicado'
  }
  return labels[status] || status
}

const saveContent = async () => {
  saving.value = true
  
  try {
    if (isNew.value) {
      const result = await contentStore.createItem({
        ...form.value,
        channel: 'instagram',
        brand_id: 1, // TODO: Get from auth store
        created_by: 1 // TODO: Get from auth store
      })
      
      if (result.success) {
        router.push(`/editor/${result.data.id}`)
      }
    } else {
      await contentStore.updateItem(route.params.id, form.value)
    }
  } catch (error) {
    console.error('Error saving content:', error)
  } finally {
    saving.value = false
  }
}

const generateVariations = () => {
  // TODO: Implementar geração de variações por IA
  console.log('Generating variations...')
}

const loadContent = async () => {
  if (!isNew.value) {
    // TODO: Carregar item específico
    const item = contentStore.items.find(i => i.id === parseInt(route.params.id))
    if (item) {
      currentItem.value = item
      Object.assign(form.value, item)
    }
  }
}

onMounted(async () => {
  await Promise.all([
    libraryStore.loadAll(),
    loadContent()
  ])
})

watch(() => route.params.id, loadContent)
</script>

<style scoped>
.preview-container {
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  min-height: 400px;
}

.carousel-preview {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.carousel-slide {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
  min-height: 120px;
  position: relative;
}

.slide-number {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 10px;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 2px 4px;
  border-radius: 2px;
}

.slide-content h3 {
  font-size: 12px;
  margin-bottom: 4px;
}

.slide-content p {
  font-size: 10px;
  color: #666;
}

.reels-preview {
  max-width: 300px;
  margin: 0 auto;
}

.timeline-item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.time {
  font-weight: bold;
  color: #666;
}

.default-preview,
.preview-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #666;
}
</style>