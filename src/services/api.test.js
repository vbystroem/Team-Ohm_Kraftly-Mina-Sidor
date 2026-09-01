import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchUser, fetchConsumption } from './api'

beforeEach(() => {
  global.fetch = vi.fn()
})

describe('API', () => {
  it('calls fetchUser endpoint', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ name: 'Test' }),
    })
    const result = await fetchUser()
    expect(result.name).toBe('Test')
  })
  it('calls fetchConsumption endpoint', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ values: [100] }),
    })
    const result = await fetchConsumption()
    expect(result.values).toEqual([100])
  })
})
