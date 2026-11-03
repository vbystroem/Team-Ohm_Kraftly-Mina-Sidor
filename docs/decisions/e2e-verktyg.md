# Beslut: verktyg för E2E-tester

**Datum:** 2026-09-01  
**Beslut:** Vi använder Cypress för end-to-end-tester.

## Bakgrund

Vi behövde bestämma vilket E2E-testverktyg vi skulle fortsätta använda under kursens gång.

## Alternativ vi jämförde

|                        | Cypress (valt)                                                               | Playwright                                                                                 |
| ---------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Vad som skiljer dem åt | Vi hade erfarenhet av Cypress sedan tidigare.                                | Vi hade mindre erfarenhet av Playwright.                                                   |
| Pris                   | Ingen prisskillnad undersöktes.                                              | Ingen prisskillnad undersöktes.                                                            |
| Drift                  | Vi kunde fortsätta använda verktyget i vårt befintliga projekt.              | Ett byte hade krävt att vi anpassade testerna till ett nytt verktyg.                       |
| Risk                   | Risken med att fortsätta var att testkörningen kunde vara något långsammare. | Risken med att byta var att det skulle ta tid att lära sig verktyget och anpassa testerna. |

## Motivering

Vi kunde Cypress sedan tidigare och valde därför att fortsätta med det. Med tanke på den begränsade tiden under projektet ville vi inte lägga tid på att byta verktyg. Tiden till första gröna testet var 21 ms, vilket vi ansåg vara acceptabelt.

## Konsekvenser

- Vi kan använda våra tidigare kunskaper om Cypress.
- Vi slipper lägga tid på att byta till ett nytt E2E-testverktyg.
- Vi upplever inte att vi förlorar någon större funktionalitet jämfört med Playwright, särskilt eftersom Vitest hanterar de flesta andra testerna.
- Playwright kan vara snabbare, men skillnaden handlar enligt vår jämförelse om enstaka hundradelar av en sekund. Vi bedömde att det var en acceptabel skillnad.
- **Omprövas om** testsviten blir betydligt större, om testernas körtid blir ett problem eller om vi behöver funktioner som Cypress inte täcker.
