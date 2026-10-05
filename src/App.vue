<template>
  <div v-if="appEnv !== 'production'" class="env-banner">
    {{ appEnv.toUpperCase() }}
  </div>
  <div>
    <header v-if="$route.path !== '/login'" class="topbar">
      <div class="topbar-inner container">
        <img src="./assets/logo.svg" class="logo" />
        <nav>
          <RouterLink to="/">Översikt</RouterLink>
          <RouterLink to="/fakturor">Fakturor</RouterLink>
          <RouterLink to="/flytt">Flyttanmälan</RouterLink>
          <RouterLink to="/profil">Mina uppgifter</RouterLink>
          <span class="logout" @click="logout">Logga ut</span>
        </nav>
      </div>
    </header>
    <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { setAccessToken } from './services/token'

const router = useRouter()
const appEnv = window.__KRAFTLY__?.env ?? 'lokal'

const logout = () => {
  setAccessToken(null)
  router.push('/login')
}
</script>

<style>
.topbar {
  background: #101d3d;
}
.topbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  padding-bottom: 14px;
}
.logo {
  height: 30px;
}
.topbar nav a,
.logout {
  color: #c2cbe4;
  text-decoration: none;
  margin-left: 22px;
  font-size: 14.5px;
  cursor: pointer;
}
.topbar nav a.router-link-active {
  color: #fff;
  font-weight: 600;
}
.env-banner {
  width: 100vw;
  height: 30px;
  background-color: #ffffaa;
  color: #816f00;
}
</style>
