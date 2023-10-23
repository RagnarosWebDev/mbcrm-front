<script setup lang="ts">
import { ref } from 'vue'
import { loginRequest } from '@api/index.ts'
import { handleRequest } from '@api/handle.ts'
import { TokenPair } from '@models/token-pair.ts'
import { useAuth } from '@store/auth.store.ts'
import router from '../../router'

const login = ref('')
const password = ref('')

const loginClicked = () => {
  handleRequest(loginRequest(login.value, password.value), (e: TokenPair) => {
    useAuth().changeToken({
      ...e,
    })
    router.push({
      path: '/',
    })
  })
}
</script>

<template>
  <div class="container">
    <VCard class="login-container">
      <VCardItem class="text-lg-h3">Вход</VCardItem>
      <VCardText>
        <VForm>
          <VTextField v-model="login" label="Логин" required />
          <VTextField
            v-model="password"
            label="Пароль"
            type="password"
            required
          />
          <VBtn @click="loginClicked" variant="outlined" :block="true"
            >Войти</VBtn
          >
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.login-container {
  margin: auto;
  width: 600px;
}
</style>
