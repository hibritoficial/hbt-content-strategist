<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-6">Configurações do Workspace</h1>
      </v-col>
    </v-row>

    <!-- Workspace atual -->
    <v-row v-if="workspaceStore.current">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>Workspace Atual</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="updateWorkspace">
              <v-text-field
                v-model="currentWorkspace.name"
                label="Nome do Workspace"
                variant="outlined"
                class="mb-4"
              />
              <v-text-field
                v-model="currentWorkspace.slug"
                label="Slug"
                variant="outlined"
                class="mb-4"
              />
              <v-btn
                type="submit"
                color="primary"
                :loading="updating"
              >
                Atualizar
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Lista de workspaces -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            <span>Meus Workspaces</span>
            <v-btn
              color="primary"
              prepend-icon="mdi-plus"
              @click="createDialog = true"
            >
              Novo Workspace
            </v-btn>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="workspaceStore.list"
            class="elevation-1"
          >
            <template #item.current="{ item }">
              <v-chip
                v-if="item.id === workspaceStore.currentId"
                color="primary"
                size="small"
              >
                Atual
              </v-chip>
            </template>
            <template #item.actions="{ item }">
              <v-btn
                v-if="item.id !== workspaceStore.currentId"
                size="small"
                @click="switchWorkspace(item.id)"
              >
                Selecionar
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog criar workspace -->
    <v-dialog v-model="createDialog" max-width="500">
      <v-card>
        <v-card-title>Criar Novo Workspace</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newWorkspace.name"
            label="Nome do Workspace"
            variant="outlined"
            class="mb-4"
          />
          <v-text-field
            v-model="newWorkspace.slug"
            label="Slug"
            variant="outlined"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="createDialog = false">Cancelar</v-btn>
          <v-btn
            color="primary"
            @click="createWorkspace"
            :loading="creating"
          >
            Criar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useWorkspaceStore } from '@/stores/workspace'

const router = useRouter()
const workspaceStore = useWorkspaceStore()

const updating = ref(false)
const creating = ref(false)
const createDialog = ref(false)

const currentWorkspace = reactive({
  name: '',
  slug: ''
})

const newWorkspace = ref({
  name: '',
  slug: ''
})

const headers = [
  { title: 'Nome', key: 'name' },
  { title: 'Slug', key: 'slug' },
  { title: 'Status', key: 'current' },
  { title: 'Ações', key: 'actions', sortable: false }
]

watch(() => workspaceStore.current, (current) => {
  if (current) {
    currentWorkspace.name = current.name
    currentWorkspace.slug = current.slug
  }
}, { immediate: true })

watch(() => newWorkspace.value.name, (newName) => {
  if (newName) {
    newWorkspace.value.slug = newName.toLowerCase().replace(/[^a-z0-9]/g, '-')
  }
})

const updateWorkspace = async () => {
  updating.value = true
  try {
    await workspaceStore.updateWorkspace(workspaceStore.currentId, currentWorkspace)
  } finally {
    updating.value = false
  }
}

const createWorkspace = async () => {
  creating.value = true
  try {
    const result = await workspaceStore.createWorkspace(newWorkspace.value)
    if (result.success) {
      createDialog.value = false
      newWorkspace.value = { name: '', slug: '' }
    }
  } finally {
    creating.value = false
  }
}

const switchWorkspace = async (workspaceId) => {
  await workspaceStore.setCurrent(workspaceId)
  router.push('/funnel/live')
}

onMounted(() => {
  workspaceStore.loadMyWorkspaces()
})
</script>