<template>
  <div>
    <!-- Performance Cards -->
    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <div class="d-flex align-center justify-space-between mb-4">
            <h3 class="text-h6">Taxa de Conversão</h3>
            <v-icon color="success">mdi-trending-up</v-icon>
          </div>
          
          <div class="text-h3 font-weight-bold text-success mb-2">
            24.5%
          </div>
          
          <div class="text-body-2 text-grey-darken-1">
            +3.2% vs mês anterior
          </div>
          
          <v-progress-linear
            :model-value="24.5"
            color="success"
            height="8"
            class="mt-3"
          />
        </v-card>
      </v-col>
      
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <div class="d-flex align-center justify-space-between mb-4">
            <h3 class="text-h6">Tempo Médio no Pipeline</h3>
            <v-icon color="info">mdi-clock-outline</v-icon>
          </div>
          
          <div class="text-h3 font-weight-bold text-info mb-2">
            18 dias
          </div>
          
          <div class="text-body-2 text-grey-darken-1">
            -2 dias vs mês anterior
          </div>
          
          <v-progress-linear
            :model-value="65"
            color="info"
            height="8"
            class="mt-3"
          />
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Row -->
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>Vendas por Mês</v-card-title>
          <v-card-text>
            <div class="chart-placeholder">
              <v-icon size="64" color="grey-lighten-2">mdi-chart-line</v-icon>
              <div class="text-body-1 text-grey mt-4">
                Gráfico de vendas mensais
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Leads por Origem</v-card-title>
          <v-card-text>
            <div class="mb-4" v-for="source in leadSources" :key="source.name">
              <div class="d-flex align-center justify-space-between mb-2">
                <span class="text-body-2">{{ source.name }}</span>
                <span class="text-body-2 font-weight-bold">{{ source.percentage }}%</span>
              </div>
              <v-progress-linear
                :model-value="source.percentage"
                :color="source.color"
                height="6"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recent Deals Table -->
    <v-card class="mt-6">
      <v-card-title>Negócios Recentes</v-card-title>
      <v-data-table
        :headers="dealHeaders"
        :items="recentDeals"
        class="elevation-0"
      >
        <template #item.status="{ item }">
          <v-chip
            :color="getDealStatusColor(item.status)"
            size="small"
            variant="flat"
          >
            {{ item.status }}
          </v-chip>
        </template>
        
        <template #item.value="{ item }">
          <span class="font-weight-bold">
            R$ {{ item.value.toLocaleString() }}
          </span>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const leadSources = ref([
  { name: 'Website', percentage: 45, color: 'blue' },
  { name: 'Indicação', percentage: 30, color: 'green' },
  { name: 'Redes Sociais', percentage: 15, color: 'purple' },
  { name: 'Email Marketing', percentage: 10, color: 'orange' }
])

const dealHeaders = [
  { title: 'Cliente', key: 'client' },
  { title: 'Projeto', key: 'project' },
  { title: 'Valor', key: 'value' },
  { title: 'Status', key: 'status' },
  { title: 'Data', key: 'date' }
]

const recentDeals = ref([
  {
    client: 'Empresa A',
    project: 'Website Institucional',
    value: 15000,
    status: 'Fechado',
    date: '15/01/2024'
  },
  {
    client: 'Empresa B',
    project: 'E-commerce',
    value: 45000,
    status: 'Negociação',
    date: '14/01/2024'
  },
  {
    client: 'Empresa C',
    project: 'App Mobile',
    value: 35000,
    status: 'Proposta',
    date: '13/01/2024'
  }
])

const getDealStatusColor = (status) => {
  const colors = {
    'Fechado': 'green',
    'Negociação': 'orange',
    'Proposta': 'blue',
    'Perdido': 'red'
  }
  return colors[status] || 'grey'
}
</script>

<style scoped>
.chart-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  background: #f5f5f5;
  border-radius: 8px;
}
</style>