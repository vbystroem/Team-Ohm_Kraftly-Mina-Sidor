# Beslut: Feature flags (Norge-expansionen)

**Datum:** 2026-09-24  
**Beslut:** Vi kör körtidskonfiguration (`docker/40-runtime-config.sh` som skapar `public/config.js` vid start av containern). På så sätt kan exakt samma Docker-image rullas från staging till produktion utan att behöva byggas om ("bygg en gång").

## Alternativen vi vägde mellan

| Alternativ                      | Hur det funkar                                                | Bryter mot "bygg en gång"?          | Nackdel                                                                     |
| ------------------------------- | ------------------------------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------- |
| **Separata branches**           | En branch för staging och en för prod                         | Ja, blir två olika builds/sha       | Risk för merge-strul och man testar inte samma image som går till prod      |
| **Byggtidsflagga (`VITE_...`)** | Bakas in i JS-koden vid `npm run build`                       | Ja, kräver ny build för varje miljö | Olika images i staging och prod; godkännande i staging garanterar inte prod |
| **Körtidsflagga (`config.js`)** | Sätts via env-variabler (`FEATURE_NORWAY`) vid containerstart | **Nej**, samma image överallt       | Kräver ett entrypoint-skript i Nginx                                        |

## Varför vi valde körtidsflagga

Det är det enda alternativet som följer principen om att bygga en enda gång. Samma image testas i staging, godkänns manuellt och deployas till prod via deploy-hook. Behöver vi slå av/på något ändrar vi bara miljövariabeln i Render och startar om – ingen ny release eller ombyggnad behövs.

## Hur vi hanterar det

- **I koden:** Kolla alltid flaggor via `isEnabled('norway')` från `src/utils/features.js`, aldrig direkt på `window`.
- **I miljöerna:** `FEATURE_NORWAY=true` är satt i Render på staging, men lämnas tom/av i prod.
- **När ska den bort?** När Norge-lanseringen väl är live i prod och affärerna är klara städar vi bort flaggan ur koden och gör kortet permanent. Tech lead bokar in det som en tech-skuld till våren 2027.
