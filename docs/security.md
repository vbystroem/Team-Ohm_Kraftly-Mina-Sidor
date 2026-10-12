# Säkerhet – Ohm

## Hotbilden i en mening

Skyddsvärt: kundens fakturor, förbrukning och personuppgifter. Angriparen: någon som vill läsa en annan kunds data via ett gissat id, stjäla en token från webblagring, eller nå API:t utan att vara inloggad.

## Autentiseringen (M6)

Kunden loggar in mot `POST /api/v2/auth/login`. Token hålls i minnet, aldrig i localStorage. Vid 401 görs en refresh mot httpOnly-cookien och anropet görs om en gång. API:t kräver Authorization: Bearer <token> för allt under `/api/v2`. Route guarden är UX, skyddet sitter i API:t.

## OWASP Top 10 – genomgång

| #   | Risk                                  | Gäller oss? | Vad vi hittade                          | Vad vi gjorde                                                                                                                                                                       | Kontroll                                                       |
| --- | ------------------------------------- | ----------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| A01 | Broken Access Control                 | Ja          | `/api/v2`-endpoints var öppna           | Vi använder Bearer-token istället för "we'll add real auth later"                                                     | curl utan token ger 401      |
| A02 | Security Misconfiguration             | Ja          | CORS var `*`                            | Vi plockar bort delen där CORS är satt till *, och lägger till CSP + headers| curl -I visar CSP                |
| A03 | Software Supply Chain Failures        | —           | —                                       | —                                                                                                                                                                                 | —                                                             |
| A04 | Cryptographic Failures                | Ja          | API-nyckeln låg exponerad i frontend    |      Vi tog bort nyckeln ur src                                                                                        | Ingen nyckel kvar under `src/`                                |
| A05 | Injection (XSS för oss)               | —           | —                                       | —                                                                                                                                                                                 | —                                                             |
| A06 | Insecure Design                       | —           | —                                       | —                                                                                                                                                                                 | —                                                             |
| A07 | Authentication Failures               | Ja          | Inloggningen var en `localStorage`-flagga | riktig authorisation i LoginView.vue, token ligger i minnet i token.js | localStorage tomt efter login |
| A08 | Software/Data Integrity Failures      | —           | —                                       | —                                                                                                                                                                                 | —                                                             |
| A09 | Logging & Alerting Failures           | —           | —                                       | —                                                                                                                                                                                 | —                                                             |
| A10 | Mishandling of Exceptional Conditions | —           | —                                       | —                                                                                                                                                                                 | —                                                             |

## Headers vi sätter (nginx)

![CSP bevis](<Screenshot from 2026-10-12 15-13-10.png>)

## 401 utan token

![401 utan token bevis](<Screenshot from 2026-10-12 15-11-31.png>)
