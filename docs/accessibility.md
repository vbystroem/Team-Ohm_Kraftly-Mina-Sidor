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

| Brist                                                                             | Var                                          | Hittades med                                                       | Åtgärd (PR)                                                                       |
| --------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `BaseButton`                                                                      | `BaseButton.vue`                             | grep och kodläsning                                                | `KButton` med story och axe-test (#94)                                            |
| Knappklassen `.btn`                                                               | `LoginView.vue`, `MoveFormView.vue`          | grep och kodläsning                                                | `KButton` med story och axe-test (#94)                                            |
| `AppButton`                                                                       | `ProfileView.vue`                            | grep och kodläsning                                                | `KButton` med story och axe-test (#94)                                            |
| Knappklassen `.button-secondary`                                                  | `ProfileView.vue`                            | grep och kodläsning                                                | `KButton variant="secondary"` (#94)                                               |
| Klickbar `<div class="btn">` – Fler spartips                                      | `DashboardView.vue`                          | Tangentbordet (nås inte med Tab)                                   | `KButton` (#94)                                                                   |
| Klickbar `<div class="download">` – Ladda ner                                     | `InvoicesView.vue`                           | Tangentbordet (nås inte med Tab)                                   | `KButton variant="text"` (#94)                                                    |
| Klickbar `<span class="logout">` – Logga ut                                       | `App.vue`                                    | Tangentbordet (nås inte med Tab)                                   | `KButton variant="text"` (#94)                                                    |
| Fält med bara `placeholder` som namn                                              | `LoginView.vue`                              | `getByLabelText` – **inte** axe                                    | `<label for>` + `id` på båda fälten (#105)                                        |
| Fält helt utan namn (varken label eller placeholder)                              | `ProfileView.vue`                            | axe `label` – _Form elements must have labels_, tre gånger         | `<label for>` + `id` på de tre fälten (#105)                                      |
| Fält utan `<label for>` men med `placeholder`                                     | `MoveFormView.vue`                           | Kodläsning – axe godkände placeholdern                             | `<label for>` + `id` på fyra fält och `select` (#105)                             |
| `*:focus { outline: none; }` – ingen synlig fokusring                             | `src/assets/styles.css`                      | Tangentbordet (såg inte var fokus var)                             | `:focus-visible` globalt, vit ring i toppmenyn (#107)                             |
| `lang="en"` och titeln `Vite App`                                                 | `index.html`                                 | Kodläsning – axe flaggar inte fel språk                            | `lang="sv"`, `<title>Mina sidor – Kraftly</title>` (#107)                         |
| Låg kontrast: `.hint` 1,83:1 och etiketterna 3,67:1                               | `styles.css`, `DashboardView`, `ProfileView` | Kontrastberäkning (axe:s `color-contrast`, som inte körs i Vitest) | 5,78:1 (#108)                                                                     |
| Kontrast i bekräftelse- och felmeddelandet: 2,62:1 respektive 3,76:1              | `MoveFormView.vue`                           | Kodläsning + kontrastberäkning                                     | `#067647` (5,40:1) och `#b42318` (5,98:1) (#108)                                  |
| Tabellen utan `thead`/`tbody`/`scope`, tom rubrik, alla knappar hette "Ladda ner" | `InvoicesView.vue`                           | Kodläsning + axe `empty-table-header`                              | `thead`/`tbody`, `scope="col"`, dold "Åtgärd" och `aria-label` per faktura (#107) |

## Tangentbordsgenomgång

Genomförd med bara tangentbordet (Tab, Shift+Tab, Enter, mellanslag) i Chrome mot lokal miljö (`npm run api` + `npm run dev`). Före: på `main` före M8. Efter: efter #105–#108 – `✅` är verifierat i `KButton.a11y.test.js` (Tab, Enter, mellanslag) och kodläsning; den sista manuella tabbningen per vy i webbläsaren görs innan taggen.

| Vy             | Vad vi testade                                                | Före                                                                                                                 | Efter                                                                                                            |
| -------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| inloggning     | Tab genom fälten, Enter för att logga in                      | går att navigera men har inte så tydligt markerat                                                                    | ✅ fälten har `<label for>`, fokusringen syns (`:focus-visible`); ☐ Enter i fältet skickar inte – ingen `<form>` |
| översikt       | Nå Fler spartips med Tab, aktivera med Enter och mellanslag   | går inte att navigera i men går att navigera till                                                                    | ✅ Fler spartips är en `<button>` – nås med Tab, Enter och mellanslag öppnar dialogen                            |
| fakturor       | Nå Ladda ner med Tab, aktivera med Enter                      | går inte att navigera i men går att navigera till                                                                    | ✅ Ladda ner är en `<button>` vars namn säger vilken faktura; tabellen har `scope="col"`                         |
| flyttanmälan   | Tab genom alla fält och till Skicka                           | går att navigera men har inte så tydligt markerat                                                                    | ✅ alla fält har `<label for>`, fokusringen syns på fält, select och knapp                                       |
| Mina uppgifter | Tab mellan fälten, Spara ändringar och Ångra                  | går att navigera men och har helt okej markering med blått men mindre tydligt om man är på spara ändringar och ångra | ✅ båda knapparna har fokusring, fälten har `<label for>`                                                        |
| Logga ut       | Nå Logga ut i den mörka toppmenyn med Tab, aktivera med Enter | går inte att navigera till                                                                                           | ✅ Logga ut är en `<button>` – nås med Tab, vit fokusring i toppmenyn, Enter aktiverar                           |

## Vad axe inte hittar

- Klickbara `<div>`/`<span>` och tre knappvarianter – axe ser bara roller och attribut, inte att ett element beter sig som en knapp. Hittades med kodläsning och tangentbordet; åtgärdat med `KButton`.
- `outline: none` i global CSS – axe kontrollerar inte om fokusringen syns. Hittades med tangentbordet och kodläsning; åtgärdat med `:focus-visible` (#107).
- `lang="en"` trots svenskt innehåll – axe flaggar inte fel språk. Hittades med kodläsning; åtgärdat till `lang="sv"` och titeln `Mina sidor – Kraftly` (#107).
- Fält med bara `placeholder` – axe godkänner placeholder som namn, `getByLabelText` gör det inte. Hittades med `LoginView.a11y.test.js` (`getByLabelText` var röd medan axe var grön); åtgärdat med `<label for>` + `id` (#105).
- Fält utan `<label for>` men med `placeholder` i `MoveFormView` – axe såg inget eftersom placeholdern godkänns som namn. Hittades med kodläsning; åtgärdat med `<label for>` + `id` (#105).
- `<th>` utan `scope` – axe har ingen regel för det. Hittades med kodläsning; åtgärdat med `thead`/`tbody` och `scope="col"` (#107).
- Kontrast i Vitest – jsdom ritar ingenting, så färgreglerna är avstängda. Kontrast syns bara i Accessibility-fliken eller i webbläsaren; värdena i tabellen ovan är räknade med WCAG-formeln (samma som axe använder).
- Enter i ett inloggningsfält skickar inte inloggningen – fälten ligger inte i en `<form>`, knappen har `@click`. Inget verktyg flaggar det; hittades med tangentbordet.

## Kända brister

- Enter i e-post- eller lösenordsfältet loggar inte in (ingen `<form>` runt fälten).
- Fokus flyttas inte till sidans `<h1>` vid ruttbyte.
- Inte testat med skärmläsare eller 200 % zoom.
