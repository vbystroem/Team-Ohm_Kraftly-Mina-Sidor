# Beslutsdokument – Kraftlys portal

**Datum:** 2026-10-13
**Beslut:** Vi väljer att behålla SPA som vi använder idag. Det passar bra för en portal där användarna främst loggar in och använder olika funktioner.

## Bakgrund

Vi behöver bestämma hur Kraftlys portal ska visa sina sidor. Vi har jämfört tre alternativ: SPA, SSR med Nuxt och SSG.

## Alternativ vi jämförde

|                       | SPA (valt)                                                                                                                  | SSR (Nuxt)                                                         | SSG                                                                                           |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Hur visas innehållet? | Passar bra för inloggade användare och är redan implementerat. Det kan ta lite längre tid innan sidan laddas första gången. | Innehållet visas direkt och sidorna kan lättare hittas via Google. | Sidorna kan laddas snabbt, men passar sämre för innehåll som ändras ofta eller är personligt. |
| Drift och risk        | Kräver ingen extra serverdrift för rendering.                                                                               | Kräver mer arbete med serverdrift.                                 | Snabbt och enkelt att drifta, men mindre lämpligt för personligt innehåll.                    |

## Motivering

- **Ska sidan hittas eller delas?** Om ja kan SSR eller SSG vara bättre. Om nej fungerar SPA bra.
- **Syns den innan man loggat in?** Om portalen främst används efter inloggning finns det mindre anledning att byta.
- **Är vi beredda att drifta en server?** Om vi vill undvika extra driftarbete är SPA eller SSG enklare än SSR.

Vi väljer SPA eftersom det redan fungerar för portalen och vi inte har sett något tydligt behov av att byta lösning. Priset är att den första sidladdningen kan ta lite längre tid.

## Konsekvenser

- Vi slipper lägga tid på en större förändring.
- Vi behöver inte införa mer serverdrift.
- **Omprövas om** Kraftly behöver publika sidor som ska hittas via Google, eller om den första sidladdningen blir ett tydligt prestandaproblem.
