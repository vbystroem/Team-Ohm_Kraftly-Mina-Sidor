<!-- ## M7

co2.js – Sustainable Web Design v4 · dist/ (index.html + assets/, okomprimerat)

| kB per besök | g CO2e per besök (SE) | kg CO2e per månad (SE) | kg CO2e per månad (globalt) |
| -----------: | --------------------: | ---------------------: | --------------------------: |
|          268 |                 0,016 |                    2,0 |                         4,9 |

Elmix (co2.js): Sverige 35,89 g CO2e/kWh (SWE) · globalt 472,94 g CO2e/kWh (WORLD)
Energi: 10,3 kWh per månad (34,3 GB × 0,30 kWh/GB)
Antaganden: 40 000 kunder × 3,2 sessioner = 128 000 besök/månad · andel förstabesök 100 %
Obs: tillverkningen av enheter, nät och datacenter räknas alltid med SWD v4:s globala 494 g CO2e/kWh – bara driften får landets mix.

## M6

npm run co2 -- ../kraftly-m6/dist

> kraftly-mina-sidor@0.9.0 co2
> node scripts/co2.mjs ../kraftly-m6/dist
> |---:|---:|---:|---:|
> | 6 880 | 0,408 | 52,2 | 126,9 |

Elmix (co2.js): Sverige 35,89 g CO2e/kWh (SWE) · globalt 472,94 g CO2e/kWh (WORLD)
Energi: 264,2 kWh per månad (880,6 GB × 0,30 kWh/GB)
Antaganden: 40 000 kunder × 3,2 sessioner = 128 000 besök/månad · andel förstabesök 100 %
Obs: tillverkningen av enheter, nät och datacenter räknas alltid med SWD v4:s globala 494 g CO2e/kWh – bara driften får landets mix. -->

# Hållbarhet och etik

## Siffrorna

<Uppmätt med scripts/co2.mjs (co2.js 0.19.0, Sustainable Web Design-modellen v4), datum.>

|                     | kB per besök | g CO2e per besök (SE) | kg CO2e per månad (SE) | kg CO2e per månad (globalt) |
| ------------------- | ------------ | --------------------- | ---------------------- | --------------------------- |
| Före M7 (taggen M6) | 6 880        | 0,408                 | 52,2                   | 126,9                       |
| Efter M7 (main)     | 268          | 0,016                 | 2,0                    | 4,9                         |

## Metoden och vad vi inte räknar

<Tre meningar: vad vi mätte och hur (okomprimerat, varje besök som första, svensk elmix … g/kWh),
trafiken (40 000 kunder × … sessioner, och varför just det antagandet), och vad som inte är med.>

Elmix (co2.js): Sverige 35,89 g CO2e/kWh (SWE) · globalt 472,94 g CO2e/kWh (WORLD)
Energi: 264,2 kWh per månad (880,6 GB × 0,30 kWh/GB)
Antaganden: 40 000 kunder × 3,2 sessioner = 128 000 besök/månad · andel förstabesök 100 %
Obs: tillverkningen av enheter, nät och datacenter räknas alltid med SWD v4:s globala 494 g CO2e/kWh – bara driften får landets mix.

Vi baserar våra beräkningar på antaganden som matchar en vanlig månad hos Kraftly Mina Sidor, därmed 40000 kunder som besöker sidan 3,2 ggr i månaden. För att vara på den säkra sidan antar vi att alla besök sker på en ny enhet, vilket blir 128000 icke-cachade besök i månaden. Eftersom vi använder webbtjänster för hosting kan vi inte räkna med att all el kommer från Sverige, vilket ökar mängden Co2 markant. Vi gör då beräkningarna utifrån SWD v4:s globala nummer: 494g CO2e/KWh (WORLD). Själva driften av sidan sker dock i Sverige (SWE).

## Etikfall: Chatta med Kraftly

**Situationen.**
Förslaget som vi bearbetar är om vi borde bygga en AI-chatt som användare kan ställa frågor gällande sin faktura till, med förklaringen att det hade underlättat i supportärenden då många ärenden gäller relativt enkla frågor om enskilda fakturor.

**Vårt beslut.**
Vi beslutar att inte bygga en sådan funktion innan vi får mer information.

**Varför.**
och vad kunden tror händer med datan när hon skriver i rutan.>
Det finns ett flertal svårigheter gällande dataintegritet med denna prospektiva AI-chatt, alla som går att individuellt lösa, men som vi anser i slutändan leder till ett större arbete än vad det är värt. Det grundläggande problemet är att AI-modeller är externa verktyg som styrs av andra företag med andra förhållanden gällande dataskydd, många av dem i USA, och dessa behöver inte följa GDPR. Vi behöver ta ställning till vilken data chattfunktionen ska få ta del av och hur länge den ska sparas, vem som ska få ta del av den, och hur vi ska säkerställa att användaren samtycker till användningen av denna data. Vad gör vi med denna data om det sker ett dataintrång? Vi anser att den bästa lösningen i detta fall är en lösning som inte behöver bearbeta kundens data.

**Vad vi gör i stället / villkor.**

Eftersom många ärenden gäller samma sak, "varför blev kostnaden så hög?" identifierar vi ett behov hos kunderna att få förståelse för vad som kan påverka elkostnaderna. Vi skulle exempelvis kunna implementera en "FAQ" med de oftast förekommande frågorna och lämna de mer komplicerade ärenden till support som i nuläget har mycket enklare och etablerade metoder för att skydda kundens data enligt GDPR. Vi skulle kunna göra det mer avancerat, med en graf på det genomsnittliga timpriset per timme och ge generella råd, t.ex "kör diskmaskinen på natten." Allt detta är lokalt och använder inte någon av kundens data. Att introducera en AI-chatt känns som för mycket av en huvudvärk att säkra för det lilla man får ut av det.
