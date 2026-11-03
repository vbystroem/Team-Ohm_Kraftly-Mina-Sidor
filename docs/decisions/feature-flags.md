# Beslut: Hur ska vi hantera feature flags för Norge-expansionen?

**Datum:** 2026-09-24 
**Beslut:** Vi använder körtidskonfiguration (`docker/40-runtime-config.sh` som skapar `public/config.js` vid start av containern). På så sätt kan exakt samma Docker-image rullas från staging till produktion utan att behöva byggas om ("bygg en gång").

## Bakgrund

Vi behövde kunna aktivera Norge-expansionen i staging utan att funktionen automatiskt blev aktiv i produktion. Samtidigt ville vi följa principen om att bygga en enda Docker-image och använda samma image i både staging och produktion.

## Alternativ vi jämförde

|                  | Körtidsflagga (`config.js`, valt)                                     | Byggtidsflagga (`VITE_...`)                              | Separata branches                                                                 |
| ---------------- | --------------------------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Hur det fungerar | Flaggan sätts via miljövariabeln `FEATURE_NORWAY` vid containerstart. | Flaggan bakas in i JavaScript-koden vid `npm run build`. | En branch används för staging och en för produktion.                              |
| Byggprocess      | Samma Docker-image kan användas i båda miljöerna.                     | En ny build krävs för varje miljö.                       | Det blir två olika builds och SHA-värden.                                         |
| Drift och risk   | Kräver ett entrypoint-skript i Nginx för att skapa konfigurationen.   | Olika images används i staging och produktion.           | Risk för merge-strul och att man inte testar samma image som går till produktion. |

## Motivering

Vi valde körtidskonfiguration eftersom det är det alternativ som följer principen om att bygga en enda gång. Samma image testas i staging, godkänns manuellt och deployas sedan till produktion via deploy-hook. Om vi behöver slå av eller på funktionen ändrar vi miljövariabeln i Render och startar om containern. Då behövs ingen ny build. Priset är att vi behöver underhålla ett extra entrypoint-skript i Nginx.

## Konsekvenser

- Samma Docker-image kan användas i staging och produktion.
- Norge-funktionen kan vara aktiverad i staging men avstängd i produktion.
- Vi kan ändra flaggans värde utan att bygga en ny image.
- Lösningen kräver att konfigurationen skapas vid containerstart.
- **Omprövas om** vi behöver hantera många fler funktioner eller miljöspecifika inställningar, eller om körtidskonfigurationen inte längre fungerar på ett tillförlitligt sätt.

## Hur vi hanterar det

- **I koden:** Flaggor kontrolleras via `isEnabled('norway')` från `src/utils/features.js`, aldrig direkt via `window`.
- **I miljöerna:** `FEATURE_NORWAY=true` är satt i Render på staging, men lämnas tom eller avstängd i produktion.
- **När ska flaggan tas bort?** När Norge-lanseringen är live i produktion och affärerna är klara ska flaggan tas bort ur koden och kortet göras permanent. Tech lead bokar in detta som teknisk skuld till våren 2027.
