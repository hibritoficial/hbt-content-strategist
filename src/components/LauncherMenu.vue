<template>
  <v-card min-width="400" max-width="500">
    <v-card-title class="d-flex align-center justify-space-between">
      <span>Launcher</span>
      <v-chip v-if="cockpitStore.isClientScope" size="small" color="success">
        {{ cockpitStore.currentClient?.name }}
      </v-chip>
    </v-card-title>
    
    <v-card-text>
      <!-- Operar -->
      <div class="mb-4">
        <v-list-subheader class="text-primary font-weight-bold">OPERAR</v-list-subheader>
        <v-row>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-monitor-dashboard"
              :to="{ name: 'Cockpit' }"
            >
              Cockpit
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-chart-sankey"
              :to="{ name: 'Funnels' }"
              :disabled="cockpitStore.isPortfolioScope"
              :title="cockpitStore.isPortfolioScope ? 'Selecione um cliente' : ''"
            >
              Funis
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-file-document-multiple"
              :to="{ name: 'Pipeline' }"
            >
              Conteúdo
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-chart-line"
              :to="{ name: 'Metrics' }"
            >
              Métricas
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <!-- Capacitar -->
      <div class="mb-4">
        <v-list-subheader class="text-primary font-weight-bold">CAPACITAR</v-list-subheader>
        <v-row>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-book-open"
              @click="docsStore.toggle"
            >
              Treinamento
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-library"
              :to="{ name: 'Library' }"
              :disabled="cockpitStore.isPortfolioScope"
              :title="cockpitStore.isPortfolioScope ? 'Selecione um cliente' : ''"
            >
              Biblioteca
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <!-- Orquestrar (Hibrit) -->
      <div v-if="cockpitStore.isHibrit" class="mb-4">
        <v-list-subheader class="text-primary font-weight-bold">ORQUESTRAR</v-list-subheader>
        <v-row>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-shield-crown"
              :to="{ name: 'Admin' }"
            >
              Admin Hibrit
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-clipboard-check"
              :to="{ name: 'Tasks' }"
            >
              Tarefas
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-sitemap"
              :to="{ name: 'Flow' }"
            >
              Processos
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-view-column"
              :to="{ name: 'Pipeline' }"
            >
              Demandas
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <!-- Crescer -->
      <div class="mb-4">
        <v-list-subheader class="text-primary font-weight-bold">CRESCER</v-list-subheader>
        <v-row>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-instagram"
              :to="{ name: 'Instagram' }"
              :disabled="cockpitStore.isPortfolioScope"
              :title="cockpitStore.isPortfolioScope ? 'Selecione um cliente' : ''"
            >
              Instagram
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-youtube"
              disabled
            >
              YouTube
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-post"
              disabled
            >
              Blog
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-trophy"
              disabled
            >
              Gamification
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <!-- Laboratório (Hibrit) -->
      <div v-if="cockpitStore.isHibrit">
        <v-list-subheader class="text-primary font-weight-bold">LABORATÓRIO</v-list-subheader>
        <v-row>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-robot"
              disabled
            >
              Agentes IA
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-atom"
              :to="{ name: 'HibritLabs' }"
              class="hibrit-labs-btn"
            >
              HIBRIT LABS
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useCockpitStore } from '@/stores/cockpit'
import { useDocsStore } from '@/stores/docs'

const cockpitStore = useCockpitStore()
const docsStore = useDocsStore()
</script>

<style scoped>
.hibrit-labs-btn {
  background: linear-gradient(135deg, rgba(0, 255, 157, 0.1), rgba(0, 123, 255, 0.1)) !important;
  border-color: rgba(0, 255, 157, 0.3) !important;
  color: #00ff9d !important;
  font-weight: 600 !important;
}

.hibrit-labs-btn:hover {
  background: linear-gradient(135deg, rgba(0, 255, 157, 0.2), rgba(0, 123, 255, 0.2)) !important;
  border-color: #00ff9d !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 255, 157, 0.3) !important;
}
</style>