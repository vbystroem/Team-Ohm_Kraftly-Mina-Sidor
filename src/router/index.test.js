import { describe, it, expect, beforeEach } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'

const localStorageMock = (() => {
  let store = {}
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString() },
    clear: () => { store = {} }
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe("router", () => {
  it("blocks unauthenticated access", async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/dashboard' }, { path: '/login' }]
    })
    router.beforeEach((to) => {
      if (to.path !== '/login' && localStorage.getItem('kraftly_logged_in') !== 'true') {
        return '/login'
      }
    })
    await router.push('/dashboard')
    expect(router.currentRoute.value.path).toBe('/login')
  })
})
