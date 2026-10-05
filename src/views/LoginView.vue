<template>
  <div class="login-wrap">
    <div class="card login-card">
      <img
        src="../assets/logo-dark.svg"
        alt="Kraftly logotyp"
        class="login-logo"
      />
      <h1>Logga in på Mina sidor</h1>
      <input v-model="email" type="text" placeholder="E-postadress" />
      <input v-model="password" type="password" placeholder="Lösenord" />
      <button class="btn" style="width: 100%" @click="handleLogin">
        Logga in
      </button>
      <div v-if="error" role="alert" style="margin-top: 10px">{{ error }}</div>
      <p class="hint" style="margin-top: 10px">
        Problem att logga in? Ring kundservice 020-123 456
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/api'
import { setAccessToken } from '../services/token'

const email = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()

const handleLogin = async () => {
  error.value = null
  try {
    const data = await login(email.value, password.value)
    setAccessToken(data.token)
    router.push('/')
  } catch {
    error.value = 'Fel e-post eller lösenord'
  }
}
</script>

<style scoped>
.login-wrap {
  display: flex;
  justify-content: center;
  padding-top: 60px;
}
.login-card {
  width: 380px;
}
.login-logo {
  height: 34px;
  margin-bottom: 18px;
}
</style>
