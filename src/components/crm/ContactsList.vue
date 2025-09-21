<template>
  <v-card>
    <v-card-title class="d-flex align-center justify-space-between">
      <span>Lista de Contatos</span>
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="Buscar contatos..."
        variant="outlined"
        density="compact"
        hide-details
        style="max-width: 300px;"
      />
    </v-card-title>
    
    <v-data-table
      :headers="headers"
      :items="filteredContacts"
      :search="search"
      class="elevation-0"
    >
      <template #item.status="{ item }">
        <v-chip
          :color="getStatusColor(item.status)"
          size="small"
          variant="flat"
        >
          {{ getStatusText(item.status) }}
        </v-chip>
      </template>
      
      <template #item.actions="{ item }">
        <v-btn
          icon="mdi-eye"
          size="small"
          variant="text"
          @click="viewContact(item)"
        />
        <v-btn
          icon="mdi-pencil"
          size="small"
          variant="text"
          @click="editContact(item)"
        />
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')

const headers = [
  { title: 'Nome', key: 'name', sortable: true },
  { title: 'Email', key: 'email', sortable: true },
  { title: 'Telefone', key: 'phone', sortable: false },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Última Interação', key: 'lastInteraction', sortable: true },
  { title: 'Ações', key: 'actions', sortable: false }
]

const contacts = ref([
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    status: 'lead',
    lastInteraction: '2024-01-15'
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(11) 88888-8888',
    status: 'customer',
    lastInteraction: '2024-01-14'
  },
  {
    id: 3,
    name: 'Pedro Costa',
    email: 'pedro@email.com',
    phone: '(11) 77777-7777',
    status: 'qualified',
    lastInteraction: '2024-01-13'
  }
])

const filteredContacts = computed(() => {
  if (!search.value) return contacts.value
  
  return contacts.value.filter(contact =>
    contact.name.toLowerCase().includes(search.value.toLowerCase()) ||
    contact.email.toLowerCase().includes(search.value.toLowerCase())
  )
})

const getStatusColor = (status) => {
  const colors = {
    lead: 'blue',
    qualified: 'orange',
    proposal: 'purple',
    customer: 'green',
    lost: 'red'
  }
  return colors[status] || 'grey'
}

const getStatusText = (status) => {
  const texts = {
    lead: 'Lead',
    qualified: 'Qualificado',
    proposal: 'Proposta',
    customer: 'Cliente',
    lost: 'Perdido'
  }
  return texts[status] || status
}

const viewContact = (contact) => {
  console.log('Ver contato:', contact)
}

const editContact = (contact) => {
  console.log('Editar contato:', contact)
}
</script>