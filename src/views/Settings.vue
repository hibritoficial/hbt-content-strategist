<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-6">Configurações</h1>
      </v-col>
    </v-row>

    <v-tabs v-model="activeTab" color="primary">
      <v-tab value="business">Negócio</v-tab>
      <v-tab value="brand">Marca & Marketing</v-tab>
      <v-tab value="channels">Canais</v-tab>
    </v-tabs>

    <v-window v-model="activeTab" class="mt-4">
      <!-- Negócio -->
      <v-window-item value="business">
        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>Marcas / Workspaces</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item
                    v-for="brand in brands"
                    :key="brand.id"
                    :active="brand.id === currentBrand"
                  >
                    <template #prepend>
                      <v-avatar :color="brand.color" size="32">
                        {{ brand.name.charAt(0) }}
                      </v-avatar>
                    </template>
                    <v-list-item-title>{{ brand.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ brand.domain }}</v-list-item-subtitle>
                    <template #append>
                      <v-btn icon="mdi-pencil" size="small" />
                    </template>
                  </v-list-item>
                </v-list>
                <v-btn
                  color="primary"
                  prepend-icon="mdi-plus"
                  variant="outlined"
                  class="mt-4"
                >
                  Nova Marca
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>Equipes & Permissões</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item
                    v-for="member in teamMembers"
                    :key="member.id"
                  >
                    <template #prepend>
                      <v-avatar size="32">
                        <v-img :src="member.avatar" :alt="member.name" />
                      </v-avatar>
                    </template>
                    <v-list-item-title>{{ member.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ member.email }}</v-list-item-subtitle>
                    <template #append>
                      <v-chip :color="getRoleColor(member.role)" size="small">
                        {{ member.role }}
                      </v-chip>
                    </template>
                  </v-list-item>
                </v-list>
                <v-btn
                  color="primary"
                  prepend-icon="mdi-account-plus"
                  variant="outlined"
                  class="mt-4"
                >
                  Convidar Membro
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-window-item>

      <!-- Marca & Marketing -->
      <v-window-item value="brand">
        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>Identidade Visual</v-card-title>
              <v-card-text>
                <v-form>
                  <v-file-input
                    v-model="brandSettings.logo"
                    label="Logo da Marca"
                    accept="image/*"
                    prepend-icon="mdi-image"
                    variant="outlined"
                    class="mb-4"
                  />
                  
                  <v-text-field
                    v-model="brandSettings.primary_color"
                    label="Cor Primária"
                    type="color"
                    variant="outlined"
                    class="mb-4"
                  />
                  
                  <v-text-field
                    v-model="brandSettings.secondary_color"
                    label="Cor Secundária"
                    type="color"
                    variant="outlined"
                    class="mb-4"
                  />
                  
                  <v-select
                    v-model="brandSettings.typography"
                    :items="fontOptions"
                    label="Tipografia Principal"
                    variant="outlined"
                    class="mb-4"
                  />
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>Tom de Voz & Comunicação</v-card-title>
              <v-card-text>
                <v-form>
                  <v-select
                    v-model="brandSettings.tone_of_voice"
                    :items="toneOptions"
                    label="Tom de Voz"
                    variant="outlined"
                    class="mb-4"
                  />
                  
                  <v-textarea
                    v-model="brandSettings.communication_guidelines"
                    label="Diretrizes de Comunicação"
                    variant="outlined"
                    rows="4"
                    class="mb-4"
                  />
                  
                  <v-textarea
                    v-model="brandSettings.alt_text_rules"
                    label="Regras para Alt Text"
                    variant="outlined"
                    rows="3"
                    class="mb-4"
                  />
                  
                  <v-combobox
                    v-model="brandSettings.forbidden_words"
                    label="Palavras Proibidas"
                    multiple
                    chips
                    variant="outlined"
                  />
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        
        <v-row class="mt-4">
          <v-col cols="12">
            <v-card>
              <v-card-title>Tokens Visuais</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="4">
                    <h4 class="mb-2">Paleta de Cores</h4>
                    <div class="d-flex flex-wrap gap-2">
                      <div
                        v-for="color in brandSettings.color_palette"
                        :key="color"
                        class="color-swatch"
                        :style="{ backgroundColor: color }"
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h4 class="mb-2">Elementos Gráficos</h4>
                    <v-chip-group>
                      <v-chip
                        v-for="element in brandSettings.graphic_elements"
                        :key="element"
                        size="small"
                      >
                        {{ element }}
                      </v-chip>
                    </v-chip-group>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h4 class="mb-2">Estilos de Imagem</h4>
                    <v-chip-group>
                      <v-chip
                        v-for="style in brandSettings.image_styles"
                        :key="style"
                        size="small"
                      >
                        {{ style }}
                      </v-chip>
                    </v-chip-group>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="saveBrandSettings">
                  Salvar Configurações
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-window-item>

      <!-- Canais -->
      <v-window-item value="channels">
        <v-row>
          <v-col
            v-for="channel in channels"
            :key="channel.id"
            cols="12"
            md="4"
          >
            <v-card :class="{ 'border-primary': channel.enabled }">
              <v-card-title class="d-flex justify-space-between align-center">
                <div class="d-flex align-center">
                  <v-icon :icon="channel.icon" class="mr-2" />
                  {{ channel.name }}
                </div>
                <v-switch
                  v-model="channel.enabled"
                  :disabled="channel.name === 'Instagram'"
                  color="primary"
                  hide-details
                />
              </v-card-title>
              
              <v-card-text>
                <p class="text-body-2 mb-4">{{ channel.description }}</p>
                
                <div v-if="channel.enabled">
                  <h4 class="mb-2">Configurações</h4>
                  <v-list density="compact">
                    <v-list-item
                      v-for="config in channel.configs"
                      :key="config.key"
                    >
                      <v-list-item-title>{{ config.label }}</v-list-item-title>
                      <v-list-item-subtitle>{{ config.value }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </div>
                
                <div v-else class="text-center py-4">
                  <v-icon size="48" color="grey-lighten-1">{{ channel.icon }}</v-icon>
                  <p class="text-grey mt-2">Canal desabilitado</p>
                </div>
              </v-card-text>
              
              <v-card-actions v-if="channel.enabled">
                <v-btn
                  :to="channel.route"
                  color="primary"
                  variant="outlined"
                  size="small"
                >
                  Configurar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('business')
const currentBrand = ref(1)

const brands = ref([
  {
    id: 1,
    name: 'Hibrit Agency',
    domain: 'hibrit.com.br',
    color: 'primary'
  },
  {
    id: 2,
    name: 'Cliente Exemplo',
    domain: 'exemplo.com',
    color: 'secondary'
  }
])

const teamMembers = ref([
  {
    id: 1,
    name: 'André Ortega',
    email: 'andre@hibrit.com.br',
    role: 'Admin',
    avatar: 'https://via.placeholder.com/32'
  },
  {
    id: 2,
    name: 'Designer',
    email: 'design@hibrit.com.br',
    role: 'Editor',
    avatar: 'https://via.placeholder.com/32'
  }
])

const brandSettings = ref({
  logo: null,
  primary_color: '#6366F1',
  secondary_color: '#8B5CF6',
  typography: 'Inter',
  tone_of_voice: 'profissional_amigavel',
  communication_guidelines: 'Sempre usar linguagem clara e objetiva. Evitar jargões técnicos desnecessários.',
  alt_text_rules: 'Descrever elementos visuais importantes. Mencionar texto presente na imagem.',
  forbidden_words: ['spam', 'clickbait'],
  color_palette: ['#6366F1', '#8B5CF6', '#F59E0B', '#10B981'],
  graphic_elements: ['Gradientes', 'Ícones minimalistas', 'Formas geométricas'],
  image_styles: ['Fotografia clean', 'Ilustrações flat', 'Mockups modernos']
})

const fontOptions = [
  'Inter',
  'Roboto',
  'Poppins',
  'Montserrat',
  'Open Sans'
]

const toneOptions = [
  { title: 'Profissional Amigável', value: 'profissional_amigavel' },
  { title: 'Casual Descontraído', value: 'casual_descontraido' },
  { title: 'Técnico Especializado', value: 'tecnico_especializado' },
  { title: 'Inspiracional Motivador', value: 'inspiracional_motivador' }
]

const channels = ref([
  {
    id: 1,
    name: 'Instagram',
    icon: 'mdi-instagram',
    enabled: true,
    description: 'Canal principal para conteúdo visual e engajamento.',
    route: '/channels/instagram',
    configs: [
      { key: 'handle', label: 'Handle', value: '@hibrit_agency' },
      { key: 'auto_publish', label: 'Auto Publish', value: 'Ativo' }
    ]
  },
  {
    id: 2,
    name: 'YouTube',
    icon: 'mdi-youtube',
    enabled: false,
    description: 'Conteúdo em vídeo de longa duração e tutoriais.',
    route: '/channels/youtube',
    configs: []
  },
  {
    id: 3,
    name: 'Blog',
    icon: 'mdi-post',
    enabled: false,
    description: 'Artigos detalhados e conteúdo SEO-otimizado.',
    route: '/channels/blog',
    configs: []
  }
])

const getRoleColor = (role) => {
  const colors = {
    'Admin': 'error',
    'Editor': 'primary',
    'Viewer': 'grey'
  }
  return colors[role] || 'grey'
}

const saveBrandSettings = () => {
  // TODO: Implementar salvamento das configurações de marca
  console.log('Saving brand settings:', brandSettings.value)
}
</script>

<style scoped>
.color-swatch {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}
</style>