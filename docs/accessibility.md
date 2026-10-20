# Tillgänglighet

_Mål: WCAG 2.2 nivå AA. Kontrollerat med axe i komponenttesterna, Storybooks Accessibility-flik och en genomgång med tangentbordet. Storybook och axe körs lokalt (i pipelinen: M9)._

## Komponentbiblioteket

| Komponent    | Ersätter                                                                          | API                                                                       |
| ------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `KButton`    | BaseButton, AppButton, `.btn`, `.button-secondary` och klickbara `<div>`/`<span>` | `variant`: primary · secondary · text, `type`, `block`; texten är en slot |
| `StatusChip` | inline `<span class="status-chip">` i InvoicesView                                | `status`: Betald · Obetald                                                |

```
npm run storybook    # komponenterna med stories, fliken Accessibility
npm run test:a11y    # axe-testerna (filerna *.a11y.test.js)
```

## Vad vi åtgärdade

| Brist                                         | Var                                 | Hittades med                     | Åtgärd (PR)                           |
| --------------------------------------------- | ----------------------------------- | -------------------------------- | ------------------------------------- |
| `BaseButton`                                  | `BaseButton.vue`                    | grep och kodläsning              | `KButton` med story och axe-test (#…) |
| Knappklassen `.btn`                           | `LoginView.vue`, `MoveFormView.vue` | grep och kodläsning              | `KButton` med story och axe-test (#…) |
| `AppButton`                                   | `ProfileView.vue`                   | grep och kodläsning              | `KButton` med story och axe-test (#…) |
| Knappklassen `.button-secondary`              | `ProfileView.vue`                   | grep och kodläsning              | `KButton variant="secondary"` (#…)    |
| Klickbar `<div class="btn">` – Fler spartips  | `DashboardView.vue`                 | Tangentbordet (nås inte med Tab) | `KButton` (#…)                        |
| Klickbar `<div class="download">` – Ladda ner | `InvoicesView.vue`                  | Tangentbordet (nås inte med Tab) | `KButton variant="text"` (#…)         |
| Klickbar `<span class="logout">` – Logga ut   | `App.vue`                           | Tangentbordet (nås inte med Tab) | `KButton variant="text"` (#…)         |

## Tangentbordsgenomgång

<Datum, browser, vilken miljö. Bara tangentbordet: Tab, Shift+Tab, Enter, mellanslag.>

| Vy             | Vad ni testade                                                 | Före                                                                                                                 |
| -------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| inloggning     | Navigera med tangentbord och kontrollera synlig fokusmarkering | går att navigera men har inte så tydligt markerat                                                                    |
| översikt       | Navigera med tangentbord och kontrollera synlig fokusmarkering | går inte att navigera i men går att navigera till                                                                    |
| fakturor       | Navigera med tangentbord och kontrollera synlig fokusmarkering | går inte att navigera i men går att navigera till                                                                    |
| flyttanmälan   | Navigera med tangentbord och kontrollera synlig fokusmarkering | går att navigera men har inte så tydligt markerat                                                                    |
| Mina uppgifter | Navigera med tangentbord och kontrollera synlig fokusmarkering | går att navigera men och har helt okej markering med blått men mindre tydligt om man är på spara ändringar och ångra |
| Logga ut       | Navigera med tangentbord och kontrollera synlig fokusmarkering | går inte att navigera till                                                                                           |

## Vad axe inte hittar

- Klickbara `<div>`/`<span>` och tre knappvarianter – axe ser bara roller och attribut, inte att ett element beter sig som en knapp. Hittades med kodläsning och tangentbordet; åtgärdat med `KButton`.
- `outline: none` i global CSS – axe kontrollerar inte om fokusringen syns. Kvar.
- `lang="en"` trots svenskt innehåll – axe flaggar inte fel språk. Kvar.
- Fält med bara `placeholder` – axe godkänner placeholder som namn, `getByLabelText` gör det inte. Kvar.
- `<th>` utan `scope` – axe har ingen regel för det. Kvar.
- Fokus som inte flyttas vid ruttbyte – axe testar enskilda vyer, inte navigering. Kvar.
- Kontrast i Vitest – jsdom ritar ingenting, så färgreglerna är avstängda. Kontrast syns bara i Accessibility-fliken eller i webbläsaren.

## Kända brister

- Fälten i `LoginView`, `ProfileView` och `MoveFormView` saknar kopplade `<label for>`/`id`.
- `*:focus { outline: none; }` finns kvar, bara `KButton` har egen fokusring.
- `index.html` har `lang="en"` och titeln `Vite App`.
- Logotypen i `App.vue` saknar `alt`.
- Kontrast: `.hint`, statuschips och etiketter har startkodens värden; före/efter saknas.
- Fakturatabellen saknar `thead`/`tbody`, `scope="col"` och dold text för tom rubrik och nedladdningsknapp.
- Fokus flyttas inte till sidans `<h1>` vid ruttbyte.
- Inte testat med skärmläsare eller 200 % zoom.
