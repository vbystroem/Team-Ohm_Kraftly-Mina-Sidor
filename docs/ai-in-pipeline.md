# AI i utvecklingsflödet

## Vad vi kopplade in

`ai-review.yml` granskar varje PR mot `main` (egna grenar): diffen under `src/` (max 1 500 rader) går till `claude-opus-5-5` via `scripts/ai-review.mjs` och kommenteras. Avslutar alltid med 0: bara förslag, inte required. Nyckeln: repo-secreten `ANTHROPIC_API_KEY`. Första: #115, 20 s/≈9 öre.

## Utvärdering

23/10.

| PR   | Punkt        | Bedömning | Varför                                                                                                                                                    |
| ---- | ------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #113 | 401          | –         | före nyckeln                                                                                                                                              |
| #115 | inga punkter | –         | tyst                                                                                                                                                      |
| #116 | datumfelet   | träff     | Det kan vara förvirrande för användaren att få ett olämpligt felmeddelande                                                                                |
| #118 | inga punkter | träff     | Ett ärligt försök att få AI:n att snubbla över att hero bilden inte hade alt-text, men den föll inte för det... (aria-hidden-bilder ska inte ha alt-text) |

## Två exempel

#116 – Datumfelet

🤖:"src/views/MoveFormView.vue (tillgänglighet): Felet för inflyttningsdatum är alltid "Fyll i inflyttningsdatum", även när fältet är ifyllt men i fel format. Postnumret får ett eget formatfel ("ska vara fem siffror"), så det verkar som att validateMove även kontrollerar formatet. Den som skriver t.ex. "1/5" får då ett fel som inte stämmer, och via aria-describedby hör skärmläsaren samma vilseledande text. Skilj på tomt fält och fel format, t.ex. "Skriv datumet som ÅÅÅÅ-MM-DD"."

Kommentar: Vi tycker kommentaren är rimlig, då den pekar på ett UX-problem som härstammar från faktum att vi inte är detaljerade nog med våra errormeddelanden. Om en användare skriver datumet med fel format, så är inte problemet att fältet inte är ifyllt.

#118 – Dekorativ bild

🤖: "Inget att anmärka på"

Kommentar: Vi försökte få AI:n att säga att alt-texten saknades från Hero-bilden i DashboardView.vue, men den förstod att det inte behövde någon, då praxis är att ha `alt=""` på bilder med `aria-hidden`

## Vår regel

Vi litar på punkter som pekar på en rad i diffen och går att visa i test, app eller axe; kod utanför diffen kollar vi i filen. Håller vi inte med svarar vi med varför. Stora diffar delas; ny modell = ny utvärdering; ej required.
