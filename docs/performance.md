# Prestanda

## Så mäter vi

Dashboarden: Chrome DevTools → Performance → Local metrics, produktionsbygget, enhetsläge
iPhone 12 Pro, Fast 4G, cache av, median av tre. /login: Lighthouse CI i pipelinen. JavaScript: gzip i `npm run build`.

## Budgeten

| Mått       | Budget  | Var                         | Varför just den                       |
| ---------- | ------- | --------------------------- | ------------------------------------- |
| LCP        | ≤ 2,5 s | /Dashboarden, lokal mätning | Målet enligt uppgiftens prestandakrav |
| CLS        | ≤ 0,1   | /Dashboarden, lokal mätning | Målet enligt uppgiftens prestandakrav |
| JavaScript | ≤ … kB  | /login i CI                 | vi ligger på … kB                     |

## Optimeringarna

### 1. Hero bilden

<Vad var problemet, vad gjorde vi, länk till PR:en.>

Problemet var att dashboarden använde hero.png, som var 6 485 318 byte. Vi konverterade bilden till WebP och använder nu hero.webp, som är 5 004 byte. Vi lade till width, height, alt="" och fetchpriority="high" i bildtaggen samt height: auto i CSS.

### 2. Diagrammets reserverade utrymme

Vi lade Laddar… och ConsumptionChart i en gemensam <div class="chart-box"> och lade till aspect-ratio: 2 / 1 i CSS. Syftet är att reservera plats för diagrammet och minska layoutförskjutningar när data laddas.

|     | Före   | Efter  |
| --- | ------ | ------ |
| LCP | 8,49 s | 1,06 s |
| CLS | 0,03   | 0,00   |
| INP | 8 ms   | 8 ms   |

### 3. Lazy routes

|                  | Före      | Efter     |
| ---------------- | --------- | --------- |
| index.js         | 141,61 kB | 40,24 kB  |
| DashboardView.js | –         | 100,08 kB |
| LoginView.js     | –         | 1,08 kB   |
| InvoicesView.js  | –         | 0,70 kB   |
| MoveFormView.js  | –         | 1,16 kB   |
| ProfileView.js   | –         | 0,88 kB   |

### 4. Lodash bort

|          | Före      | Efter     |
| -------- | --------- | --------- |
| index.js | 141,61 kB | 114,02 kB |

### 5. Chart.js

|          | Före      | Efter     |
| -------- | --------- | --------- |
| index.js | 141,61 kB | 120,27 kB |

### 6. Komprimering

Before: 102 044 byte
After: 45 167 byte
Saved - 56%

## Flaskhalsen vi inte äger

<API-fördröjningen: var den syns, vad vi gjorde åt vår del.>

/api/v2/consumption tar 646,72 ms att få svar från. API tillhör Kraftlys test-API, så fördröjningen ligger utanför vår kontroll. Vi konverterade hero-bilden från PNG till WebP för att minska filstorleken och prioritera bildens laddning. Vi reserverade även plats för diagrammet med aspect-ratio: 2 / 1 för att minska layoutförskjutningar medan data laddas.
