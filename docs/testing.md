# Teststrategi – Kraftly Mina sidor

## Nivåer

Enhet (Vitest): …
Komponent (Vitest + Vue Testing Library): …
E2E (Cypress): …

## Karta: vad testas var

(tabellen från del 1, ifylld)
|Del av portalen|Nivå|Varför?|Finns test?|
|---|---|---|---|
|Prisformatering| Enhet | Bara små funktioner | Nej |
|Förnämn i hälsning | Enhet | inte en komponent | Nej |
|Fakturastatus| Enhet | Logiken bakom en komponent |
|Validering| Komponent | en hel view, men ändå bättre som komponent för att vi inte vill ha för många E2E | Nej |
|StatusChip| Komponent | har flera states | Nej |
|Flyttformulär| Komponent | funkar bra som komponenttest | Nej |
|Förbrukning diagram| Bör inte testas | är del av charts.js vilket är maintained externt | Nje |
|Stores| Enhet | små funktioner | Nej |
|API-klient| Enhet | småfunktioner | Nej |
|Login| E2E | en hel användarresa | Nej |
|Navigation| E2E |går inte att få plats i individuella test, värt att testa | Nej |

## Regler

- PR mergas bara när …
- En buggfix …
- Vi mockar API:et genom …
- Täckning: …

## Vad vi medvetet inte testar

…

## Kommandon

npm test · npm run test:run · (npm run cy:open)
