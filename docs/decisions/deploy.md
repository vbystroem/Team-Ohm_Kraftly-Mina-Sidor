# Deploy – Kraftly Mina sidor

## Flödet

(Mermaid-diagram: PR → CI → merge → publish → deploy-staging → Render → verifiering)

## Miljöer

| Miljö          | URL                                      | Image                                                       | API         | Uppdateras                                              |
| -------------- | ---------------------------------------- | ----------------------------------------------------------- | ----------- | ------------------------------------------------------- |
| **Lokal**      | http://localhost:8080/                   | team-ohm_kraftly-mina-sidor                                 | mock-api    | docker compose up --build                               |
| **Staging**    | https://kraftly-ohm-staging.onrender.com | ghcr.io/vbystroem/team-ohm_kraftly-mina-sidor:${GITHUB_SHA} | kraftly-api | Automatiskt via pipeline                                |
| **Production** | https://kraftly-ohm.onrender.com         | ghcr.io/vbystroem/team-ohm_kraftly-mina-sidor:${GITHUB_SHA} | kraftly-api | Efter godkännande i GitHub Actions (APP_ENV=production) |

## Konfiguration – var bor vad?

             | Variabel | Hemlig? | Lokalt | Staging                         |  Används av |
             API_KEY,   |  Ja     |  .env  | Render Environment Variables    |  nginx
             API_URL,   |  Nej    |  .env  | Render Environment Variables    |  nginx
             PORT,      |  Nej    |   80   |  10000                          |  nginx
     RENDER_DEPLOY_HOOK,|  Ja     |   Nej  |  Github secret                  |  ci.yaml
            STAGING_URL,|  Nej    |   Nej  |  Github variable                |  ci.yaml
           GITHUB_TOKEN |  Ja     |   Nej  |  GHCR Password                  |  ci.yaml

## API-nyckeln

Vad hände med den gamla, varför den är död (curl-utskriften med 401), var den nya ligger.

Den gamla api nyckeln ligger kvar men vi behöver inte ta bort därför att den är inaktiv

Skrev ni om historiken? Varför / varför inte?

Vi skrev inte om historiken, för att vi inte behövde.

## Rollback

Två sätt, steg för steg. Hur ni kontrollerar att det lyckades.

Vi skippade rollback i mån av tid

## Tider (uppmätta)

| Steg | Tid |
(merge → publish klar · 41s
hook → rätt sha svarar · 2s
totalt · kallstart) 2m 20s

## Kända begränsningar

(kallstart, vem som äger Render-kontot, arm64 vs amd64, ingen prod ännu)

Render konto: Kimkarhusaari@gmail.com

ingen prod ännu
