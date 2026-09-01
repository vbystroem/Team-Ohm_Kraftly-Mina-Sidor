# Teststrategi – Kraftly Mina sidor

## Nivåer

Enhet (Vitest): …
Komponent (Vitest + Vue Testing Library): …
E2E (Cypress): …

## Karta: vad testas var

(tabellen från del 1, ifylld)

| Del av portalen     | Nivå            | Varför?                                                   | Finns test?                                |
| ------------------- | --------------- | --------------------------------------------------------- | ------------------------------------------ |
| Prisformatering     | Enhet           | Bara små funktioner                                       | Ja (`format.test.js`)                      |
| Förnamn i hälsning  | Enhet           | inte en komponent                                         | Ja (`user.test.js`)                        |
| Fakturastatus       | Enhet           | Logiken bakom en komponent                                | Nej (renderas inline i InvoicesView)       |
| Validering          | Enhet           | ren funktion utan DOM — se not nedan                      | Ja (`validateMove.test.js`)                |
| StatusChip          | Komponent       | har flera states                                          | Nej (komponenten finns inte — se not)      |
| Flyttformulär       | Komponent       | funkar bra som komponenttest                              | Nej                                        |
| Förbrukning diagram | Bör inte testas | är del av charts.js vilket är maintained externt          | Nej                                        |
| Stores              | Enhet           | små funktioner                                            | Ja (`user.test.js`, `consumption.test.js`) |
| API-klient          | Enhet           | småfunktioner                                             | Ja (`api.test.js`)                         |
| Login               | E2E             | en hel användarresa                                       | Ja (`login.cy.js`)                         |
| Navigation          | E2E             | går inte att få plats i individuella test, värt att testa | Delvis (täcks indirekt av login.cy.js)     |

### Noter till tabellen

- **Validering — ändrad från Komponent till Enhet.** Ursprungligen planerad som komponenttest av
  `MoveFormView`, men efter att vi började märkte vi att `validateMove` är en ren funktion utan
  DOM-beroende och passar bättre som ett enhetstest. Ett komponenttest av själva formulärvyn
  ligger kvar som önskemål menprioriterades bort inför M1.
- **StatusChip — komponenten finns inte.** Status renderas inline i `InvoicesView.vue` som en
  `<span class="status-chip">`, inte som en separat återanvändbar komponent. Raden ligger kvar
  som påminnelse om att antingen extrahera komponenten (och sedan testa den) eller ta bort
  raden. I nuläget finns inget att testa isolerat.
- **Fakturastatus — inget separat test.** Statuslogiken (Betald/Obetald) sitter i mallen i
  `InvoicesView.vue` och testas inte isolerat. `InvoicesView.test.js` testar felhanteringen vid
  API-fel, inte statusvisningen.
- **Navigation — delvis.** Inget fristående test, men `login.cy.js` verifierar omdirigering
  vid utloggat tillstånd och kvarstående session vid omladdning, vilket täcker router-guarden
  indirekt.
- **Stores — två testfiler.** `stores/user.test.js` testar user-storen direkt.
  `utils/consumption.test.js` (skrivs av ett annat teambidrag) testar consumption-storen och
  ligger i `utils/` för att det är där testet skapades — se diskussion i PR #16.

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
