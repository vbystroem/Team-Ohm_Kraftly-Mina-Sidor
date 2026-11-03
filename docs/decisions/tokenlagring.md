# Beslut: Var lagrar vi access token?

**Datum:** 2026-10-06 
**Beslut:** Vi lagrar access token i minnet i stället för i localStorage eller en cookie.

## Bakgrund

Vi behövde bestämma var access token skulle lagras. Token används när vi gör anrop till API:et för att visa att användaren är inloggad. Vi jämförde localStorage, cookie och minnet.

## Alternativ vi jämförde

|                        | Minnet (valt)                                                         | localStorage                                                                                | Cookie                                                                         |
| ---------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Hur skiljer de sig åt? | Token sparas tillfälligt i minnet och försvinner när sidan laddas om. | Token finns kvar även när sidan laddas om.                                                  | Token lagras i en cookie. Vi använder en HttpOnly-cookie för refresh token.    |
| Risk                   | Token sparas inte permanent i webbläsarens lagring.                   | JavaScript kan komma åt token. Vid en XSS-attack finns risk att den stjäls.                 | En HttpOnly-cookie kan inte läsas av JavaScript.                               |
| Drift                  | En ny access token behöver hämtas efter att sidan laddats om.         | Token finns kvar efter omladdning och behöver inte hämtas på nytt på grund av omladdningen. | Refresh-cookien används för att hämta en ny access token när den gamla går ut. |
| Pris                   | Ingen kostnadsskillnad undersöktes.                                   | Ingen kostnadsskillnad undersöktes.                                                         | Ingen kostnadsskillnad undersöktes.                                            |

## Motivering

Vi valde att lagra access token i minnet eftersom det minskar risken att token stjäls från webbläsarens lagring, jämfört med localStorage.

När access token går ut använder vi refresh-cookien för att hämta en ny access token. På så sätt kan användaren fortsätta vara inloggad utan att access token behöver sparas permanent i webbläsaren.

Priset är att access token försvinner när sidan laddas om och därför behöver hämtas på nytt.

## Konsekvenser

- Access token sparas tillfälligt i minnet.
- Refresh token lagras i en HttpOnly-cookie som JavaScript inte kan läsa.
- **Omprövas om** vi ändrar autentiseringslösningen eller hittar ett behov av att använda en annan lagringsmetod.
