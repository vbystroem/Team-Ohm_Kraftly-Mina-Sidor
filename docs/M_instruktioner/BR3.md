Boiler Room 3 – uppdrag fredag 23/10

Heldag 09:00–16:00 i teamet · sal 5 eller Meet (teamet väljer, men hela teamet jobbar samtidigt) · Tech lead (period 4) leder dagen · Jonatan är inte på plats men svarar på Slack i omgångar

Läs så här: förmiddagen har ett mål, och det står komplett här: KField i inloggning, profil och flyttanmälan, plus ett Storybook-jobb i pipelinen. Det är M9:s första DoD-punkt, och när den är klar kl. 12 är den klar. Eftermiddagen är M9-tid för det teamet väljer. Läs uppifrån och ner och gör stegen i den ordningen. Checkpointerna skriver ni i er teamtråd på Slack.

Utgår ur kursen (beslut 12/10): stories för samtliga komponenter, ett axe-test per formulärvy och ett eget axe-jobb i pipelinen. De är inte flyttade till senare, de är borttagna. Vill ni ändå göra dem står recepten under Om ni hinner*, utan krav.*
Tid Vad Checkpoint i teamtråden
09:00 1 · Planen 09:00: vem gör KField, vem gör Storybook-jobbet, vad ska vara grönt kl. 12
09:15–11:45 2 · KField
09:15–10:00 3 · Storybook-jobbet i pipelinen (parallellt, 1 pers) 12:00: länk till körningen där Storybook är grön + länk till KField-PR:en
12:00–13:00 Lunch
13:00–15:30 4 · M9-tid
15:30–16:00 5 · Läget inför tisdag 15:30: vad är bockat, vad är kvar till taggen, vad gör vem på måndag
1 · Planen

Utgå från BR3-planen som ni skrev som en issue i går (övning 3, spår 3). Saknas den gör ni den nu, på tio minuter: vilka fält i vilka vyer ska bli KField. Tech lead länkar issuen och skriver tre rader i teamtråden: vem gör KField (1–2 personer, avsnitt 2), vem gör Storybook-jobbet (1 person, avsnitt 3, tar under en timme) och vad ska vara grönt kl. 12. Resten av teamet börjar direkt med M9 (avsnitt 4).

Kom AI-steget in i pipelinen i går? Då granskar det dagens PR:ar automatiskt, och KField-PR:en och Storybook-PR:en räknas som riktiga PR:ar i utvärderingen. Fyll i tabellen i docs/ai-in-pipeline.md när kommentaren kommer.
2 · KField

I M8 skrev ni label och fält för hand, med ett eget id per fält. Det fungerar tills någon glömmer det eller använder samma id två gånger på en sida. Flyttanmälan har dessutom ett problem till: felmeddelandena står i en lista under formuläret, men inget av dem är kopplat till sitt fält. Den som tabbar till Postnummer med en skärmläsare hör inte att just det fältet är fel. KField löser båda problemen på ett ställe.

Allt nedan i en PR, git switch -c kfield. I beskrivningen: vad var fel, vad hittade det, hur ni kontrollerade att det är lagat.
2.1 · Komponenten

Skapa src/components/KField.vue:

<template>
  <div class="k-field">
    <label :for="inputId" class="k-field__label">{{ label }}</label>
    <input
      :id="inputId"
      v-model="model"
      v-bind="$attrs"
      class="k-field__input"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy"
    >
    <p v-if="hint" :id="hintId" class="k-field__hint">{{ hint }}</p>
    <p v-if="error" :id="errorId" class="k-field__error">{{ error }}</p>
  </div>
</template>

<script setup>
// Ett textfält med label – alltid. Labeln är kopplad till fältet (for/id), så en skärmläsare
// läser upp den och ett klick på labeln sätter fokus i fältet. Hjälptext och felmeddelande
// kopplas med aria-describedby: de läses upp efter labeln när fältet får fokus.
import { computed, useId } from 'vue'

// type, autocomplete, inputmode m.m. ska hamna på <input>, inte på den yttre <div>:en
defineOptions({ inheritAttrs: false })

const props = defineProps({
  label: { type: String, required: true },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  id: { type: String, default: '' } // valfritt – annars ett unikt id per fält
})

const model = defineModel({ type: String, default: '' })

const autoId = useId()
const inputId = computed(() => props.id || `k-field-${autoId}`)
const hintId = computed(() => `${inputId.value}-hint`)
const errorId = computed(() => `${inputId.value}-error`)

const describedBy = computed(() => {
  const ids = [props.hint && hintId.value, props.error && errorId.value].filter(Boolean)
  return ids.length ? ids.join(' ') : undefined
})
</script>

<style scoped>
.k-field { margin-bottom: 12px; }
.k-field__label { display: block; font-size: 13px; color: #4a5468; margin-bottom: 4px; }
.k-field__input { margin-bottom: 0; }
.k-field__input[aria-invalid='true'] { border-color: #d92d20; }
.k-field__hint { color: #5c6679; font-size: 12px; margin-top: 4px; }
.k-field__error { color: #b42318; font-size: 13px; margin-top: 4px; }
</style>

Fem saker i den är nya:

    label är en obligatorisk prop. Det går inte att använda fältet utan att ge det ett namn.
    useId() (Vue 3.5) ger varje instans av komponenten ett eget id. Använder en vy KField fem gånger blir det fem olika id:n.
    aria-describedby pekar på id:t för ett annat element, och det elementets text läses upp efter fältets namn. Här pekar det på både hjälptexten och felet, och flera id:n skrivs med mellanslag mellan. aria-invalid="true" gör att skärmläsaren säger att värdet är ogiltigt.
    defineModel() gör att v-model fungerar på komponenten, precis som på ett vanligt <input>.
    inheritAttrs: false + v-bind="$attrs": attribut som inte är props (type, autocomplete, inputmode) hamnar på <input> och inte på den yttre <div>:en. Utan det får fältet aldrig type="email".

2.2 · Testet

Skapa src/components/KField.a11y.test.js:

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { axe } from 'jest-axe'
import KField from './KField.vue'

describe('KField', () => {
it('har en label som är kopplad till fältet', () => {
render(KField, { props: { label: 'E-postadress' }, attrs: { type: 'email' } })
expect(screen.getByLabelText('E-postadress')).toHaveAttribute('type', 'email')
})

it('kopplar hjälptexten med aria-describedby', () => {
render(KField, { props: { label: 'Inflyttningsdatum', hint: 'Skriv som ÅÅÅÅ-MM-DD' } })
expect(screen.getByLabelText('Inflyttningsdatum')).toHaveAccessibleDescription('Skriv som ÅÅÅÅ-MM-DD')
})

it('markerar fel med aria-invalid och kopplar felet till fältet', () => {
render(KField, { props: { label: 'Postnummer', error: 'Postnummer ska vara fem siffror' } })
const input = screen.getByLabelText('Postnummer')
expect(input).toBeInvalid()
expect(input).toHaveAccessibleDescription('Postnummer ska vara fem siffror')
})

it('har inga axe-överträdelser, med hjälptext och fel', async () => {
const { container } = render(KField, {
props: { label: 'Postnummer', hint: 'Fem siffror', error: 'Postnummer ska vara fem siffror' }
})
expect(await axe(container)).toHaveNoViolations()
})
})

toHaveAccessibleDescription läser texten som aria-describedby pekar på, alltså samma text som skärmläsaren läser upp efter namnet. toBeInvalid är grön när fältet har aria-invalid="true".

npx vitest run KField.a11y # Test Files 1 passed (1) · Tests 4 passed (4)

2.3 · Storyn

Skapa src/components/KField.stories.js. För att v-model ska fungera i en story behöver storyn en egen ref, annars går det inte att skriva i fältet:

import { ref } from 'vue'
import KField from './KField.vue'

export default {
title: 'Komponenter/KField',
component: KField,
tags: ['autodocs'],
// v-model i en story: ett eget ref, så att man kan skriva i fältet
render: (args) => ({
components: { KField },
setup: () => ({ args, value: ref('') }),
template: '<KField v-bind="args" v-model="value" />'
}),
args: { label: 'E-postadress', type: 'email', autocomplete: 'email' }
}

export const Standard = {}

export const MedHjalptext = {
name: 'Med hjälptext',
args: { label: 'Inflyttningsdatum', hint: 'Skriv som ÅÅÅÅ-MM-DD, t.ex. 2026-11-01', type: 'text' }
}

export const MedFel = {
name: 'Med fel',
args: { label: 'Postnummer', error: 'Postnummer ska vara fem siffror', type: 'text', inputmode: 'numeric' }
}

npm run storybook → Komponenter → KField. Öppna fliken Accessibility på alla tre storyna. Alla ska visa Violations 0. Ändra error under Controls och kontrollera att den röda ramen och texten kommer och går.
2.4 · Byt in den: inloggning och profil

Inloggningen (src/views/LoginView.vue): byt de fyra raderna med <label for> och <input> från M8 mot

<KField v-model="email" label="E-postadress" type="email" autocomplete="username" />
<KField v-model="password" label="Lösenord" type="password" autocomplete="current-password" />

Profilen (src/views/ProfileView.vue): byt de sex raderna mot

<KField v-model="name" label="Namn" type="text" autocomplete="name" />
<KField v-model="email" label="E-postadress" type="email" autocomplete="email" />
<KField v-model="address" label="Adress" type="text" autocomplete="street-address" />

Importera komponenten i båda filerna (import KField from '../components/KField.vue'). Ta också bort raden label { … } som ni lade i <style scoped> i M8, eftersom stilen nu finns i komponenten. Heter era variabler något annat än email, name och så vidare behåller ni era namn i v-model.

    Letar era E2E-test efter fälten med id (#login-email, #zip)? Ge KField samma id: <KField id="login-email" …>. Letar de med getByLabel('E-postadress') (som M8 bad om) fungerar de utan ändring.

npm run test:a11y # LoginView.a11y.test.js från M8 ska fortfarande vara grönt

2.5 · Flyttanmälan: felet vid fältet, rött först

Skriv testet före ändringen. Skapa src/views/MoveFormView.a11y.test.js:

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import MoveFormView from './MoveFormView.vue'

// Komponenttestet ska inte prata med API:t – vi mockar modulen.
vi.mock('../services/api', () => ({
submitMove: vi.fn().mockResolvedValue({ ok: true, ref: 'FLYTT-12345' })
}))

describe('MoveFormView – tillgänglighet', () => {
it('kopplar felet till fältet – skärmläsaren hör det när fältet får fokus', async () => {
const user = userEvent.setup()
render(MoveFormView)

    // Ett felaktigt postnummer och en riktig ort – resten lämnas tomt
    await user.type(screen.getByLabelText('Postnummer'), '802')
    await user.type(screen.getByLabelText('Ort'), 'Gävle')
    await user.click(screen.getByRole('button', { name: 'Skicka flyttanmälan' }))

    const zip = screen.getByLabelText('Postnummer')
    expect(zip).toBeInvalid()
    expect(zip).toHaveAccessibleDescription('Postnummer ska vara fem siffror')
    expect(screen.getByLabelText('Ort')).not.toBeInvalid()

})
})

Är ert felmeddelande för postnumret ett annat (titta i src/utils/validateMove.js)? Använd i så fall er text i testet. Heter knappen något annat än Skicka flyttanmälan byter ni namnet i testet också.

npx vitest run MoveFormView.a11y # × kopplar felet till fältet … – Tests 1 failed (1)

Testet ska vara rött, med felet expect(element).toBeInvalid(). Felet står i listan, men inte vid fältet. Klistra in felraden i PR-beskrivningen. Den är beviset för att testet testar något.

Byt nu de fyra paren <label> + <input> i src/views/MoveFormView.vue (Ny adress, Postnummer, Ort, Inflyttningsdatum) mot

<KField v-model="form.address" label="Ny adress" autocomplete="street-address" :error="errors.address" />
<KField v-model="form.zip" label="Postnummer" inputmode="numeric" autocomplete="postal-code" :error="errors.zip" />
<KField v-model="form.city" label="Ort" autocomplete="address-level2" :error="errors.city" />
<KField v-model="form.date" label="Inflyttningsdatum (ÅÅÅÅ-MM-DD)" :error="errors.date" />

och importera KField. errors är objektet med ett fel per fält som validateMove returnerar. Heter det något annat hos er använder ni ert namn. Listan Avtal (<select>) får stå kvar som den är, eftersom KField bara är för textfält.

npx vitest run MoveFormView.a11y # Tests 1 passed (1)
npm run test:run # alla gröna
npm run build-storybook # "Storybook build completed successfully"

Prova i appen: gå till Flyttanmälan och skicka formuläret tomt. Varje fält ska få röd ram och sitt eget fel under sig. Fellistan med role="alert" står kvar. Den läses upp när den dyker upp, och felet vid fältet läses upp när man tabbar dit. Klistra in raden Tests 1 passed under felraden i PR-beskrivningen. Merga sedan.

KField är klar när: KField har test och story med Violations 0, inloggningen, profilen och flyttanmälan använder den, testet i MoveFormView.a11y.test.js gick från rött till grönt, och npm run test:run är grönt på main.
3 · Storybook-jobbet i pipelinen

Storybook byggs i dag bara på er egen dator. Om någon ändrar en komponent så att en story inte längre går att bygga märker ingen det förrän nästa gång någon kör npm run storybook. Ett jobb i pipelinen fångar det i PR:en.

En PR, git switch -c storybook-i-ci. Lägg jobbet i .github/workflows/ci.yml under jobs:, efter e2e-jobbet och före lighthouse. Indraget ska vara två mellanslag, samma som de andra jobben:

storybook:
name: Storybook
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v4 - uses: actions/setup-node@v4
with:
node-version: 22
cache: npm - run: npm ci # Bygger varje story till en statisk sajt i storybook-static/. Går en story inte att # bygga – fel import, en komponent som inte kompilerar – blir jobbet rött. - run: npm run build-storybook # Den byggda Storybooken som artefakt: vem som helst i teamet kan ladda ner den # från körningen och bläddra i komponenterna utan att klona repot. - uses: actions/upload-artifact@v4
with:
name: storybook
path: storybook-static
retention-days: 7

Jobbet har inget needs, så det körs parallellt med quality och build och gör inte pipelinen långsammare. Har ni Cypress och CYPRESS_INSTALL_BINARY borttaget kommer npm ci att ladda ner Cypress i det här jobbet också. Det fungerar, men tar en minut extra.

    Pusha och öppna PR:en. Under Checks ska jobbet Storybook dyka upp och bli grönt efter ett par minuter. Kopiera länken till körningen. Den är 12-checkpointen.
    Kontrollera artefakten. Öppna körningen och gå till Artifacts → storybook. Ladda ner zip-filen och packa upp den till en mapp storybook-static/ i repot (den är redan i .gitignore). Kör sedan:

    npx vite preview --outDir storybook-static --port 6007

    och öppna http://localhost:6007Links to an external site.. Det är samma Storybook som pipelinen byggde. Om man öppnar index.html direkt från disken fungerar den inte, eftersom den behöver en server.
    Gör jobbet till required check. Det ska göras efter att jobbet har körts en gång, för först då går det att söka fram. Settings → Branches → regeln för main → Edit → Require status checks to pass → sök Storybook → lägg till → Save changes. Använder ni Rulesets i stället (Settings → Rules) gör ni samma sak där under Require status checks to pass.
    Merga. Kontrollera på nästa PR att Storybook står som Required.

Klart när: jobbet Storybook är grönt på main, artefakten storybook finns på körningen och jobbet är required check.
4 · M9-tid

Nu är DoD 1 klar. Eftermiddagen ägnar ni åt resten av M9, och teamet väljer vad. Recepten står i torsdagens övning 3 och i Canvas-uppgiften M9:

    AI-steget (övning 3, spår 1): ai-review.yml + scripts/ai-review.mjs i teamets pipeline. Utvärderingen på minst tre av era riktiga PR:ar går i docs/ai-in-pipeline.md. Dagens PR:ar räknas.
    Hållbarhetssiffran (övning 3, spår 2): scripts/co2.mjs, tabellen Före M7 / Efter M7 och tre meningar om metoden i docs/sustainability.md.

Etikfallet skrev ni i salen i går. Är det inte klart blir det första punkten nu.
5 · Läget inför tisdag

    Bocka av det som är klart i docs/milestones.md under rubriken M9, med bevisen under punkterna. Under DoD 1 klistrar ni in inventeringen från BR3-planen (vy → fält → nu KField), länken till KField-PR:en (med röd och grön testrad), sista raderna ur npm run test:run och npm run build-storybook, länken till körningen där Storybook är grön, och en skärmdump eller ett utdrag ur branch protection där Storybook står som required.
    Skriv tre rader i teamtråden: vad är bockat, vad är kvar till taggen och vad gör vem på måndag.
    DailyLog. Skriv dagens post i docs/log.md:

## 2026-10-23 · Boiler Room 3

Gjort: …
Grönt: … (länkar till PR:ar och körningen med Storybook-jobbet)
Kvar till M9-taggen tisdag: …
En siffra från i dag: … (t.ex. tiden för Storybook-jobbet, eller kB per besök från co2-skriptet)
Fastnat på: …

Inlämning i Canvas, individuellt, senast i kväll 23:59 (Boiler Room 3 – DailyLog): klistra in teamets loggpost, länka till docs/log.md på GitHub och skriv en egen rad om vad du gjorde i dag och var du fastnade. Loggen i repot är originalet, och Canvas-inlämningen är ditt kvitto på dagen.

Framåt: tisdag 27/10 kl. 23:59 taggar ni M9, och alla lämnar in var för sig i Canvas · onsdag 28/10 är det M9-avstämning. Rapporten rör ni inte förrän nästa vecka.
Om ni hinner (inget krav)

Det här utgår ur kursen (beslut 12/10) och bedöms inte. Det står här för team som är klara och vill fortsätta.

Stories för fler komponenter. src/components/NorwayNotice.stories.js. Kortet syns bara när flaggan är på, och flaggan läses när komponenten skapas. Därför sätter beforeEach den före varje story:

import NorwayNotice from './NorwayNotice.vue'

// Flaggan läses från window.**KRAFTLY** (config.js, M5). beforeEach sätter den och städar efteråt.
const withFlag = (on) => () => {
window.**KRAFTLY** = { env: 'storybook', features: { norway: on } }
return () => delete window.**KRAFTLY**
}

export default { title: 'Komponenter/NorwayNotice', component: NorwayNotice, tags: ['autodocs'] }

export const FlagganPa = { name: 'Flaggan på', beforeEach: withFlag(true) }
export const FlagganAv = { name: 'Flaggan av (visar ingenting)', beforeEach: withFlag(false) }

För diagrammet i ConsumptionChart är en <canvas> utan roll osynlig för en skärmläsare. Ge den role="img" och siffrorna som text: <canvas ref="canvas" role="img" :aria-label="summary">, med

const summary = computed(() =>
'Förbrukning per månad i kWh: ' + (props.months ?? []).map((m, i) => `${m} ${props.values?.[i]}`).join(', ')
)

(computed importeras från vue.) Story: args: { months: ['Jan', 'Feb', 'Mar'], values: [730, 640, 470] }.

Ett axe-test för flyttanmälan, också när felen visas. Lägg till i MoveFormView.a11y.test.js (och import { axe } from 'jest-axe' överst):

it('har inga axe-överträdelser när felen visas', async () => {
const user = userEvent.setup()
const { container } = render(MoveFormView)
await user.click(screen.getByRole('button', { name: 'Skicka flyttanmälan' }))
expect(await axe(container)).toHaveNoViolations()
})

Förmodligen blir det rött: ARIA role alert is not allowed for given element (aria-allowed-role). En <ul> får inte ha role="alert", eftersom rollen tar bort att den är en lista och då står <li> utan lista. Lösningen är att lägga rollen på ett omslag i stället: <div v-if="errorList.length" role="alert"><ul class="errors">…</ul></div>. Det felet syns bara när felen visas, och det är därför ett axe-test som bara körs på det tomma formuläret aldrig hittar det.
Om något strular

    Fältet får aldrig type="email": defineOptions({ inheritAttrs: false }) eller v-bind="$attrs" saknas i KField.vue.
    Det går inte att skriva i fältet i Storybook: storyn saknar sin egen ref. Använd render med value: ref('') som i 2.3.
    Unable to find a label with the text of: Postnummer: labeltexten i vyn och i testet är inte exakt likadan. Jämför tecken för tecken, även parenteser.
    Testet i 2.5 är grönt redan innan ni bytt in KField: då har någon redan kopplat felen med aria-describedby. Kontrollera att errors.zip verkligen hamnar i :error och skriv i PR:en att testet var grönt från början och varför.
    Storybook går inte att hitta under required checks: jobbet har inte körts än på en PR eller på main. Pusha, vänta in körningen och sök igen.
    Storybook-jobbet blir rött men npm run build-storybook fungerar lokalt: kör npm ci lokalt (inte npm install) och prova igen. Oftast saknas ett paket i package-lock.json.

Ni är klara när

M9:s DoD 1 är uppfylld på main:

Komponentbiblioteket i pipelinen: KField (label obligatorisk, useId(), aria-describedby för hjälptext och fel, aria-invalid) används i inloggning, profil och flyttanmälan, med story (Violations 0) och test · ett jobb Storybook i ci.yml (npm run build-storybook, artefakt), required check.
