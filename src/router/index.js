import { createRouter, createWebHistory } from 'vue-router'
// TODO: look into "lazy loading" at some point, ran out of time /M
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import InvoicesView from '../views/InvoicesView.vue'
import MoveFormView from '../views/MoveFormView.vue'
import ProfileView from '../views/ProfileView.vue'
import { getAccessToken } from '../services/token.js'
import { refreshAuth } from '../services/api.js'

let initialAuthChecked = false

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: LoginView },
    { path: '/', component: DashboardView, meta: { requiresAuth: true } },
    {
      path: '/fakturor',
      component: InvoicesView,
      meta: { requiresAuth: true },
    },
    { path: '/flytt', component: MoveFormView, meta: { requiresAuth: true } },
    { path: '/profil', component: ProfileView, meta: { requiresAuth: true } },
  ],
})

// "auth" -- keeps unauthorized users out :)
router.beforeEach(async (to) => {
  if (!initialAuthChecked) {
    initialAuthChecked = true
    if (!getAccessToken()) {
      await refreshAuth()
    }
  }
  if (to.meta.requiresAuth && !getAccessToken()) {
    return '/login'
  }
})

export default router
