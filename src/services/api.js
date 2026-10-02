// API client for Kraftly "Mina sidor"
//
// Ingen nyckel här. Allt i frontendkoden hamnar i JavaScript-filen som browsern laddar
// ner – en nyckel här är publik för alla som trycker F12. Appen anropar /api relativt.
// Servern framför appen (Vite lokalt, nginx i containern) lägger på nyckeln.

const BASE_URL = ''

const request = async (path, options = {}) => {
  const res = await fetch(BASE_URL + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ',
      ...options.headers,
    },
  })
  if (!res.ok) {
    console.log('API error', res.status)
    throw new Error('API error ' + res.status)
  }
  return res.json()
}

export const login = (email, password) =>
  request('/api/v2/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

export const fetchUser = () => request('/api/v2/v2/user')

export const fetchConsumption = () => request('/api/v2/consumption')

export const fetchInvoices = () => request('/api/v2/invoices')

export const submitMove = (data) =>
  request('/api/v2/move', { method: 'POST', body: JSON.stringify(data) })

export const saveUser = (data) =>
  request('/api/v2/user', { method: 'PUT', body: JSON.stringify(data) })
