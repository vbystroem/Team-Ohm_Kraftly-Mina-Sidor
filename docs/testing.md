# Teststrategi – Kraftly Mina sidor

## Nivåer

Enhet (Vitest): …
Komponent (Vitest + Vue Testing Library): …
E2E (Cypress): …

## Karta: vad testas var

(tabellen från del 1, ifylld)

| Del av portalen     | Nivå            | Varför?                                                                          | Finns test? |
| ------------------- | --------------- | -------------------------------------------------------------------------------- | ----------- |
| Prisformatering     | Enhet           | Bara små funktioner                                                              | Nej         |
| Förnämn i hälsning  | Enhet           | inte en komponent                                                                | Nej         |
| Fakturastatus       | Enhet           | Logiken bakom en komponent                                                       |
| Validering          | Komponent       | en hel view, men ändå bättre som komponent för att vi inte vill ha för många E2E | Nej         |
| StatusChip          | Komponent       | har flera states                                                                 | Nej         |
| Flyttformulär       | Komponent       | funkar bra som komponenttest                                                     | Nej         |
| Förbrukning diagram | Bör inte testas | är del av charts.js vilket är maintained externt                                 | Nje         |
| Stores              | Enhet           | små funktioner                                                                   | Nej         |
| API-klient          | Enhet           | småfunktioner                                                                    | Nej         |
| Login               | E2E             | en hel användarresa                                                              | Nej         |
| Navigation          | E2E             | går inte att få plats i individuella test, värt att testa                        | Nej         |

## Regler

### Pull request regler

- Om man skriver ny logik, eller ett test, eller fixar en bugg kan man göra en pull request. Inga krav på mängd kod då små commits är bra

### Mock API

- Kikar på det senare

### Vad vi medvetet inte testar

- CSS-selektorer, för att de kan ändras i realtid
- Externa paket (vue, vitest, chart.js, lodash för att de redan är testade internt)

### Täckningskrav

- 80%

### Namn och placering

- .test.js-fil i samma mapp som orginalkoden för att det är enklare att hitta då

## Kommandon

npm test · npm run test:run · (npm run cy:open)
