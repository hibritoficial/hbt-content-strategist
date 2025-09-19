<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center mb-6">
          <div>
            <h1 class="text-h4">Instagram</h1>
            <p class="text-subtitle-1 text-grey-darken-1">
              Canal ativo • Configurações e constraints específicas
            </p>
          </div>
          <v-chip color="success" variant="flat">
            <v-icon start>mdi-check-circle</v-icon>
            Ativo
          </v-chip>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Configurações do Canal</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="channelConfig.account_handle"
                label="Handle da Conta"
                prepend-inner-icon="mdi-at"
                variant="outlined"
                class="mb-4"
              />
              
              <v-switch
                v-model="channelConfig.auto_publish"
                label="Publicação Automática"
                color="primary"
                class="mb-4"
              />
              
              <v-select
                v-model="channelConfig.default_format"
                :items="formats"
                item-title="name"
                item-value="id"
                label="Formato Padrão"
                variant="outlined"
                class="mb-4"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="saveChannelConfig">
              Salvar Configurações
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Constraints do Instagram</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-subheader>POSTS</v-list-subheader>
              <v-list-item>
                <v-list-item-title>Caracteres na legenda</v-list-item-title>
                <v-list-item-subtitle>Máximo: 2.200 caracteres</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Hashtags</v-list-item-title>
                <v-list-item-subtitle>Máximo: 30 hashtags</v-list-item-subtitle>
              </v-list-item>
              
              <v-list-subheader>CARROSSEL</v-list-subheader>
              <v-list-item>
                <v-list-item-title>Número de slides</v-list-item-title>
                <v-list-item-subtitle>Máximo: 10 slides</v-list-item-subtitle>
              </v-list-item>
              
              <v-list-subheader>REELS</v-list-subheader>
              <v-list-item>
                <v-list-item-title>Duração</v-list-item-title>
                <v-list-item-subtitle>15s a 90s</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const channelConfig = ref({
  account_handle: '@hibrit_agency',
  auto_publish: true,
  default_format: 2
})

const formats = ref([
  { id: 1, name: 'Post' },
  { id: 2, name: 'Carrossel' },
  { id: 3, name: 'Reels' },
  { id: 4, name: 'Story' }
])

const saveChannelConfig = () => {
  console.log('Saving Instagram config:', channelConfig.value)
}
</script>