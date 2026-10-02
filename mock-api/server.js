// Simple mock of Kraftly's API. Built for the demo -- NOT for production.
// Webbmakarna AB / M & J

// Konfiguration kommer från miljön. Lokalt läses .env (om den finns).
try {
  process.loadEnvFile()
} catch {
  // ingen .env – helt normalt i en container
}

// API_KEYS = flera klienter, en nyckel var: "volt:abc123,ampere:def456"
// API_KEY  = en enda nyckel (det räcker lokalt)
const keys = new Map(
  (
    process.env.API_KEYS ||
    (process.env.API_KEY ? `lokal:${process.env.API_KEY}` : '')
  )
    .split(',')
    .map((entry) => entry.trim())
    .map((entry) => [
      entry.slice(0, entry.indexOf(':')),
      entry.slice(entry.indexOf(':') + 1),
    ])
    .filter(([name, key]) => name && key)
    .map(([name, key]) => [key, name]),
)
if (keys.size === 0) {
  console.error(
    'API_KEY saknas. Lokalt: kopiera .env.example till .env. I molnet: sätt variabeln hos plattformen.',
  )
  process.exit(1)
}

const express = require('express')
const { randomUUID } = require('node:crypto')
const app = express()
app.use(express.json())

// Testkontot (se Canvas "Testkonton v.7")
const TEST_PASSWORD = 'kraftly-anna'
const REFRESH_COOKIE = 'kraftly_refresh'

// accessTokens = korta token i minnet, refreshTokens = sessionen bakom cookien
const accessTokens = new Set()
const refreshTokens = new Set()

const newToken = () => randomUUID()

// Varje anrop till /api/v2 måste ha en giltig nyckel
app.use('/api/v2', (req, res, next) => {
  const client = keys.get(req.get('X-Api-Key'))
  if (!client) {
    console.log(
      `401 ${req.method} ${req.originalUrl} – saknad eller ogiltig nyckel`,
    )
    return res.status(401).json({ error: 'Saknad eller ogiltig API-nyckel' })
  }
  console.log(`[${client}] ${req.method} ${req.originalUrl}`)
  next()
})

// Kräver en giltig access token i Authorization-headern.
const requireAccessToken = (req, res, next) => {
  const auth = req.get('Authorization') || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  if (!accessTokens.has(token)) {
    console.log(`401 ${req.method} ${req.originalUrl} – ogiltig token`)
    return res.status(401).json({ error: 'Ogiltig eller saknad token' })
  }
  next()
}

// Skyddar allt under /api/v2 utom /auth/* – där får man ju sin token.
app.use('/api/v2', (req, res, next) =>
  req.path.startsWith('/auth') ? next() : requireAccessToken(req, res, next),
)

const user = {
  id: 1,
  name: 'Anna Andersson',
  email: 'anna.andersson@example.com',
  address: 'Solvägen 12, 802 67 Gävle',
  contract: 'Rörligt pris',
  customerNo: 'K-104233',
}

const invoices = [
  {
    id: 'F-2026-06',
    period: 'Juni 2026',
    amount: 412,
    status: 'Obetald',
    due: '2026-07-31',
  },
  {
    id: 'F-2026-05',
    period: 'Maj 2026',
    amount: 486,
    status: 'Betald',
    due: '2026-06-30',
  },
  {
    id: 'F-2026-04',
    period: 'April 2026',
    amount: 655,
    status: 'Betald',
    due: '2026-05-31',
  },
  {
    id: 'F-2026-03',
    period: 'Mars 2026',
    amount: 918,
    status: 'Betald',
    due: '2026-04-30',
  },
  {
    id: 'F-2026-02',
    period: 'Februari 2026',
    amount: 1204,
    status: 'Betald',
    due: '2026-03-31',
  },
  {
    id: 'F-2026-01',
    period: 'Januari 2026',
    amount: 1345,
    status: 'Betald',
    due: '2026-02-28',
  },
]

const consumption = {
  unit: 'kWh',
  months: [
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dec',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Maj',
    'Jun',
  ],
  values: [210, 195, 260, 340, 520, 680, 730, 640, 470, 320, 240, 205],
  pricePerKwh: 1.42,
}

app.post('/api/v2/auth/login', (req, res) => {
  const { email, password } = req.body
  if (email !== user.email || password !== TEST_PASSWORD) {
    return res.status(401).json({ error: 'Fel e-post eller lösenord' })
  }
  const token = newToken()
  const refresh = newToken()
  accessTokens.add(token)
  refreshTokens.add(refresh)
  res.cookie(REFRESH_COOKIE, refresh, { httpOnly: true, sameSite: 'lax' })
  res.json({ token, name: user.name })
})

app.post('/api/v2/auth/refresh', (req, res) => {
  // Plockar ut refresh-cookien ur Cookie-headern
  const refresh = /(?:^|;\s*)kraftly_refresh=([^;]+)/.exec(
    req.get('cookie') || '',
  )?.[1]
  if (!refresh || !refreshTokens.has(refresh)) {
    return res.status(401).json({ error: 'Ingen giltig session' })
  }
  const token = newToken()
  accessTokens.add(token)
  res.json({ token })
})

app.get('/api/v2/user', (req, res) => res.json(user))

app.get('/api/v2/consumption', (req, res) => {
  // quick fix: dashboard felt too fast in the demo, added a delay so the spinner shows /J
  setTimeout(() => res.json(consumption), 600)
})

app.get('/healthz', (req, res) => res.json({ ok: true }))

app.get('/api/v2/invoices', (req, res) => res.json(invoices))

app.post('/api/v2/move', (req, res) => {
  console.log('Move request:', req.body)
  res.json({
    ok: true,
    ref: 'FLYTT-' + Math.floor(Math.random() * 90000 + 10000),
  })
})

app.put('/api/v2/user', (req, res) => {
  Object.assign(user, req.body)
  res.json(user)
})

// Plattformen bestämmer porten. Lokalt: 4000.
const port = process.env.PORT || 4000
app.listen(port, () =>
  console.log(`Mock API on port ${port} – ${keys.size} nyckel/nycklar laddade`),
)
