# Beslut: Val av hostingplattform

**Datum:** 2026-09-21 
**Beslut:** Vi använder Render som hostingplattform för Kraftly.

## Bakgrund

Vi undersökte tre olika alternativ inom gratiskategorin med stöd för Docker-containrar: Render, Netlify och Vercel. Vi prioriterade enkelhet, snabbhet och funktionalitet för backend och API.

## Alternativ vi jämförde

|          | Render (valt)                                                                         | Netlify                                                        | Vercel                                                 |
| -------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------ |
| Funktion | Passar fullstack-appar med backend, databaser, bakgrundsjobb och långkörande servrar. | Passar främst statiska sidor med inbyggda verktyg.             | Passar främst Next.js och dynamisk frontend.           |
| Pris     | Vi undersökte gratisalternativet.                                                     | Vi undersökte gratisalternativet.                              | Vi undersökte gratisalternativet.                      |
| Drift    | Stöd för Docker-containrar och backend.                                               | Inte lika anpassat för vår typ av backend-lösning.             | Främst inriktat på frontend och Next.js.               |
| Risk     | Vi blir beroende av Render för driften.                                               | Risk att plattformen inte passar vår backend-lösning lika bra. | Risk att plattformen inte passar vår lösning lika bra. |

## Motivering

Vi valde Render eftersom det är ett balanserat alternativ som passar bra för webbplatser med behov av backend och API. Det passar därför bättre för Kraftly än alternativ som främst är inriktade på statiska sidor eller frontend. Priset är att vi blir beroende av Render för driften, vilket kan göra ett framtida plattformsbyte svårare.

## Konsekvenser

- Vi får en hostingplattform som kan hantera både frontend och backend.
- Vi kan använda Docker-containrar i vår driftsättning.
- Ett framtida byte till en plattform som Netlify kan bli svårare eftersom den inte är lika anpassad för vår typ av lösning.
- **Omprövas om** Render inte längre uppfyller våra behov för drift av frontend, backend och API, eller om kostnaderna eller begränsningarna blir för stora.
