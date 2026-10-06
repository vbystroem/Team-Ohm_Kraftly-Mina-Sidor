[![CI](https://github.com/vbystroem/Team-Ohm_Kraftly-Mina-Sidor/actions/workflows/ci.yaml/badge.svg)](https://github.com/vbystroem/Team-Ohm_Kraftly-Mina-Sidor/actions/workflows/ci.yaml)

# Kraftly Mina Sidor

Kundportal för Kraftly. Levereras av Webbmakarna AB.

## Getting started

### Lokalt Med Docker

Kräver Docker och Docker Compose.

```bash
# Bygg och starta alla tjänster (frontend + mock-API)
docker compose up --build

# Portalen är tillgänglig på http://localhost:8080
```

### Staging

börja med att kopiera .env filen för att komma åt api nyckeln till staging-miljön

```bash
cp .env.example .env

# Detta kopierar innehållet i .env.example till en ny .env fil som inte pushas upp till repot.
```

Gå in på https://kraftly-ohm-staging.onrender.com för att komma åt stagingmiljön

### Produciton

Gå in på https://kraftly-ohm.onrender.com för att komma åt produktionsmiljön

### Utan Docker

Kräver Node.js 22+.

```bash
# Installera beroenden
npm install

# Starta mock-API i en terminal
npm run api

# Starta frontend i en annan terminal
npm run dev

# Portalen är tillgänglig på http://localhost:5173
```

## Projektstruktur

- `src/` – Vue.js-frontend
- `mock-api/` – Mock-API för lokal utveckling
- `nginx.conf` – Nginx-konfiguration för produktion
- `Dockerfile` – Multi-stage build (Node → nginx)
- `docker-compose.yml` – Lokal utvecklingsmiljö

# Working agreement

## Schema:

Vi ses 10:00 i skolan på fredagar, och jobbar distans på måndagar och tisdagar. Om något annat är planerat på fredagen ses vi i skolan måndag kl.10.00 veckan efter.

## Pull Requests:

Minst en annan person måste granska koden innan den mergeas till main, vi följer ett PR template som finns i .github>pull_request_template.md

## Kommunikation:

Discord som huvudkanal, där vi sköter all kommunikation.

## Tech Lead (subject to change om Nancy hänger med):

Vecka 1-4: Veronica
Vecka 5-8: Kim
Vecka 9-12: Andryan
