<template>
  <v-card>
    <v-card-title>Atividades Recentes</v-card-title>
    
    <v-card-text>
      <v-timeline density="compact">
        <v-timeline-item
          v-for="activity in activities"
          :key="activity.id"
          :dot-color="activity.color"
          size="small"
        >
          <template #icon>
            <v-icon size="16">{{ activity.icon }}</v-icon>
          </template>
          
          <div class="d-flex align-center justify-space-between mb-2">
            <div class="text-subtitle-2 font-weight-bold">
              {{ activity.title }}
            </div>
            <div class="text-caption text-grey">
              {{ formatDate(activity.date) }}
            </div>
          </div>
          
          <div class="text-body-2 text-grey-darken-1 mb-2">
            {{ activity.description }}
          </div>
          
          <v-chip size="x-small" :color="activity.typeColor" variant="flat">
            {{ activity.type }}
          </v-chip>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const activities = ref([
  {
    id: 1,
    title: 'Reunião com João Silva',
    description: 'Apresentação da proposta de website institucional',
    type: 'Reunião',
    typeColor: 'blue',
    color: 'blue',
    icon: 'mdi-account-group',
    date: new Date('2024-01-15T14:30:00')
  },
  {
    id: 2,
    title: 'Email enviado para Maria Santos',
    description: 'Follow-up sobre interesse em consultoria digital',
    type: 'Email',
    typeColor: 'green',
    color: 'green',
    icon: 'mdi-email',
    date: new Date('2024-01-15T10:15:00')
  },
  {
    id: 3,
    title: 'Ligação para Pedro Costa',
    description: 'Esclarecimento de dúvidas sobre o projeto',
    type: 'Ligação',
    typeColor: 'orange',
    color: 'orange',
    icon: 'mdi-phone',
    date: new Date('2024-01-14T16:45:00')
  },
  {
    id: 4,
    title: 'Proposta enviada',
    description: 'Proposta comercial para desenvolvimento de e-commerce',
    type: 'Proposta',
    typeColor: 'purple',
    color: 'purple',
    icon: 'mdi-file-document',
    date: new Date('2024-01-14T09:20:00')
  },
  {
    id: 5,
    title: 'Novo lead cadastrado',
    description: 'Ana Silva interessada em identidade visual',
    type: 'Lead',
    typeColor: 'indigo',
    color: 'indigo',
    icon: 'mdi-account-plus',
    date: new Date('2024-01-13T11:30:00')
  }
])

const formatDate = (date) => {
  const now = new Date()
  const diff = now - date
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) {
    return 'Hoje'
  } else if (days === 1) {
    return 'Ontem'
  } else if (days < 7) {
    return `${days} dias atrás`
  } else {
    return date.toLocaleDateString('pt-BR')
  }
}
</script>