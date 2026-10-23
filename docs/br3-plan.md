## BR3-plan – KField + Storybook-jobbet

| Vy           | Fält                                                                                                                     | Hjälptext / fel                                                                                                                                                                                       | Byts av                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| Inloggning   | E-postadress, Lösenord                                                                                                   | Hjälptext: "Problem att logga in? Ring kundservice 020-123 456". Fel: "Fel e-post eller lösenord" (role="alert")                                                                                      | KField x2                           |
| Profil       | Namn, E-postadress, Adress (inga labels/placeholders i dag)                                                              | – (ingen hjälptext, inget fel)                                                                                                                                                                        | KField x3                           |
| Flyttanmälan | Ny adress, Postnummer, Ort, Inflyttningsdatum (ÅÅÅÅ-MM-DD), Avtal (select: Rörligt pris, Fast pris 1 år, Fast pris 3 år) | Hjälptext: "Anmälan måste göras senast 14 dagar före flytt". Fel: "Fyll i alla uppgifter korrekt." eller "Något gick fel, försök igen." Per fält: postnummer exakt 5 tecken, datum får inte vara tomt | KField x4 + lämna select som den är |

1. KField.vue + test + story – Kim & Veronica

2. Inbyte, en vy per person

| Vy           | Görs av  |
| ------------ | -------- |
| LoginView    | Kim      |
| MoveFormView | Andryan  |
| ProfileView  | Veronica |

3. Storybook-jobbet i ci.yml + required check – Andryan
