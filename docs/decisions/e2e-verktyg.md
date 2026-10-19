# Beslut: verktyg för E2E-tester

**Datum:** 2026-09-01
**Beslut:** Vi använder Cypress för end-to-end-tester.

## Bakgrund

Vi bestämmer vilket e2e testverktyg vi fortsätter med under kursens gång.

## Alternativ vi jämförde

Cypress och Playwright – Vi upptäckde inga större skillnader och valde ganska snabbt att bara fortsätta med cypress.

## Motivering

Vi kan Cypress sedan tidigare, och då i mån av tid valde vi att fortsätta med det. Tid till första grönt test är 21ms, vilket vi kände är acceptabelt.

## Konsekvenser

Vi upplever det som att det inte är någon större förlust i funktionalitet mellan de två verktygen, särskilt eftersom vitest hanterar de allra flesta testen själv. Playwright kan vara snabbare, men det gäller enstaka hundradelars sekunder, vilket vi ser som en okej förlust.
