import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from './user'

describe('user store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with null user', () => {
    const store = useUserStore()
    expect(store.user).toBe(null)
  })
})
