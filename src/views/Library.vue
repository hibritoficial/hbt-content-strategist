<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-6">Biblioteca</h1>
      </v-col>
    </v-row>

    <v-tabs v-model="activeTab" color="primary">
      <v-tab value="pillars">Pilares</v-tab>
      <v-tab value="angles">Ângulos</v-tab>
      <v-tab value="molds">Moldes</v-tab>
      <v-tab value="hooks">Hooks</v-tab>
      <v-tab value="hashtags">Hashtags</v-tab>
      <v-tab value="cta">CTAs</v-tab>
    </v-tabs>

    <v-window v-model="activeTab" class="mt-4">
      <!-- Pilares -->
      <v-window-item value="pillars">
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            <span>Pilares de Conteúdo</span>
            <v-btn color="primary" prepend-icon="mdi-plus" @click="openDialog('pillar')">
              Novo Pilar
            </v-btn>
          </v-card-title>
          <v-data-table
            :headers="pillarHeaders"
            :items="pillars"
            class="elevation-1"
          >
            <template #item.actions="{ item }">
              <v-btn icon="mdi-pencil" size="small" @click="editItem('pillar', item)" />
              <v-btn icon="mdi-delete" size="small" @click="deleteItem('pillar', item.id)" />
            </template>
          </v-data-table>
        </v-card>
      </v-window-item>

      <!-- Ângulos -->
      <v-window-item value="angles">
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            <span>Ângulos de Abordagem</span>
            <v-btn color="primary" prepend-icon="mdi-plus" @click="openDialog('angle')">
              Novo Ângulo
            </v-btn>
          </v-card-title>
          <v-data-table
            :headers="angleHeaders"
            :items="angles"
            class="elevation-1"
          >
            <template #item.actions="{ item }">
              <v-btn icon="mdi-pencil" size="small" @click="editItem('angle', item)" />
              <v-btn icon="mdi-delete" size="small" @click="deleteItem('angle', item.id)" />
            </template>
          </v-data-table>
        </v-card>
      </v-window-item>

      <!-- Moldes -->
      <v-window-item value="molds">
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            <span>Moldes LEGO</span>
            <v-btn color="primary" prepend-icon="mdi-plus" @click="openDialog('mold')">
              Novo Molde
            </v-btn>
          </v-card-title>
          <v-data-table
            :headers="moldHeaders"
            :items="molds"
            class="elevation-1"
          >
            <template #item.actions="{ item }">
              <v-btn icon="mdi-eye" size="small" @click="previewMold(item)" />
              <v-btn icon="mdi-pencil" size="small" @click="editItem('mold', item)" />
              <v-btn icon="mdi-delete" size="small" @click="deleteItem('mold', item.id)" />
            </template>
          </v-data-table>
        </v-card>
      </v-window-item>

      <!-- Hooks -->
      <v-window-item value="hooks">
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            <span>Biblioteca de Hooks</span>
            <v-btn color="primary" prepend-icon="mdi-plus" @click="openDialog('hook')">
              Novo Hook
            </v-btn>
          </v-card-title>
          <v-data-table
            :headers="hookHeaders"
            :items="hooks"
            class="elevation-1"
          >
            <template #item.examples="{ item }">
              <v-chip-group>
                <v-chip
                  v-for="example in item.examples.slice(0, 2)"
                  :key="example"
                  size="small"
                  variant="outlined"
                >
                  {{ example }}
                </v-chip>
              </v-chip-group>
            </template>
            <template #item.actions="{ item }">
              <v-btn icon="mdi-pencil" size="small" @click="editItem('hook', item)" />
              <v-btn icon="mdi-delete" size="small" @click="deleteItem('hook', item.id)" />
            </template>
          </v-data-table>
        </v-card>
      </v-window-item>

      <!-- Hashtags -->
      <v-window-item value="hashtags">
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            <span>Clusters de Hashtags</span>
            <v-btn color="primary" prepend-icon="mdi-plus" @click="openDialog('hashtag')">
              Novo Cluster
            </v-btn>
          </v-card-title>
          <v-data-table
            :headers="hashtagHeaders"
            :items="hashtagClusters"
            class="elevation-1"
          >
            <template #item.tags="{ item }">
              <v-chip-group>
                <v-chip
                  v-for="tag in item.tags.slice(0, 3)"
                  :key="tag"
                  size="small"
                  variant="outlined"
                >
                  {{ tag }}
                </v-chip>
                <v-chip v-if="item.tags.length > 3" size="small" variant="text">
                  +{{ item.tags.length - 3 }}
                </v-chip>
              </v-chip-group>
            </template>
            <template #item.actions="{ item }">
              <v-btn icon="mdi-pencil" size="small" @click="editItem('hashtag', item)" />
              <v-btn icon="mdi-delete" size="small" @click="deleteItem('hashtag', item.id)" />
            </template>
          </v-data-table>
        </v-card>
      </v-window-item>

      <!-- CTAs -->
      <v-window-item value="cta">
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            <span>Palavras-chave CTA</span>
            <v-btn color="primary" prepend-icon="mdi-plus" @click="openDialog('cta')">
              Nova Palavra-chave
            </v-btn>
          </v-card-title>
          <v-data-table
            :headers="ctaHeaders"
            :items="ctaKeywords"
            class="elevation-1"
          >
            <template #item.actions="{ item }">
              <v-btn icon="mdi-pencil" size="small" @click="editItem('cta', item)" />
              <v-btn icon="mdi-delete" size="small" @click="deleteItem('cta', item.id)" />
            </template>
          </v-data-table>
        </v-card>
      </v-window-item>
    </v-window>

    <!-- Dialog para edição -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          {{ editingItem ? 'Editar' : 'Novo' }} {{ getDialogTitle() }}
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <!-- Campos dinâmicos baseados no tipo -->
            <template v-if="dialogType === 'pillar' || dialogType === 'angle'">
              <v-text-field
                v-model="dialogForm.name"
                label="Nome"
                :rules="[rules.required]"
                variant="outlined"
                class="mb-4"
              />
              <v-textarea
                v-model="dialogForm.description"
                label="Descrição"
                variant="outlined"
                rows="3"
              />
            </template>

            <template v-else-if="dialogType === 'mold'">
              <v-text-field
                v-model="dialogForm.name"
                label="Nome do Molde"
                :rules="[rules.required]"
                variant="outlined"
                class="mb-4"
              />
              <v-text-field
                v-model="dialogForm.slug"
                label="Slug"
                :rules="[rules.required]"
                variant="outlined"
                class="mb-4"
              />
              <v-text-field
                v-model="dialogForm.slides"
                label="Número de Slides"
                type="number"
                variant="outlined"
                class="mb-4"
              />
              <v-textarea
                v-model="dialogForm.description"
                label="Descrição"
                variant="outlined"
                rows="3"
              />
            </template>

            <template v-else-if="dialogType === 'hook'">
              <v-text-field
                v-model="dialogForm.pattern"
                label="Padrão do Hook"
                :rules="[rules.required]"
                variant="outlined"
                class="mb-4"
              />
              <v-combobox
                v-model="dialogForm.examples"
                label="Exemplos"
                multiple
                chips
                variant="outlined"
              />
            </template>

            <template v-else-if="dialogType === 'hashtag'">
              <v-select
                v-model="dialogForm.cluster"
                :items="['amplas', 'nicho', 'branded']"
                label="Tipo de Cluster"
                :rules="[rules.required]"
                variant="outlined"
                class="mb-4"
              />
              <v-combobox
                v-model="dialogForm.tags"
                label="Hashtags"
                multiple
                chips
                variant="outlined"
              />
            </template>

            <template v-else-if="dialogType === 'cta'">
              <v-text-field
                v-model="dialogForm.keyword"
                label="Palavra-chave"
                :rules="[rules.required]"
                variant="outlined"
                class="mb-4"
              />
              <v-textarea
                v-model="dialogForm.automation_response"
                label="Resposta Automática"
                variant="outlined"
                rows="3"
                class="mb-4"
              />
              <v-text-field
                v-model="dialogForm.destination_tag"
                label="Tag de Destino"
                variant="outlined"
              />
            </template>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="saveItem">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

const activeTab = ref('pillars')
const dialog = ref(false)
const dialogType = ref('')
const editingItem = ref(null)
const loading = ref(false)

const dialogForm = reactive({})

const rules = {
  required: value => !!value || 'Campo obrigatório'
}

// Headers para as tabelas
const pillarHeaders = [
  { title: 'Nome', key: 'name' },
  { title: 'Descrição', key: 'description' },
  { title: 'Ações', key: 'actions', sortable: false }
]

const angleHeaders = [
  { title: 'Nome', key: 'name' },
  { title: 'Descrição', key: 'description' },
  { title: 'Ações', key: 'actions', sortable: false }
]

const moldHeaders = [
  { title: 'Nome', key: 'name' },
  { title: 'Slug', key: 'slug' },
  { title: 'Slides', key: 'slides' },
  { title: 'Ações', key: 'actions', sortable: false }
]

const hookHeaders = [
  { title: 'Padrão', key: 'pattern' },
  { title: 'Exemplos', key: 'examples' },
  { title: 'Ações', key: 'actions', sortable: false }
]

const hashtagHeaders = [
  { title: 'Cluster', key: 'cluster' },
  { title: 'Tags', key: 'tags' },
  { title: 'Ações', key: 'actions', sortable: false }
]

const ctaHeaders = [
  { title: 'Palavra-chave', key: 'keyword' },
  { title: 'Resposta', key: 'automation_response' },
  { title: 'Tag', key: 'destination_tag' },
  { title: 'Ações', key: 'actions', sortable: false }
]

// Dados do Supabase
const pillars = ref([])
const angles = ref([])
const molds = ref([])

// Carregar dados do Supabase
const loadPillars = async () => {
  const { data, error } = await supabase.from('pillars').select('*').order('name')
  if (!error) pillars.value = data || []
}

const loadAngles = async () => {
  const { data, error } = await supabase.from('angles').select('*').order('name')
  if (!error) angles.value = data || []
}

const loadMolds = async () => {
  const { data, error } = await supabase.from('molds').select('*').order('name')
  if (!error) molds.value = data || []
}

const hooks = ref([
  { id: 1, pattern: 'Você sabia que...', examples: ['Você sabia que 90% das pessoas...', 'Você sabia que existe uma forma...'] },
  { id: 2, pattern: 'O segredo para...', examples: ['O segredo para ter sucesso...', 'O segredo para crescer no Instagram...'] },
  { id: 3, pattern: 'Pare tudo e veja isso...', examples: ['Pare tudo e veja essa dica...', 'Pare tudo e descubra como...'] }
])

const hashtagClusters = ref([
  { id: 1, cluster: 'amplas', tags: ['#marketing', '#digital', '#negócios', '#empreendedorismo'] },
  { id: 2, cluster: 'nicho', tags: ['#instagram', '#socialmedia', '#content', '#estrategia'] },
  { id: 3, cluster: 'branded', tags: ['#hibrit', '#contentstrategist', '#resultados'] }
])

const ctaKeywords = ref([
  { id: 1, keyword: 'SAIBA_MAIS', automation_response: 'Obrigado pelo interesse! Aqui está o link...', destination_tag: 'interessados' },
  { id: 2, keyword: 'ACESSE_LINK', automation_response: 'Link enviado! Confira sua DM...', destination_tag: 'leads' },
  { id: 3, keyword: 'COMENTE_AQUI', automation_response: 'Obrigado pelo comentário!', destination_tag: 'engajados' }
])

const getDialogTitle = () => {
  const titles = {
    pillar: 'Pilar',
    angle: 'Ângulo',
    mold: 'Molde',
    hook: 'Hook',
    hashtag: 'Cluster de Hashtags',
    cta: 'Palavra-chave CTA'
  }
  return titles[dialogType.value] || ''
}

const openDialog = (type, item = null) => {
  dialogType.value = type
  editingItem.value = item
  
  // Limpar formulário
  Object.keys(dialogForm).forEach(key => delete dialogForm[key])
  
  // Preencher com dados do item se estiver editando
  if (item) {
    Object.assign(dialogForm, { ...item })
  }
  
  dialog.value = true
}

const editItem = (type, item) => {
  openDialog(type, item)
}

const saveItem = async () => {
  loading.value = true
  try {
    const table = getTableName(dialogType.value)
    const data = { ...dialogForm }
    
    if (editingItem.value) {
      // Editar
      const { error } = await supabase
        .from(table)
        .update(data)
        .eq('id', editingItem.value.id)
      
      if (error) throw error
    } else {
      // Criar novo
      const { error } = await supabase
        .from(table)
        .insert([data])
      
      if (error) throw error
    }
    
    // Recarregar dados
    await loadData()
    dialog.value = false
    
  } catch (error) {
    console.error('Erro ao salvar:', error.message)
  } finally {
    loading.value = false
  }
}

const getTableName = (type) => {
  const tables = {
    pillar: 'pillars',
    angle: 'angles',
    mold: 'molds'
  }
  return tables[type]
}

const loadData = async () => {
  await Promise.all([
    loadPillars(),
    loadAngles(),
    loadMolds()
  ])
}

const deleteItem = (type, id) => {
  if (confirm('Tem certeza que deseja excluir este item?')) {
    // TODO: Implementar exclusão real
    console.log('Deleting:', type, id)
  }
}

const previewMold = (mold) => {
  console.log('Previewing mold:', mold)
}

onMounted(() => {
  loadData()
})
</script>