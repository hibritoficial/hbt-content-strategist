<template>
  <div class="floating-menu">
    <!-- Main FAB Button -->
    <v-btn
      :color="mainColor"
      icon
      size="large"
      elevation="8"
      class="main-fab"
      @click="toggleMenu"
    >
      <v-icon :class="{ rotated: isExpanded }">{{ mainIcon }}</v-icon>
    </v-btn>

    <!-- Action Buttons -->
    <v-btn
      v-for="(action, index) in actions"
      v-show="isExpanded"
      :key="action.id"
      :color="action.color"
      icon
      size="small"
      elevation="6"
      class="action-fab"
      :style="{ 
        top: `${index === 0 ? 80 : 80 + (index * 50)}px`,
        animationDelay: `${index * 100}ms`
      }"
      @click="executeAction(action)"
    >
      <v-icon size="18">{{ action.icon }}</v-icon>
      <v-tooltip activator="parent" location="left">
        {{ action.label }}
      </v-tooltip>
    </v-btn>

    <!-- Backdrop -->
    <div 
      v-if="isExpanded" 
      class="fab-backdrop" 
      @click="closeMenu"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  actions: {
    type: Array,
    required: true
  },
  mainIcon: {
    type: String,
    default: 'mdi-lightning-bolt'
  },
  mainColor: {
    type: String,
    default: 'primary'
  }
})

const isExpanded = ref(true)

const toggleMenu = () => {
  isExpanded.value = !isExpanded.value
  console.log('Menu toggled:', isExpanded.value, 'Actions:', props.actions.length)
}

const closeMenu = () => {
  isExpanded.value = false
}

const executeAction = (action) => {
  action.action()
  closeMenu()
}
</script>

<style scoped>
.floating-menu {
  position: fixed;
  top: 80px;
  right: 24px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-fab {
  position: relative;
  z-index: 1002;
  width: 56px !important;
  height: 56px !important;
  border-radius: 50% !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.main-fab:hover {
  transform: scale(1.1) !important;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2) !important;
}

.main-fab .v-icon.rotated {
  transform: rotate(45deg);
  transition: transform 0.3s ease;
}

.action-fab {
  position: absolute !important;
  right: 8px !important;
  width: 40px !important;
  height: 40px !important;
  border-radius: 50% !important;
  z-index: 2001;
  animation: fab-appear 0.3s ease forwards;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

@keyframes fab-appear {
  from {
    opacity: 0;
    transform: scale(0.3);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.action-fab:hover {
  transform: scale(1.15) translateY(-2px) !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.18) !important;
  background: rgba(255, 255, 255, 1) !important;
}

.action-fab .v-icon {
  color: rgba(0, 0, 0, 0.7) !important;
}

.fab-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 999;
  animation: fade-in 0.2s ease;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fab-enter-active,
.fab-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fab-enter-from,
.fab-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

@media (max-width: 768px) {
  .floating-menu {
    right: 16px;
    top: 72px;
  }
  
  .main-fab {
    width: 48px !important;
    height: 48px !important;
  }
  
  .action-fab {
    width: 36px !important;
    height: 36px !important;
  }
}

/* Força estilos circulares */
.v-btn--icon {
  border-radius: 50% !important;
}

.v-btn--icon.v-btn--size-large {
  width: 56px !important;
  height: 56px !important;
}

.v-btn--icon.v-btn--size-small {
  width: 40px !important;
  height: 40px !important;
}
</style>