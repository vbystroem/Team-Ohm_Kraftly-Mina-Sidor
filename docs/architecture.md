# Arkitektur

## Översikt

```mermaid
flowchart LR
  subgraph kund["Kundens webbläsare"]
    SPA["Vue 3-SPA<br/>Pinia · vue-router"]
  end
  subgraph render["Render – en container per miljö"]
    NGINX["nginx<br/>statiska filer + config.js<br/>proxy för /api"]
  end
  API["Kraftlys API v2<br/>(lokalt: mock-API)"]
  CI["GitHub Actions"] -->|"samma image (sha)<br/>staging → prod"| NGINX
  SPA -->|"index.html, assets"| NGINX
  SPA -->|"/api/v2/… med Bearer-token"| NGINX
  NGINX -->|"proxy_pass + API-nyckeln"| API
```

Appen är en Vue 3-SPA som byggs till statiska filer och serveras av nginx (se [`docs/decisions/rendering.md`](decisions/rendering.md)). Nginx proxar `/api`-anrop med API-nyckeln och skapar `config.js` vid containerstart. Utan server-rendering behövs ingen Node-server i drift, vilket gör skalning och drift enkel.

## Lagren i frontend

| Lager         | Ansvar                                       | Regel                                                                                                        |
| ------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `views/`      | Sidorna routern känner till                  | Hämtar data via stores – undantag: `LoginView`, `InvoicesView` och `MoveFormView` anropar `services/` direkt |
| `components/` | Återanvändbara delar (`KButton`, `KField` …) | Vet ingenting om API:t                                                                                       |
| `stores/`     | Tillstånd som delas mellan vyer (Pinia)      | Anropar `services/`                                                                                          |
| `services/`   | HTTP mot API:t, token i minnet               | Ingen Vue-kod                                                                                                |
| `utils/`      | Rena funktioner                              | Inga sidoeffekter – därför lätta att testa                                                                   |
| `router/`     | Rutterna och vakten för inloggning           | Kontrollerar token och förnyar session via `refreshAuth()` i `beforeEach`                                    |

Beroendena pekar nedåt: vy → store → service. Aldrig tvärtom.

## Ett flöde: inloggningen

```mermaid
sequenceDiagram
  actor Kund
  participant App as LoginView + services/
  participant API as Kraftlys API v2

  Kund->>App: Loggar in (e-post & lösenord)
  App->>API: POST /api/v2/auth/login
  API-->>App: access token + httpOnly refresh-cookie
  App->>App: Sparar token i minnet & går till /
  App->>API: GET /api/v2/user (Bearer token)
  API-->>Kund: Visar Mina sidor
```

## Miljöer

| Miljö        | Adress                                        | Uppdateras                                 | Norge-flaggan | API             |
| ------------ | --------------------------------------------- | ------------------------------------------ | ------------- | --------------- |
| Dev (lokalt) | http://localhost:8080 (Docker) · :5173 (Vite) | när du vill                                | på            | mock-API        |
| Staging      | https://kraftly-ohm-staging.onrender.com      | varje merge till `main`                    | på            | Kraftlys API v2 |
| Prod         | https://kraftly-ohm.onrender.com              | samma image som staging, efter godkännande | av            | Kraftlys API v2 |

Samma image går genom miljöerna – konfigurationen skiljer dem åt, inte koden.

## Beslut

De tre viktigaste – alla beslut finns i [`docs/decisions/`](decisions/README.md):

- [Hosting](decisions/hosting.md) – en container på Render, imagen byggs en gång
- [Tokenlagring](decisions/tokenlagring.md) – access token i minnet, refresh i httpOnly-cookie
- [Feature flags](decisions/feature-flags.md) – Norge bakom en flagga som läses vid körtid
