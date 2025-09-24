<template>
  <v-container fluid class="coc-container pa-0">
    <!-- Header Minimalista -->
    <div class="coc-header">
      <div class="header-content">
        <div class="brand-section">
          <v-icon color="primary" size="32" class="mr-3">mdi-factory</v-icon>
          <div>
            <h1 class="text-h4 font-weight-bold text-primary">Content Operational Center</h1>
            <p class="text-body-2 text-grey">Chão de fábrica dos conteúdos</p>
          </div>
        </div>
        
        <div class="quick-actions">
          <v-btn
            color="success"
            prepend-icon="mdi-lightning-bolt"
            variant="elevated"
            size="large"
            @click="startQuickCreate"
            class="quick-create-btn"
          >
            Criar Agora
          </v-btn>
        </div>
      </div>
    </div>

    <!-- Processo em Etapas Visuais -->
    <div class="coc-process">
      <!-- Etapa 1: Contexto -->
      <div class="process-step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
        <div class="step-header" @click="goToStep(1)">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>Contexto</h3>
            <p>Escolha o cliente e funil</p>
          </div>
          <v-icon v-if="currentStep > 1" color="success">mdi-check-circle</v-icon>
        </div>
        
        <div v-if="currentStep === 1" class="step-body">
          <div class="selection-grid">
            <!-- Cliente -->
            <div 
              v-for="client in availableClients" 
              :key="client.id"
              class="selection-card" 
              @click="selectClient(client.id)" 
              :class="{ selected: artifactsStore.currentClient === client.id }"
            >
              <v-icon size="48" :color="client.id === 'agrolito' ? 'green' : 'blue'">
                {{ client.id === 'agrolito' ? 'mdi-sprout' : 'mdi-home-floor-1' }}
              </v-icon>
              <h4>{{ client.name }}</h4>
              <p>{{ client.business.product }}</p>
              <div class="status-badge">Ativo</div>
            </div>
          </div>
          
          <!-- Funis do Cliente Selecionado -->
          <div v-if="artifactsStore.currentClient" class="funnels-section">
            <h4 class="section-title">Escolha o Funil</h4>
            <div class="funnels-grid">
              <div 
                v-for="funnel in availableFunnels" 
                :key="funnel.id"
                class="funnel-card"
                @click="selectFunnel(funnel.id)"
                :class="{ selected: artifactsStore.currentFunnel === funnel.id }"
              >
                <div class="funnel-icon" :style="{ backgroundColor: funnel.color }">
                  <v-icon color="white">{{ funnel.icon }}</v-icon>
                </div>
                <div class="funnel-info">
                  <h5>{{ funnel.name }}</h5>
                  <p>{{ funnel.description }}</p>
                  <div class="funnel-stats">
                    <span>{{ funnel.cultures.length }} culturas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Botão de seleção rápida -->
          <div v-if="artifactsStore.currentClient && availableFunnels.length > 0 && !artifactsStore.currentFunnel" class="quick-select-section">
            <v-btn 
              color="primary" 
              size="small" 
              @click="selectFunnel(availableFunnels[0].id)"
              class="mt-2"
            >
              Selecionar primeiro funil ({{ availableFunnels[0].name }})
            </v-btn>
          </div>
        </div>
      </div>

      <!-- Etapa 2: Configuração -->
      <div class="process-step" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
        <div class="step-header" @click="goToStep(2)">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>Configuração</h3>
            <p>Defina cultura, região e avatar</p>
          </div>
          <v-icon v-if="currentStep > 2" color="success">mdi-check-circle</v-icon>
        </div>
        
        <div v-if="currentStep === 2" class="step-body">
          
          <div class="config-grid">
            <!-- Cultura -->
            <div class="config-section">
              <h4>Cultura</h4>
              <div class="chips-container">
                <v-chip
                  v-for="culture in availableCultures"
                  :key="culture"
                  :color="artifactsStore.currentCulture === culture ? 'primary' : 'default'"
                  @click="selectCulture(culture)"
                  class="culture-chip"
                >
                  {{ culture }}
                </v-chip>
              </div>
              <div v-if="availableCultures.length === 0" class="text-grey">
                Nenhuma cultura disponível. Selecione um funil primeiro.
              </div>
              <v-btn 
                v-if="availableCultures.length > 0 && !artifactsStore.currentCulture"
                color="primary" 
                size="small" 
                @click="selectCulture(availableCultures[0])"
                class="mt-2"
              >
                Selecionar {{ availableCultures[0] }}
              </v-btn>
            </div>
            
            <!-- Região -->
            <div class="config-section">
              <h4>Região</h4>
              <div class="chips-container">
                <v-chip
                  v-for="region in availableRegions"
                  :key="region"
                  :color="artifactsStore.currentRegion === region ? 'primary' : 'default'"
                  @click="selectRegion(region)"
                  class="region-chip"
                >
                  {{ region }}
                </v-chip>
              </div>
              <div v-if="availableRegions.length === 0" class="text-grey">
                Nenhuma região disponível. Selecione um funil primeiro.
              </div>
              <v-btn 
                v-if="availableRegions.length > 0 && !artifactsStore.currentRegion"
                color="primary" 
                size="small" 
                @click="selectRegion(availableRegions[0])"
                class="mt-2"
              >
                Selecionar {{ availableRegions[0] }}
              </v-btn>
            </div>
            
            <!-- Avatar -->
            <div class="config-section">
              <h4>Avatar</h4>
              <div class="avatar-cards">
                <div 
                  v-for="avatar in availableAvatars"
                  :key="avatar.id"
                  class="avatar-card"
                  @click="selectAvatar(avatar.id)"
                  :class="{ selected: artifactsStore.currentAvatar === avatar.id }"
                >
                  <v-icon size="32" :color="avatar.color">{{ avatar.icon }}</v-icon>
                  <h5>{{ avatar.name }}</h5>
                  <p>{{ avatar.description }}</p>
                </div>
              </div>
              <div v-if="availableAvatars.length === 0" class="text-grey">
                Nenhum avatar disponível. Selecione um funil primeiro.
              </div>
              <v-btn 
                v-if="availableAvatars.length > 0 && !artifactsStore.currentAvatar"
                color="primary" 
                size="small" 
                @click="selectAvatar(availableAvatars[0].id)"
                class="mt-2"
              >
                Selecionar {{ availableAvatars[0].name }}
              </v-btn>
            </div>
          </div>
        </div>
      </div>

      <!-- Etapa 3: Template -->
      <div class="process-step" :class="{ active: currentStep >= 3, completed: currentStep > 3 }">
        <div class="step-header" @click="goToStep(3)">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>Template</h3>
            <p>Escolha o formato e molde</p>
          </div>
          <v-icon v-if="currentStep > 3" color="success">mdi-check-circle</v-icon>
        </div>
        
        <div v-if="currentStep === 3" class="step-body">
          <div class="template-grid">
            <div 
              v-for="template in availableTemplates"
              :key="template.id"
              class="template-card"
              @click="selectTemplate(template.id)"
              :class="{ selected: artifactsStore.currentTemplate === template.id }"
            >
              <div class="template-preview">
                <v-icon size="48" color="primary">{{ getTemplateIcon(template.id) }}</v-icon>
              </div>
              <div class="template-info">
                <h5>{{ template.name }}</h5>
                <p>{{ template.description }}</p>
                <div class="template-stats">
                  <span>{{ template.structure?.length || 1 }} elementos</span>
                  <span>{{ getTemplateDuration(template.id) }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <v-btn 
            v-if="availableTemplates.length > 0 && !artifactsStore.currentTemplate"
            color="primary" 
            size="small" 
            @click="selectTemplate(availableTemplates[0].id)"
            class="mt-4"
          >
            Selecionar {{ availableTemplates[0].name }}
          </v-btn>
        </div>
      </div>

      <!-- Etapa 4: Conteúdo -->
      <div class="process-step" :class="{ active: currentStep >= 4, completed: currentStep > 4 }">
        <div class="step-header" @click="goToStep(4)">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3>Conteúdo</h3>
            <p>Gancho, prova e CTA</p>
          </div>
          <v-icon v-if="currentStep > 4" color="success">mdi-check-circle</v-icon>
        </div>
        
        <div v-if="currentStep === 4" class="step-body">
          <div class="content-builder">
            <!-- Gancho -->
            <div class="content-section">
              <h4>Gancho</h4>
              <div class="hooks-grid">
                <div 
                  v-for="hook in availableHooks"
                  :key="hook.id"
                  class="hook-card"
                  @click="selectHook(hook.id)"
                  :class="{ selected: artifactsStore.currentHook === hook.id }"
                >
                  <div class="hook-text">{{ hook.text }}</div>
                  <div class="hook-category">{{ hook.category }}</div>
                </div>
              </div>
              <v-btn 
                v-if="availableHooks.length > 0 && !artifactsStore.currentHook"
                color="primary" 
                size="small" 
                @click="selectHook(availableHooks[0].id)"
                class="mt-2"
              >
                Selecionar {{ availableHooks[0].text.substring(0, 30) }}...
              </v-btn>
            </div>
            
            <!-- Prova -->
            <div class="content-section">
              <h4>Prova Social</h4>
              <div class="proof-grid">
                <div 
                  v-for="proof in availableProofs"
                  :key="proof.id"
                  class="proof-card"
                  @click="selectProof(proof.id)"
                  :class="{ selected: artifactsStore.currentProof === proof.id }"
                >
                  <v-icon :color="proof.color">{{ proof.icon }}</v-icon>
                  <h5>{{ proof.name }}</h5>
                  <p>{{ proof.description }}</p>
                </div>
              </div>
              <v-btn 
                v-if="availableProofs.length > 0 && !artifactsStore.currentProof"
                color="primary" 
                size="small" 
                @click="selectProof(availableProofs[0].id)"
                class="mt-2"
              >
                Selecionar {{ availableProofs[0].name }}
              </v-btn>
            </div>
            
            <!-- CTA -->
            <div class="content-section">
              <h4>Call to Action</h4>
              <div class="cta-grid">
                <div 
                  v-for="cta in availableCTAs"
                  :key="cta.id"
                  class="cta-card"
                  @click="selectCTA(cta.id)"
                  :class="{ selected: artifactsStore.currentCTA === cta.id }"
                >
                  <div class="cta-text">{{ cta.text }}</div>
                  <div class="cta-type">{{ cta.type }}</div>
                </div>
              </div>
              <v-btn 
                v-if="availableCTAs.length > 0 && !artifactsStore.currentCTA"
                color="primary" 
                size="small" 
                @click="selectCTA(availableCTAs[0].id)"
                class="mt-2"
              >
                Selecionar {{ availableCTAs[0].text }}
              </v-btn>
            </div>
          </div>
        </div>
      </div>

      <!-- Etapa 5: Geração -->
      <div class="process-step" :class="{ active: currentStep >= 5 }">
        <div class="step-header" @click="goToStep(5)">
          <div class="step-number">5</div>
          <div class="step-content">
            <h3>Geração</h3>
            <p>Produzir e revisar</p>
          </div>
        </div>
        
        <div v-if="currentStep === 5" class="step-body">
          
          <div class="generation-panel">
            <div class="generation-controls">
              <v-btn
                color="primary"
                size="large"
                prepend-icon="mdi-robot"
                @click="generateContent"
                :loading="isGenerating"
                :disabled="!localCanGenerate"
                class="generate-btn"
              >
                Gerar 3 Variações
              </v-btn>
              
              <div v-if="!localCanGenerate" class="mt-2">
                <v-alert type="warning" variant="tonal">
                  Complete todas as etapas anteriores para gerar o conteúdo.
                </v-alert>
              </div>
              
            </div>
            
            <div v-if="localGeneratedContent.length > 0" class="generated-content">
              <h4>Conteúdo Gerado</h4>
              <div class="variations-grid">
                <div 
                  v-for="(variation, index) in localGeneratedContent"
                  :key="index"
                  class="variation-card"
                >
                  <div class="variation-header">
                    <h5>Variação {{ index + 1 }}</h5>
                    <div class="variation-actions">
                      <v-btn icon="mdi-content-copy" size="small" @click="copyVariation(variation)" />
                      <v-btn icon="mdi-pencil" size="small" @click="editVariation(variation)" />
                      <v-btn icon="mdi-check" size="small" color="success" @click="selectVariation(variation)" />
                    </div>
                  </div>
                  <div class="variation-content">
                    <div class="variation-copy">{{ variation.copy }}</div>
                    <div class="variation-meta">
                      <span class="hashtags">{{ variation.hashtags }}</span>
                      <span class="cta">{{ variation.cta }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="progress-section">
      <v-progress-linear
        :model-value="(currentStep / 5) * 100"
        color="primary"
        height="8"
        rounded
        class="progress-bar"
      />
      <div class="progress-text">
        Etapa {{ currentStep }} de 5 - {{ getStepDescription(currentStep) }}
      </div>
    </div>

    <!-- Botão de Visualização do Sistema -->
    <v-btn
      icon="mdi-view-grid"
      color="primary"
      variant="elevated"
      size="large"
      class="system-view-btn"
      @click="showSystemModal = true"
    >
      <v-icon>mdi-view-grid</v-icon>
      <v-tooltip activator="parent" location="left">
        Visualizar Sistema de Artefatos
      </v-tooltip>
    </v-btn>

    <!-- Floating Action Button -->
    <v-fab
      v-if="canProceed && currentStep < 5"
      icon="mdi-arrow-right"
      color="primary"
      size="large"
      location="bottom end"
      @click="nextStep"
      class="next-step-fab"
    />
  </v-container>

  <!-- Modal do Sistema de Artefatos -->
  <v-dialog v-model="showSystemModal" max-width="1200" scrollable>
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2">mdi-view-grid</v-icon>
        Sistema de Artefatos - Agrolito
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" variant="text" @click="showSystemModal = false"></v-btn>
      </v-card-title>
      
      <v-card-text class="pa-0">
        <v-tabs v-model="activeTab" color="primary">
          <v-tab value="core">Core</v-tab>
          <v-tab value="processes">Processos</v-tab>
          <v-tab value="clients">Clientes</v-tab>
          <v-tab value="content">Conteúdo</v-tab>
        </v-tabs>
        
        <v-window v-model="activeTab">
          <!-- Tab Core -->
          <v-window-item value="core">
            <div class="pa-4">
              <h3 class="mb-4">Artefatos Core (Imutáveis)</h3>
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-title>Identidade</v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>Missão</v-list-item-title>
                        <v-list-item-subtitle>{{ artifactsStore.core.identity.mission }}</v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>Visão</v-list-item-title>
                        <v-list-item-subtitle>{{ artifactsStore.core.identity.vision }}</v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>Valores</v-list-item-title>
                        <v-list-item-subtitle>{{ artifactsStore.core.identity.values.join(', ') }}</v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-text>
                </v-expansion-panel>
                
                <v-expansion-panel>
                  <v-expansion-panel-title>Filosofia</v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-list>
                      <v-list-item v-for="principle in artifactsStore.core.philosophy.principles" :key="principle">
                        <v-list-item-title>{{ principle }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-text>
                </v-expansion-panel>
                
                <v-expansion-panel>
                  <v-expansion-panel-title>Terminologia</v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-list>
                      <v-list-item v-for="(value, key) in artifactsStore.core.terminology" :key="key">
                        <v-list-item-title>{{ key }}</v-list-item-title>
                        <v-list-item-subtitle>{{ value }}</v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </v-window-item>
          
          <!-- Tab Processos -->
          <v-window-item value="processes">
            <div class="pa-4">
              <h3 class="mb-4">Artefatos de Processo</h3>
              
              <!-- Templates -->
              <v-card class="mb-4">
                <v-card-title>Templates</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col v-for="(template, key) in artifactsStore.processes.templates" :key="key" cols="12" md="4">
                      <v-card variant="outlined">
                        <v-card-title class="text-h6">{{ template.name }}</v-card-title>
                        <v-card-text>
                          <p>{{ template.description }}</p>
                          <v-chip size="small" color="primary">{{ template.duration }}</v-chip>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              
              <!-- Hooks -->
              <v-card class="mb-4">
                <v-card-title>Hooks (Ganchos)</v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item v-for="hook in artifactsStore.processes.hooks" :key="hook.id">
                      <template v-slot:prepend>
                        <v-chip size="small" :color="hook.category === 'Problema' ? 'red' : hook.category === 'Curiosidade' ? 'blue' : 'green'">
                          {{ hook.category }}
                        </v-chip>
                      </template>
                      <v-list-item-title>{{ hook.text }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
              
              <!-- Provas -->
              <v-card class="mb-4">
                <v-card-title>Provas Sociais</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col v-for="proof in artifactsStore.processes.proofs" :key="proof.id" cols="12" md="4">
                      <v-card variant="outlined">
                        <v-card-title class="d-flex align-center">
                          <v-icon :color="proof.color" class="mr-2">{{ proof.icon }}</v-icon>
                          {{ proof.name }}
                        </v-card-title>
                        <v-card-text>
                          <p>{{ proof.description }}</p>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              
              <!-- CTAs -->
              <v-card>
                <v-card-title>Call-to-Actions</v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item v-for="cta in artifactsStore.processes.ctas" :key="cta.id">
                      <template v-slot:prepend>
                        <v-chip size="small" :color="cta.type === 'Primário' ? 'primary' : cta.type === 'Secundário' ? 'secondary' : cta.type === 'Educacional' ? 'success' : 'warning'">
                          {{ cta.type }}
                        </v-chip>
                      </template>
                      <v-list-item-title>{{ cta.text }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </div>
          </v-window-item>
          
          <!-- Tab Clientes -->
          <v-window-item value="clients">
            <div class="pa-4">
              <h3 class="mb-4">Artefatos de Cliente - Agrolito</h3>
              
              <!-- Informações do Negócio -->
              <v-card class="mb-4">
                <v-card-title>Informações do Negócio</v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item>
                      <v-list-item-title>Produto</v-list-item-title>
                      <v-list-item-subtitle>{{ artifactsStore.clients.agrolito.client.business.product }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Segmento</v-list-item-title>
                      <v-list-item-subtitle>{{ artifactsStore.clients.agrolito.client.business.segment }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Foco Regional</v-list-item-title>
                      <v-list-item-subtitle>{{ artifactsStore.clients.agrolito.client.business.region_focus.join(', ') }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Registro</v-list-item-title>
                      <v-list-item-subtitle>{{ artifactsStore.clients.agrolito.client.business.registration }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
              
              <!-- Funis -->
              <v-card class="mb-4">
                <v-card-title>Funis de Marketing</v-card-title>
                <v-card-text>
                  <v-expansion-panels>
                    <v-expansion-panel v-for="(funnel, key) in artifactsStore.clients.agrolito.client.funnels" :key="key">
                      <v-expansion-panel-title>
                        <v-icon :color="funnel.color" class="mr-2">{{ funnel.icon }}</v-icon>
                        {{ funnel.name }}
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <p class="mb-3">{{ funnel.description }}</p>
                        
                        <h4 class="mb-2">Culturas:</h4>
                        <v-chip-group>
                          <v-chip v-for="culture in funnel.cultures" :key="culture" size="small">
                            {{ culture }}
                          </v-chip>
                        </v-chip-group>
                        
                        <h4 class="mb-2 mt-4">Regiões:</h4>
                        <v-expansion-panels>
                          <v-expansion-panel v-for="(cities, state) in funnel.regions" :key="state">
                            <v-expansion-panel-title>{{ state }}</v-expansion-panel-title>
                            <v-expansion-panel-text>
                              <v-chip-group>
                                <v-chip v-for="city in cities" :key="city" size="small" variant="outlined">
                                  {{ city }}
                                </v-chip>
                              </v-chip-group>
                            </v-expansion-panel-text>
                          </v-expansion-panel>
                        </v-expansion-panels>
                        
                        <h4 class="mb-2 mt-4">Avatars:</h4>
                        <v-row>
                          <v-col v-for="avatar in funnel.avatars" :key="avatar.id" cols="12" md="6">
                            <v-card variant="outlined">
                              <v-card-title class="d-flex align-center">
                                <v-icon :color="avatar.color" class="mr-2">{{ avatar.icon }}</v-icon>
                                {{ avatar.name }}
                              </v-card-title>
                              <v-card-text>
                                <p class="mb-2">{{ avatar.description }}</p>
                                
                                <h5 class="mb-1">Pain Points:</h5>
                                <ul class="mb-2">
                                  <li v-for="pain in avatar.pain_points" :key="pain">{{ pain }}</li>
                                </ul>
                                
                                <h5 class="mb-1">Goals:</h5>
                                <ul>
                                  <li v-for="goal in avatar.goals" :key="goal">{{ goal }}</li>
                                </ul>
                              </v-card-text>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card-text>
              </v-card>
            </div>
          </v-window-item>
          
          <!-- Tab Conteúdo -->
          <v-window-item value="content">
            <div class="pa-4">
              <h3 class="mb-4">Conteúdo Gerado</h3>
              
              <div v-if="localGeneratedContent.length > 0">
                <v-card v-for="(variation, index) in localGeneratedContent" :key="variation.id" class="mb-4">
                  <v-card-title>
                    Variação {{ index + 1 }}
                    <v-spacer></v-spacer>
                    <v-chip :color="variation.quality_score >= 90 ? 'success' : variation.quality_score >= 80 ? 'primary' : 'warning'">
                      Score: {{ variation.quality_score }}
                    </v-chip>
                  </v-card-title>
                  <v-card-text>
                    <div class="mb-3">
                      <h5>Copy:</h5>
                      <div class="copy-content">{{ variation.copy }}</div>
                    </div>
                    <div class="mb-3">
                      <h5>Hashtags:</h5>
                      <v-chip-group>
                        <v-chip v-for="hashtag in variation.hashtags.split(' ')" :key="hashtag" size="small">
                          {{ hashtag }}
                        </v-chip>
                      </v-chip-group>
                    </div>
                    <div class="mb-3">
                      <h5>CTA:</h5>
                      <v-chip color="primary">{{ variation.cta }}</v-chip>
                    </div>
                    <div>
                      <h5>Template:</h5>
                      <v-chip variant="outlined">{{ variation.template }}</v-chip>
                    </div>
                  </v-card-text>
                </v-card>
              </div>
              
              <v-alert v-else type="info">
                Nenhum conteúdo foi gerado ainda. Complete o processo de criação para ver as variações aqui.
              </v-alert>
            </div>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useArtifactsStore } from '@/stores/artifacts'

const router = useRouter()
const artifactsStore = useArtifactsStore()

// Estado do processo
const currentStep = ref(1)

// Estado da modal
const showSystemModal = ref(false)
const activeTab = ref('core')

// Usar dados do store de artefatos
const { 
  availableClients,
  availableTemplates,
  availableHooks,
  availableProofs,
  availableCTAs,
  generatedContent,
  isGenerating,
  canGenerate
} = artifactsStore

// Computed locals (corrigindo problema de reatividade)
const availableFunnels = computed(() => {
  if (!artifactsStore.currentClient) return []
  const client = artifactsStore.clients[artifactsStore.currentClient]
  if (!client || !client.client || !client.client.funnels) return []
  
  return Object.values(client.client.funnels).map(funnel => ({
    id: funnel.id,
    name: funnel.name,
    description: funnel.description,
    icon: funnel.icon,
    color: funnel.color,
    cultures: funnel.cultures || [],
    regions: funnel.regions ? Object.entries(funnel.regions).map(([state, cities]) => 
      cities.map(city => `${state} - ${city}`)
    ).flat() : [],
    avatars: funnel.avatars || []
  }))
})

const availableCultures = computed(() => {
  if (!artifactsStore.currentFunnel) return []
  const funnel = availableFunnels.value.find(f => f.id === artifactsStore.currentFunnel)
  return funnel?.cultures || []
})

const availableRegions = computed(() => {
  if (!artifactsStore.currentFunnel) return []
  const funnel = availableFunnels.value.find(f => f.id === artifactsStore.currentFunnel)
  return funnel?.regions || []
})

const availableAvatars = computed(() => {
  if (!artifactsStore.currentFunnel) return []
  const funnel = availableFunnels.value.find(f => f.id === artifactsStore.currentFunnel)
  return funnel?.avatars || []
})

// Dados já disponíveis através do store

// Debug: verificar dados diretamente
// console.log('COC Component - Store data:', {
//   clients: artifactsStore.clients,
//   currentClient: artifactsStore.currentClient,
//   availableFunnels: availableFunnels.value,
//   availableCultures: availableCultures.value,
//   availableRegions: availableRegions.value,
//   availableAvatars: availableAvatars.value
// })

// Computed properties
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1: 
      return !!(artifactsStore.currentClient && artifactsStore.currentFunnel)
    case 2: 
      return !!(artifactsStore.currentCulture && artifactsStore.currentRegion && artifactsStore.currentAvatar)
    case 3: 
      return !!artifactsStore.currentTemplate
    case 4: 
      return !!(artifactsStore.currentHook && artifactsStore.currentProof && artifactsStore.currentCTA)
    case 5: 
      return localGeneratedContent.value && localGeneratedContent.value.length > 0
    default: 
      return false
  }
})

// Computed local para canGenerate (solução para problema de reatividade)
const localCanGenerate = computed(() => {
  return !!(artifactsStore.currentClient && 
           artifactsStore.currentFunnel && 
           artifactsStore.currentCulture && 
           artifactsStore.currentRegion && 
           artifactsStore.currentAvatar && 
           artifactsStore.currentTemplate && 
           artifactsStore.currentHook && 
           artifactsStore.currentProof && 
           artifactsStore.currentCTA)
})

// Computed local para generatedContent (solução para problema de reatividade)
const localGeneratedContent = computed(() => {
  const content = artifactsStore.generatedContent || []
  console.log('Component - localGeneratedContent computed:', content)
  return content
})

// Métodos
const goToStep = (step) => {
  if (step <= currentStep.value || (step === currentStep.value + 1 && canProceed.value)) {
    currentStep.value = step
  }
}

const nextStep = () => {
  if (canProceed.value && currentStep.value < 5) {
    currentStep.value++
  }
}

const selectClient = (clientId) => {
  artifactsStore.setClient(clientId)
}

const selectFunnel = (funnelId) => {
  artifactsStore.setFunnel(funnelId)
}

const selectCulture = (culture) => {
  artifactsStore.setCulture(culture)
}

const selectRegion = (region) => {
  artifactsStore.setRegion(region)
}

const selectAvatar = (avatarId) => {
  artifactsStore.setAvatar(avatarId)
}

const selectTemplate = (templateId) => {
  artifactsStore.setTemplate(templateId)
}

const selectHook = (hookId) => {
  artifactsStore.setHook(hookId)
}

const selectProof = (proofId) => {
  artifactsStore.setProof(proofId)
}

const selectCTA = (ctaId) => {
  artifactsStore.setCTA(ctaId)
}


const generateContent = async () => {
  console.log('Component - generateContent called')
  try {
    await artifactsStore.generateContent()
    console.log('Component - generateContent completed')
  } catch (error) {
    console.error('Component - generateContent error:', error)
  }
}

const copyVariation = (variation) => {
  navigator.clipboard.writeText(variation.copy)
  // Mostrar feedback
}

const editVariation = (variation) => {
  // Abrir editor
}

const selectVariation = (variation) => {
  // Salvar e ir para pipeline
  router.push('/pipeline')
}

const startQuickCreate = () => {
  currentStep.value = 1
  artifactsStore.setClient('agrolito')
  artifactsStore.setFunnel('f1')
  artifactsStore.setCulture('Banana')
  artifactsStore.setRegion('CE - Jaguaribe')
  artifactsStore.setAvatar('produtor')
  currentStep.value = 3
}

const getStepDescription = (step) => {
  const descriptions = {
    1: 'Definindo contexto',
    2: 'Configurando parâmetros',
    3: 'Escolhendo template',
    4: 'Criando conteúdo',
    5: 'Gerando variações'
  }
  return descriptions[step] || ''
}

const getTemplateIcon = (templateId) => {
  const icons = {
    'reel-30s': 'mdi-video',
    'carrossel-7': 'mdi-view-carousel',
    'post-educativo': 'mdi-text'
  }
  return icons[templateId] || 'mdi-file'
}

const getTemplateDuration = (templateId) => {
  const durations = {
    'reel-30s': '30-45s',
    'carrossel-7': '2-3min',
    'post-educativo': '1-2min'
  }
  return durations[templateId] || 'N/A'
}

// Watch para auto-avançar quando possível
watch([
  () => artifactsStore.currentClient,
  () => artifactsStore.currentFunnel,
  () => artifactsStore.currentCulture,
  () => artifactsStore.currentRegion,
  () => artifactsStore.currentAvatar,
  () => artifactsStore.currentTemplate,
  () => artifactsStore.currentHook,
  () => artifactsStore.currentProof,
  () => artifactsStore.currentCTA
], () => {
  if (canProceed.value && currentStep.value < 5) {
    setTimeout(() => {
      if (canProceed.value) {
        nextStep()
      }
    }, 500)
  }
})
</script>

<style scoped>
.coc-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding-bottom: 120px; /* Espaço para o progress bar */
}

.coc-header {
  background: white;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  padding: 2rem 0;
  margin-bottom: 2rem;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-section {
  display: flex;
  align-items: center;
}

.quick-create-btn {
  background: linear-gradient(45deg, #4CAF50, #45a049) !important;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4) !important;
  animation: pulse-glow 2s ease-in-out infinite alternate;
}

@keyframes pulse-glow {
  from { box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4); }
  to { box-shadow: 0 6px 20px rgba(76, 175, 80, 0.6); }
}

.coc-process {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.process-step {
  background: white;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  overflow: hidden;
}

.process-step.active {
  box-shadow: 0 8px 30px rgba(25, 118, 210, 0.15);
  border: 2px solid #1976D2;
}

.process-step.completed {
  background: linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%);
}

.step-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.step-header:hover {
  background: rgba(25, 118, 210, 0.05);
}

.step-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #E3F2FD;
  color: #1976D2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 1rem;
  transition: all 0.3s ease;
}

.process-step.active .step-number {
  background: #1976D2;
  color: white;
  transform: scale(1.1);
}

.process-step.completed .step-number {
  background: #4CAF50;
  color: white;
}

.step-content {
  flex: 1;
}

.step-content h3 {
  margin: 0 0 0.5rem 0;
  color: #1976D2;
  font-weight: 600;
}

.step-content p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.step-body {
  padding: 0 1.5rem 1.5rem 1.5rem;
  border-top: 1px solid #E0E0E0;
}

.selection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.selection-card {
  background: #F8F9FA;
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.selection-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.selection-card.selected {
  border-color: #1976D2;
  background: #E3F2FD;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(25, 118, 210, 0.2);
}

.selection-card h4 {
  margin: 1rem 0 0.5rem 0;
  color: #1976D2;
  font-weight: 600;
}

.selection-card p {
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 0.9rem;
}

.status-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #4CAF50;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
}

.funnels-section {
  margin-top: 2rem;
}

.section-title {
  color: #1976D2;
  font-weight: 600;
  margin-bottom: 1rem;
}

.funnels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.funnel-card {
  background: #F8F9FA;
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.funnel-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.funnel-card.selected {
  border-color: #1976D2;
  background: #E3F2FD;
}

.funnel-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.funnel-info h5 {
  margin: 0 0 0.5rem 0;
  color: #1976D2;
  font-weight: 600;
}

.funnel-info p {
  margin: 0 0 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.funnel-stats {
  font-size: 0.8rem;
  color: #999;
}

.config-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.config-section h4 {
  color: #1976D2;
  font-weight: 600;
  margin-bottom: 1rem;
}

.chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.culture-chip, .region-chip {
  cursor: pointer;
  transition: all 0.2s ease;
}

.culture-chip:hover, .region-chip:hover {
  transform: scale(1.05);
}

.avatar-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.avatar-card {
  background: #F8F9FA;
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.avatar-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.avatar-card.selected {
  border-color: #1976D2;
  background: #E3F2FD;
}

.avatar-card h5 {
  margin: 1rem 0 0.5rem 0;
  color: #1976D2;
  font-weight: 600;
}

.avatar-card p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.template-card {
  background: #F8F9FA;
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.template-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.template-card.selected {
  border-color: #1976D2;
  background: #E3F2FD;
}

.template-preview {
  margin-bottom: 1rem;
}

.template-info h5 {
  margin: 0 0 0.5rem 0;
  color: #1976D2;
  font-weight: 600;
}

.template-info p {
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 0.9rem;
}

.template-stats {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #999;
}

.content-builder {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.content-section h4 {
  color: #1976D2;
  font-weight: 600;
  margin-bottom: 1rem;
}

.hooks-grid, .proof-grid, .cta-grid {
  display: grid;
  gap: 0.75rem;
}

.hook-card, .proof-card, .cta-card {
  background: #F8F9FA;
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.hook-card:hover, .proof-card:hover, .cta-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.hook-card.selected, .proof-card.selected, .cta-card.selected {
  border-color: #1976D2;
  background: #E3F2FD;
}

.hook-text {
  font-weight: 500;
  color: #1976D2;
  margin-bottom: 0.5rem;
}

.hook-category, .cta-type {
  font-size: 0.8rem;
  color: #999;
  background: #E0E0E0;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  display: inline-block;
}

.proof-card {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.proof-card h5 {
  margin: 0 0 0.25rem 0;
  color: #1976D2;
  font-weight: 600;
}

.proof-card p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.cta-text {
  font-weight: 500;
  color: #1976D2;
  margin-bottom: 0.5rem;
}

.generation-panel {
  text-align: center;
}

.generation-controls {
  margin-bottom: 2rem;
}

.generate-btn {
  background: linear-gradient(45deg, #1976D2, #1565C0) !important;
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.4) !important;
}

.generated-content h4 {
  color: #1976D2;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: left;
}

.variations-grid {
  display: grid;
  gap: 1rem;
}

.variation-card {
  background: #F8F9FA;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: left;
}

.variation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.variation-header h5 {
  margin: 0;
  color: #1976D2;
  font-weight: 600;
}

.variation-actions {
  display: flex;
  gap: 0.5rem;
}

.variation-content {
  margin-bottom: 1rem;
}

.variation-copy {
  color: #333;
  line-height: 1.6;
  margin-bottom: 1rem;
  white-space: pre-line;
}

.variation-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #666;
}

.hashtags {
  color: #1976D2;
}

.cta {
  font-weight: 500;
  color: #4CAF50;
}

.progress-section {
  position: sticky;
  bottom: 0;
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 -2px 12px rgba(0,0,0,0.1);
  z-index: 1000;
  margin-top: 2rem;
}

.progress-bar {
  margin-bottom: 0.5rem;
}

.progress-text {
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
}

.next-step-fab {
  position: fixed !important;
  bottom: 120px !important;
  right: 2rem !important;
  z-index: 1001 !important;
  animation: bounce-in 0.5s ease;
}

@keyframes bounce-in {
  0% { transform: scale(0); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* Responsividade */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .selection-grid, .funnels-grid, .template-grid {
    grid-template-columns: 1fr;
  }
  
  .config-grid, .content-builder {
    grid-template-columns: 1fr;
  }
  
  .progress-section {
    padding: 1rem;
  }
}

.system-view-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.copy-content {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
  white-space: pre-line;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.4;
}
</style>
