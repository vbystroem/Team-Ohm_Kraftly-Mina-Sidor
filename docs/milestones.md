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
- [ x ] npm-cache aktiverad och uppmätt: tiden för npm ci (och hela körningen) före och efter, med skärmdumpar, i docs/pipeline.md
- [ x ] docs/pipeline.md enligt strukturen från workshopen: Mermaid-diagram över ert flöde, tre beslut (jobbindelning, mergekrav, protokoll vid röd main), mätvärdena, skärmdump av låst merge-knapp
- [ x ] CI-badge överst i README som visar passing
- [ x ] Logg i docs/log.md: en post per arbetsdag, inklusive vem som gjorde vad

## M5 – Produktionsmiljö

- [x] **Cache-headers fixade:** Assets cachas hårt (immutable, 1 år) medan `index.html`, `config.js` och `version.txt` körs med `no-cache`. Verifierat med curl.
- [x] **Prod uppe och rullar:** Egen Render-tjänst med `APP_ENV=production` och utan staging-banner. Båda miljöerna kör samma image (`version.txt` matchar).
- [x] **Approval-gate för prod:** GitHub Environment `production` kräver godkännande från teamet innan deploy sker, följt av röktest.
- [x] **Norge-feature flag:** Flaggan styrd via miljön (`FEATURE_NORWAY`) – påslagen i staging och avslagen i prod. Både flagg- och komponenttester gröna i Vitest.
- [x] **Beslutsdokument för feature flags:** Klart i `docs/decisions/feature-flags.md` med jämförelse av tre alternativ och avvecklingsplan.
- [x] **Rollback testad på riktigt:** Körde `rollback.yml` med miljöval mot staging. Rullade tillbaka till M4-taggen på ~26 sekunder utan strul.
- [x] **Skalningsanalys:** Mätvärden från autocannon, analys av flaskhalsar och Kubernetes-beslut dokumenterat i `docs/scaling.md`.
- [x] **Adresser uppdaterade:** Prod-URL tillagd i `README.md` och i miljötabellen i `docs/decisions/deploy.md`.

## M8 – Komponentbibliotek

- [x] **Gemensamma komponenter extraherade**: EN Button-komponent (`KButton`) ersätter alla tre varianter och div-knapparna. Inga `BaseButton`, `AppButton`, .btn eller `.button-secondary` kvar, och inget element med `@click`som inte är en knapp eller länk

- [ ] **Labels, fokusstilar, kontrast och lang åtgärdade**: varje fält har en kopplad label (inte bara placeholder), fokus syns vid Tab överallt (`:focus-visible`, ingen `outline: none` kvar), text klarar 4,5:1, `<html lang="sv">`. Även alt-texter och fakturatabellens scope. `<label for>` + id räcker – `KField` är inte ett krav i M8

- [ ] **Storybook lokalt med stories för KButton och de gemensamma komponenter ni ändrar i M8**: `npm run storybook` startar, `npm run build-storybook` lyckas, och Accessibility-fliken visar Violations 0 på varje story

- [ ] **axe-tester gröna lokalt**: ett `*.a11y.test.js` för `KButton` och ett för inloggningen (axe + `getByLabelText`); `npm run test:a11y` och `npm run test:run` gröna. Klistra in sista raderna ur körningen

- [ ] **Tangentbordsnavigering verifierad, dokumenterad i `docs/accessibility.md`**: varje vy genomgången med bara tangentbordet, före och efter, med resultat per vy
