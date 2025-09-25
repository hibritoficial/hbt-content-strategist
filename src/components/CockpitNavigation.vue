<template>
  <v-navigation-drawer
    v-model="drawer"
    location="right"
    temporary
    width="320"
    class="cockpit-nav"
  >
    <div class="nav-header">
      <div class="nav-title">
        <v-icon color="primary">mdi-view-dashboard</v-icon>
        <span>Cockpits</span>
      </div>
      <v-btn
        icon="mdi-close"
        variant="text"
        size="small"
        @click="drawer = false"
      />
    </div>

    <v-divider />

    <div class="nav-content">
      <!-- Cockpit Principal -->
      <div class="nav-section">
        <div class="section-title">Central de Comando</div>
        <v-list density="compact">
          <v-list-item
            prepend-icon="mdi-radar"
            title="Hibrit Command Center"
            subtitle="Visão geral do portfólio"
            @click="navigateTo('/cockpit')"
            :class="{ 'active-item': currentRoute === '/cockpit' }"
          />
        </v-list>
      </div>

      <!-- Cockpits de Clientes -->
      <div class="nav-section">
        <div class="section-title">Cockpits de Clientes</div>
        <v-list density="compact">
          <v-list-item
            prepend-icon="mdi-home-floor-1"
            title="OCS - Blocos de Concreto"
            subtitle="Funis unificados e por produto"
            @click="navigateTo('/cockpit/ocs')"
            :class="{ 'active-item': currentRoute === '/cockpit/ocs' }"
          >
            <template #append>
              <v-chip size="x-small" color="success">Ativo</v-chip>
            </template>
          </v-list-item>
          
          <v-list-item
            prepend-icon="mdi-plus"
            title="Novo Cliente"
            subtitle="Em desenvolvimento"
            disabled
          >
            <template #append>
              <v-chip size="x-small" color="grey">Em breve</v-chip>
            </template>
          </v-list-item>
        </v-list>
      </div>

      <!-- Ferramentas Rápidas -->
      <div class="nav-section">
        <div class="section-title">Acesso Rápido</div>
        <v-list density="compact">
          <v-list-item
            prepend-icon="mdi-chart-sankey"
            title="Funis"
            subtitle="Construtor de funis"
            @click="navigateTo('/funnels')"
          />
          <v-list-item
            prepend-icon="mdi-calendar"
            title="Calendar"
            subtitle="Planejamento de conteúdo"
            @click="navigateTo('/calendar')"
          />
          <v-list-item
            prepend-icon="mdi-chart-line"
            title="Métricas"
            subtitle="Analytics e performance"
            @click="navigateTo('/metrics')"
          />
          <v-list-item
            prepend-icon="mdi-brain"
            title="Neural Nexus"
            subtitle="Centro de IA e Consciência"
            @click="navigateTo('/neural-nexus')"
            class="neural-nexus-item"
          >
            <template #append>
              <v-chip size="x-small" color="primary">ULTIMATE</v-chip>
            </template>
          </v-list-item>
        </v-list>
      </div>
    </div>
  </v-navigation-drawer>

  <!-- Floating Action Button -->
  <v-btn
    class="cockpit-fab"
    color="primary"
    icon="mdi-view-dashboard"
    size="large"
    elevation="8"
    @click="drawer = true"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const drawer = ref(false)

const currentRoute = computed(() => route.path)

const navigateTo = (path) => {
  router.push(path)
  drawer.value = false
}
</script>

<style scoped>
.cockpit-nav {
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
}

.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.nav-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #1e293b;
}

.nav-content {
  padding: 16px 0;
}

.nav-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0 20px 8px;
}

.active-item {
  background: rgba(25, 118, 210, 0.1) !important;
  border-right: 3px solid #1976d2;
}

.cockpit-fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}

.cockpit-fab:hover {
  transform: scale(1.1);
}

.neural-nexus-item {
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.05), rgba(255, 0, 255, 0.05)) !important;
  border-left: 3px solid #00ffff !important;
  position: relative;
  overflow: hidden;
}

.neural-nexus-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.neural-nexus-item:hover::before {
  left: 100%;
}

.neural-nexus-item:hover {
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1)) !important;
  transform: translateX(5px);
}
</style>