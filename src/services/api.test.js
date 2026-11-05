import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchUser, fetchConsumption, fetchInvoices, refreshAuth } from './api'
import { getAccessToken, setAccessToken } from './token'

beforeEach(() => {
  global.fetch = vi.fn()
  setAccessToken(null)
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
  it('stores accessToken from refreshAuth response', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ accessToken: 'jwt-from-api-v2' }),
    })
    const refreshed = await refreshAuth()
    expect(refreshed).toBe(true)
    expect(getAccessToken()).toBe('jwt-from-api-v2')
  })
})
