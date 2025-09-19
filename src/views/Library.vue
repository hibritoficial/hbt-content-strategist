<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center mb-6">
          <h1 class="text-h4">Biblioteca</h1>
          <div class="d-flex gap-2">
            <v-btn
              color="warning"
              prepend-icon="mdi-database-remove"
              @click="cleanDuplicates"
              :loading="cleaning"
            >
              Limpar Duplicatas
            </v-btn>
            <v-btn
              color="success"
              prepend-icon="mdi-database-plus"
              @click="seedInitialData"
              :loading="seeding"
            >
              Popular Dados Iniciais
            </v-btn>
          </div>
        </div>
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
            :items="libraryStore.pillars"
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
            :items="libraryStore.angles"
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
            :items="libraryStore.molds"
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
import { useLibraryStore } from '@/stores/library'
import { seedLibraryData } from '@/utils/seedData'
import { cleanDuplicateData } from '@/utils/cleanDuplicates'

const activeTab = ref('pillars')
const dialog = ref(false)
const dialogType = ref('')
const editingItem = ref(null)
const seeding = ref(false)
const cleaning = ref(false)

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

const libraryStore = useLibraryStore()

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
  try {
    const data = { ...dialogForm }
    
    if (!editingItem.value) {
      // Criar novo
      if (dialogType.value === 'pillar') {
        await libraryStore.createPillar(data)
      } else if (dialogType.value === 'angle') {
        await libraryStore.createAngle(data)
      } else if (dialogType.value === 'mold') {
        await libraryStore.createMold(data)
      } else if (dialogType.value === 'hook') {
        // Adicionar ao array local
        const newId = Math.max(...hooks.value.map(h => h.id)) + 1
        hooks.value.unshift({ id: newId, ...data })
      } else if (dialogType.value === 'hashtag') {
        // Adicionar ao array local
        const newId = Math.max(...hashtagClusters.value.map(h => h.id)) + 1
        hashtagClusters.value.unshift({ id: newId, ...data })
      } else if (dialogType.value === 'cta') {
        // Adicionar ao array local
        const newId = Math.max(...ctaKeywords.value.map(c => c.id)) + 1
        ctaKeywords.value.unshift({ id: newId, ...data })
      }
    } else {
      // Editar existente
      if (dialogType.value === 'hook') {
        const index = hooks.value.findIndex(h => h.id === editingItem.value.id)
        if (index > -1) Object.assign(hooks.value[index], data)
      } else if (dialogType.value === 'hashtag') {
        const index = hashtagClusters.value.findIndex(h => h.id === editingItem.value.id)
        if (index > -1) Object.assign(hashtagClusters.value[index], data)
      } else if (dialogType.value === 'cta') {
        const index = ctaKeywords.value.findIndex(c => c.id === editingItem.value.id)
        if (index > -1) Object.assign(ctaKeywords.value[index], data)
      }
    }
    
    dialog.value = false
  } catch (error) {
    console.error('Erro ao salvar:', error.message)
  }
}



const deleteItem = async (type, id) => {
  if (!confirm('Tem certeza que deseja excluir este item?')) {
    return
  }
  
  try {
    let result
    if (type === 'pillar') {
      result = await libraryStore.deletePillar(id)
    } else if (type === 'angle') {
      result = await libraryStore.deleteAngle(id)
    } else if (type === 'mold') {
      result = await libraryStore.deleteMold(id)
    } else if (type === 'hook') {
      // Remover do array local (dados estáticos)
      const index = hooks.value.findIndex(h => h.id === id)
      if (index > -1) {
        hooks.value.splice(index, 1)
        result = { success: true }
      }
    } else if (type === 'hashtag') {
      // Remover do array local (dados estáticos)
      const index = hashtagClusters.value.findIndex(h => h.id === id)
      if (index > -1) {
        hashtagClusters.value.splice(index, 1)
        result = { success: true }
      }
    } else if (type === 'cta') {
      // Remover do array local (dados estáticos)
      const index = ctaKeywords.value.findIndex(c => c.id === id)
      if (index > -1) {
        ctaKeywords.value.splice(index, 1)
        result = { success: true }
      }
    }
    
    if (result?.success) {
      alert('Item excluído com sucesso!')
    } else {
      alert('Erro ao excluir item: ' + (result?.error?.message || 'Erro desconhecido'))
    }
  } catch (error) {
    console.error('Erro ao excluir:', error)
    alert('Erro ao excluir item')
  }
}

const previewMold = (mold) => {
  console.log('Previewing mold:', mold)
}

const seedInitialData = async () => {
  seeding.value = true
  try {
    const result = await seedLibraryData()
    await libraryStore.loadAll()
    
    let message = 'Resultados:\n'
    message += `Pilares: ${result.results.pillars}\n`
    message += `Ângulos: ${result.results.angles}\n`
    message += `Formatos: ${result.results.formats}\n`
    message += `Moldes: ${result.results.molds}\n`
    
    if (result.errors.length > 0) {
      message += '\nErros:\n' + result.errors.join('\n')
    }
    
    alert(message)
  } catch (error) {
    console.error('Erro:', error)
    alert('Erro ao inserir dados iniciais')
  } finally {
    seeding.value = false
  }
}

const cleanDuplicates = async () => {
  if (!confirm('Tem certeza que deseja remover dados duplicados? Esta ação não pode ser desfeita.')) {
    return
  }
  
  cleaning.value = true
  try {
    const result = await cleanDuplicateData()
    await libraryStore.loadAll()
    
    let message = 'Limpeza concluída:\n'
    message += `Pilares: ${result.results.pillars}\n`
    message += `Ângulos: ${result.results.angles}\n`
    message += `Formatos: ${result.results.formats}\n`
    message += `Moldes: ${result.results.molds}\n`
    
    if (result.errors.length > 0) {
      message += '\nErros:\n' + result.errors.join('\n')
    }
    
    alert(message)
  } catch (error) {
    console.error('Erro:', error)
    alert('Erro ao limpar duplicatas')
  } finally {
    cleaning.value = false
  }
}

onMounted(() => {
  libraryStore.loadAll()
})
</script>