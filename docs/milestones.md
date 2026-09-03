## M0

- [x] Teamrepo skapat från starter-templaten, med skyddad main (PR krävs + minst en godkänd review), PR-mall och CODEOWNERS
- [x] Working agreement i README: mötestider, kommunikationsvägar, definition of done för PR:er, tech lead-schema för rotationen
- [x] Appen körs lokalt hos alla i teamet
- [x] Skuldinventering i docs/debt.md
- [x] Kort logg i docs/log.md: vad ni gjorde, vad som var svårt

## M1

## M2

- [ x ] Workflow i .github/workflows/ci.yml som körs på varje pull request mot main och på varje push till main, med lint, format-check, test:run och build – alla gröna på main
- [ x ] Smoke-testet som eget jobb – Cypress eller Playwright enligt ert beslutsdokument från Boiler Room, grönt i CI
- [ x ] Branch protection på main (ruleset): pull request krävs, minst 1 approval, alla era jobb som required status checks, "require branches to be up to date". Bypass-listan tom – tech lead ingår i regeln
- [ x ] Bevis på att grinden fungerar: en PR i historiken där statusen var röd och merge-knappen låst, som sedan blev grön och mergades. Länka den från docs/pipeline.md
- [ ] npm-cache aktiverad och uppmätt: tiden för npm ci (och hela körningen) före och efter, med skärmdumpar, i docs/pipeline.md
- [ ] docs/pipeline.md enligt strukturen från workshopen: Mermaid-diagram över ert flöde, tre beslut (jobbindelning, mergekrav, protokoll vid röd main), mätvärdena, skärmdump av låst merge-knapp
- [ ] CI-badge överst i README som visar passing
- [ ] Logg i docs/log.md: en post per arbetsdag, inklusive vem som gjorde vad
