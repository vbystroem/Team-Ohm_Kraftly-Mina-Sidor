# Skalning – Kraftly Mina sidor

## Vad vi vet om trafiken

Vi har ca 40 000 kunder i månaden med tre tydliga toppar:

1. **Fakturadagen (~25:e varje månad):** Alla loggar in och kollar elfakturan.
2. **Elprisnyheter / köldknäpp:** Många kollar spotpriser samtidigt.
3. **Norge-expansionen:** +25–40 % fler kunder på sikt.

**Worst-case uppskattning:** Om 10 % (4 000 användare) loggar in under samma timme och klickar runt (~12 anrop var) landar vi på runt **13 req/s i snitt** med spikar uppåt **40–45 req/s**.

## Vad vi mätte

Körde `npx autocannon` (50 anslutningar i 10 sekunder) mot lokal container och 10 anslutningar mot Render staging.

| Anrop                             | Req/s (avg) | p99   | Kommentar                                                        |
| --------------------------------- | ----------- | ----- | ---------------------------------------------------------------- |
| `GET /` (lokalt)                  | 9 530       | 19 ms | Statisk HTML ur Nginx minne. Supersnabbt.                        |
| `GET /assets/index-*.js` (lokalt) | 1 823       | 46 ms | Stor JS-fil, bandbredden sätter stopp men svarstiderna är fina.  |
| `GET /api/user` (lokalt)          | 371         | 77 ms | Express mock-API. Node köar upp anropen.                         |
| `GET /` (staging på Render)       | 222         | 64 ms | Gratisinstans med delade resurser och nätverkslatens. Helt okej. |

## Vad siffrorna säger

- **Flaskhalsen är backend/API:et (`/api/*`), inte Nginx eller frontenden.** Nginx sväljer utan problem 9 500 req/s, medan Node-API:et storknar redan runt 370 req/s.
- **Frontend har enorm marginal.** Vår värsta gissning är ~45 req/s. En enda Nginx-container klarar över 200 gånger den lasten.

## Vad vi gjorde

1. **Cache-headers:** Vite skapar unika hashade filnamn (`/assets/index-*.js`). Vi satte `Cache-Control: public, max-age=31536000, immutable` på `/assets/`, medan `index.html`, `config.js` och `version.txt` körs med `no-cache`. Återkommande användare laddar all JS/CSS från disk utan nätverksanrop.
2. **CDN:** Cloudflare ligger redan framför Render som standard. Behövs mer kräm senare kan vi slå på edge-caching av `/assets/` utan några kodändringar.
3. **Fler instanser:** Behövs inte i dagsläget. Först om vi ser ihållande trafik över **1 500 req/s** eller om Render-burken maxar CPU:n över 80 % behöver vi skala upp containern.
4. **Backend-snacket:** API:et är flaskhalsen. Vi föreslår att backend-teamet sätter caching (`stale-while-revalidate`) på tunga endpoints som `/api/consumption`, ser över databasindex och minskar kallstarter.

## Varför (inte) Kubernetes?

Tre enkla anledningar:

1. **Onödigt komplext:** Vi har en ren statisk SPA bakom Nginx. K8s innebär massor av extra overhead och driftjobb för noll verklig vinst här.
2. **Kapaciteten räcker:** En container klarar 9 500 req/s. Vårt tak är ~45 req/s. Vi behöver ingen automatisk horisontell pod-skalning.
3. **Kostnad:** Renders hanterade instanser sköter SSL, deploys och DNS billigare och smidigare än ett eget kluster.

## När stänger man flagga vs kör rollback?

|                | Feature flag                                                                      | Rollback                                                                                              |
| -------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Tar**        | ~10–30 sek (ändra env-variabel i Render och spara)                                | 26 sek (via GitHub Actions `rollback.yml`)                                                            |
| **Påverkar**   | Bara den specifika funktionen (t.ex. Norge-kortet göms)                           | Hela releasen backas till tidigare image                                                              |
| **Passar när** | Felet rör bara den nya funktionen, eller om en feature måste pausas av affärsskäl | Releasen är helt trasig: vit skärm, appen startar inte eller allvarlig regressionsbugg på hela sajten |

**Regeln vi kör på:** Rör buggen bara funktionen bakom flaggan? Slå av flaggan i Render så fungerar resten av sajten felfritt under tiden. Är sajten nere eller hela bygget trasigt? Rulla tillbaka imagen via rollback-pipelinen.
