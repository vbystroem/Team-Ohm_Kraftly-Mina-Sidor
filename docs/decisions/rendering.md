# Beslutsdokument – Kraftlys portal

**Datum:** 13 oktober 2026

## Beslut

Vi väljer att behålla SPA som vi använder idag. Det passar bra för en portal där användarna främst loggar in och använder olika funktioner.

## Bakgrund

Vi behöver bestämma hur Kraftlys portal ska visa sina sidor. Vi har jämfört tre alternativ: SPA, SSR med Nuxt och SSG.

## Alternativ vi jämförde

| Alternativ | Fördelar                                                           | Nackdelar                                                      |
| ---------- | ------------------------------------------------------------------ | -------------------------------------------------------------- |
| SPA        | Passar bra för inloggade användare och är redan implementerat.     | Det kan ta lite längre tid innan sidan laddas första gången.   |
| SSR (Nuxt) | Innehållet visas direkt och sidorna kan lättare hittas via Google. | Kräver mer arbete med serverdrift.                             |
| SSG        | Snabbt och enkelt att drifta.                                      | Passar sämre för innehåll som ändras ofta eller är personligt. |

## Motivering

- **Ska sidan hittas eller delas?** Om ja kan SSR eller SSG vara bättre. Om nej fungerar SPA bra.
- **Syns den innan man loggat in?** Om portalen främst används efter inloggning finns det mindre anledning att byta.
- **Är vi beredda att drifta en server?** Om vi vill undvika extra driftarbete är SPA eller SSG enklare än SSR.

Vi väljer SPA eftersom det redan fungerar för portalen och vi inte har sett något tydligt behov av att byta lösning.

## Konsekvenser

Vi slipper lägga tid på en större förändring och behöver inte införa mer serverdrift. Vi ska ompröva beslutet om våran kontext ändras.
