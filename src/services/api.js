// API client for Kraftly "Mina sidor"
//
// Ingen nyckel här. Allt i frontendkoden hamnar i JavaScript-filen som browsern laddar
// ner – en nyckel här är publik för alla som trycker F12. Appen anropar /api relativt.
// Servern framför appen (Vite lokalt, nginx i containern) lägger på nyckeln.

import { getAccessToken, setAccessToken } from './token.js'

const BASE_URL = ''

const request = async (path, options = {}, allowRefresh = true) => {
  const token = getAccessToken()
  const res = await fetch(BASE_URL + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
      ...options.headers,
    },
  })

  if (res.status === 401 && allowRefresh) {
    const refreshed = await refreshAuth()
    if (refreshed) {
      return request(path, options, false)
    }
  }

  if (!res.ok) {
    throw new Error('API error ' + res.status)
  }
  return res.json()
}

export const refreshAuth = async () => {
  try {
    const res = await fetch(BASE_URL + '/api/v2/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) return false
    const data = await res.json()
    setAccessToken(data.token)
    return true
  } catch {
    return false
  }
}

export const login = (email, password) =>
  request(
    '/api/v2/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    },
    false,
  )

export const fetchUser = () => request('/api/v2/user')

export const fetchConsumption = () => request('/api/v2/consumption')

export const fetchInvoices = () => request('/api/v2/invoices')

export const submitMove = (data) =>
  request('/api/v2/move', { method: 'POST', body: JSON.stringify(data) })

export const saveUser = (data) =>
  request('/api/v2/user', { method: 'PUT', body: JSON.stringify(data) })
