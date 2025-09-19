<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center mb-6">
          <div>
            <h1 class="text-h4">YouTube</h1>
            <p class="text-subtitle-1 text-grey-darken-1">
              Canal em desenvolvimento • Funcionalidades futuras
            </p>
          </div>
          <v-chip color="warning" variant="flat">
            <v-icon start>mdi-clock</v-icon>
            Em Breve
          </v-chip>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text class="text-center py-12">
            <v-icon size="120" color="grey-lighten-1">mdi-youtube</v-icon>
            <h2 class="text-h5 mt-4 mb-2">YouTube em Desenvolvimento</h2>
            <p class="text-body-1 text-grey-darken-1 mb-6">
              Este canal será implementado na próxima versão com funcionalidades específicas para YouTube.
            </p>
            
            <v-card variant="outlined" class="mx-auto" max-width="600">
              <v-card-title>Funcionalidades Planejadas</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item prepend-icon="mdi-video">
                    <v-list-item-title>Roteiros para vídeos longos</v-list-item-title>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-youtube-shorts">
                    <v-list-item-title>Templates para YouTube Shorts</v-list-item-title>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-text">
                    <v-list-item-title>Otimização de títulos e descrições</v-list-item-title>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-tag">
                    <v-list-item-title>Sistema de tags específico</v-list-item-title>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-image">
                    <v-list-item-title>Geração de thumbnails</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Placeholder para funcionalidades futuras
</script>