<template>
  <div class="pipeline-container">
    <div class="pipeline-columns">
      <div
        v-for="stage in pipelineStages"
        :key="stage.id"
        class="pipeline-column"
      >
        <v-card class="pipeline-stage" elevation="2">
          <v-card-title class="d-flex align-center justify-space-between">
            <div class="d-flex align-center">
              <v-icon :color="stage.color" class="mr-2">{{ stage.icon }}</v-icon>
              <span>{{ stage.name }}</span>
            </div>
            <v-chip size="small" :color="stage.color" variant="flat">
              {{ stage.deals.length }}
            </v-chip>
          </v-card-title>
          
          <v-card-text class="pa-2">
            <div
              v-for="deal in stage.deals"
              :key="deal.id"
              class="deal-card mb-2"
            >
              <v-card elevation="1" class="pa-3">
                <div class="text-subtitle-2 font-weight-bold mb-1">
                  {{ deal.title }}
                </div>
                <div class="text-body-2 text-grey-darken-1 mb-2">
                  {{ deal.company }}
                </div>
                <div class="d-flex align-center justify-space-between">
                  <v-chip size="x-small" color="green" variant="flat">
                    R$ {{ deal.value.toLocaleString() }}
                  </v-chip>
                  <div class="text-caption text-grey">
                    {{ deal.daysInStage }}d
                  </div>
                </div>
              </v-card>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const pipelineStages = ref([
  {
    id: 'lead',
    name: 'Leads',
    color: 'blue',
    icon: 'mdi-account-plus',
    deals: [
      { id: 1, title: 'Projeto Website', company: 'Empresa A', value: 15000, daysInStage: 3 },
      { id: 2, title: 'Consultoria Digital', company: 'Empresa B', value: 8000, daysInStage: 7 }
    ]
  },
  {
    id: 'qualified',
    name: 'Qualificados',
    color: 'orange',
    icon: 'mdi-account-check',
    deals: [
      { id: 3, title: 'Sistema CRM', company: 'Empresa C', value: 25000, daysInStage: 5 },
      { id: 4, title: 'App Mobile', company: 'Empresa D', value: 35000, daysInStage: 12 }
    ]
  },
  {
    id: 'proposal',
    name: 'Proposta',
    color: 'purple',
    icon: 'mdi-file-document',
    deals: [
      { id: 5, title: 'E-commerce', company: 'Empresa E', value: 45000, daysInStage: 8 }
    ]
  },
  {
    id: 'negotiation',
    name: 'Negociação',
    color: 'amber',
    icon: 'mdi-handshake',
    deals: [
      { id: 6, title: 'Plataforma EAD', company: 'Empresa F', value: 60000, daysInStage: 15 }
    ]
  },
  {
    id: 'closed',
    name: 'Fechados',
    color: 'green',
    icon: 'mdi-check-circle',
    deals: [
      { id: 7, title: 'Landing Page', company: 'Empresa G', value: 12000, daysInStage: 2 },
      { id: 8, title: 'Identidade Visual', company: 'Empresa H', value: 18000, daysInStage: 1 }
    ]
  }
])
</script>

<style scoped>
.pipeline-container {
  width: 100%;
  overflow-x: auto;
}

.pipeline-columns {
  display: flex;
  gap: 16px;
  min-width: 1200px;
  padding-bottom: 16px;
}

.pipeline-column {
  flex: 1;
  min-width: 240px;
}

.pipeline-stage {
  height: 100%;
  min-height: 400px;
}

.deal-card {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.deal-card:hover {
  transform: translateY(-2px);
}
</style>