import { createRouter, createWebHistory } from 'vue-router'
// TODO: look into "lazy loading" at some point, ran out of time /M
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import InvoicesView from '../views/InvoicesView.vue'
import MoveFormView from '../views/MoveFormView.vue'
import ProfileView from '../views/ProfileView.vue'
import { getAccessToken } from '../services/token.js'

const token = getAccessToken()
const isAuthenticated = !!token

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
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated) {
    return '/login'
  }
})

export default router
