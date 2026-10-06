import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchUser, fetchConsumption, fetchInvoices } from './api'

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
  it('rejects when a protected endpoint responds 401 without a token', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 401,
      json: () => Promise.resolve({}),
    })
    await expect(fetchInvoices()).rejects.toThrow('API error 401')
  })
})
