<template>
  <v-menu offset-y>
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        variant="text"
        class="workspace-switcher"
        :loading="workspaceStore.loading"
      >
        <v-avatar size="32" class="mr-2">
          <v-icon>mdi-domain</v-icon>
        </v-avatar>
        <div class="text-left">
          <div class="text-body-2 font-weight-medium">
            {{ workspaceStore.currentName || 'Selecionar Workspace' }}
          </div>
          <div class="text-caption text-grey">
            {{ workspaceStore.list.length }} workspace{{ workspaceStore.list.length !== 1 ? 's' : '' }}
          </div>
        </div>
        <v-icon class="ml-2">mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-list min-width="280">
      <v-list-item
        v-for="workspace in workspaceStore.list"
        :key="workspace.id"
        @click="switchWorkspace(workspace.id)"
        :active="workspace.id === workspaceStore.currentId"
      >
        <template #prepend>
          <v-avatar size="32">
            <v-icon>mdi-domain</v-icon>
          </v-avatar>
        </template>
        <v-list-item-title>{{ workspace.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ workspace.slug }}</v-list-item-subtitle>
      </v-list-item>

      <v-divider class="my-2" />

      <v-list-item @click="createWorkspace">
        <template #prepend>
          <v-avatar size="32">
            <v-icon>mdi-plus</v-icon>
          </v-avatar>
        </template>
        <v-list-item-title>Criar Workspace</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>

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
        <v-btn color="primary" @click="submitCreate" :loading="creating">Criar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useWorkspaceStore } from '@/stores/workspace'

const router = useRouter()
const workspaceStore = useWorkspaceStore()

const createDialog = ref(false)
const creating = ref(false)
const newWorkspace = ref({ name: '', slug: '' })

watch(() => newWorkspace.value.name, (newName) => {
  if (newName) {
    newWorkspace.value.slug = newName.toLowerCase().replace(/[^a-z0-9]/g, '-')
  }
})

const switchWorkspace = async (workspaceId) => {
  await workspaceStore.setCurrent(workspaceId)
  router.go(0)
}

const createWorkspace = () => {
  newWorkspace.value = { name: '', slug: '' }
  createDialog.value = true
}

const submitCreate = async () => {
  creating.value = true
  try {
    const result = await workspaceStore.createWorkspace(newWorkspace.value)
    if (result.success) {
      createDialog.value = false
      router.go(0)
    }
  } finally {
    creating.value = false
  }
}
</script>

<style scoped>
.workspace-switcher {
  text-transform: none !important;
  justify-content: flex-start;
}
</style>