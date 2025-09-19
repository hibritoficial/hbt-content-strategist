<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="4">
        <v-card elevation="8" rounded="lg">
          <v-card-text class="pa-8">
            <div class="text-center mb-6">
              <h1 class="text-h4 font-weight-bold text-primary">
                Hibrit Content Strategist
              </h1>
              <p class="text-subtitle-1 text-grey-darken-1 mt-2">
                Modo Instagram v1
              </p>
            </div>

            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                :rules="[rules.required, rules.email]"
                class="mb-4"
                autofocus
              />

              <v-text-field
                v-model="password"
                label="Senha"
                :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                variant="outlined"
                :rules="[rules.required]"
                class="mb-6"
                @click:append-inner="showPassword = !showPassword"
              />

              <v-btn
                type="submit"
                color="primary"
                size="large"
                block
                :loading="authStore.loading"
                class="mb-4"
              >
                Entrar
              </v-btn>
            </v-form>

            <v-alert
              v-if="error"
              type="error"
              variant="tonal"
              class="mt-4"
            >
              {{ error }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('email@andreortega.com')
const password = ref('12345678')
const showPassword = ref(false)
const error = ref('')

const rules = {
  required: value => !!value || 'Campo obrigatório',
  email: value => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || 'Email inválido'
  }
}

const handleLogin = async () => {
  error.value = ''
  
  const result = await authStore.signIn(email.value, password.value)
  
  if (result.success) {
    router.push('/')
  } else {
    error.value = result.error
  }
}
</script>