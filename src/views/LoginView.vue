<template>
  <div class="login-wrap">
    <div class="card login-card">
      <img
        src="../assets/logo-dark.svg"
        alt="Kraftly logotyp"
        class="login-logo"
      />
      <h1>Logga in på Mina sidor</h1>

      <KField
        id="login-email"
        v-model="email"
        label="E-postadress"
        type="email"
        autocomplete="username"
      />

      <KField
        id="login-password"
        v-model="password"
        label="Lösenord"
        type="password"
        autocomplete="current-password"
      />

      <KButton block @click="handleLogin">Logga in</KButton>

      <div v-if="error" role="alert" style="margin-top: 10px">
        {{ error }}
      </div>

      <p class="hint" style="margin-top: 10px">
        Problem att logga in? Ring kundservice 020-123 456
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import KButton from '../components/KButton.vue'
import KField from '../components/KField.vue'
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
