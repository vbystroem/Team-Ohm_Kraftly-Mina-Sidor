# Beslut: Hur arbetar vi med Git-grenar?

**Datum:** 2026-11-02  
**Beslut:** Vi använder trunk-based development med en gemensam huvudgren (`main`), kortlivade arbetsgrenar och Pull Requests.

_Efterhandsskrivet v.11 – beslutet togs i vecka 1._

## Bakgrund

Vi behövde bestämma hur vi skulle arbeta med Git-grenar under projektet. Målet var att ha ett gemensamt arbetssätt för hur ändringar skulle göras och föras in i huvudgrenen.

## Alternativ vi jämförde

|                        | Trunk-based development (valt)                                                                                                                                       | Långlivade separata grenar                                                                          |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Hur skiljer de sig åt? | Alla arbetar mot en gemensam huvudgren (`main`). Varje person skapar en egen, kortlivad arbetsgren för sin uppgift och för sedan in ändringarna via en Pull Request. | Olika arbetsgrenar används under längre tid innan ändringarna förs ihop med huvudgrenen.            |
| Risk                   | Ändringar behöver granskas och teamet måste följa reglerna för `main`. Det kan fortfarande uppstå konflikter om flera ändrar samma kod.                              | Grenarna kan skilja sig mycket från varandra, vilket kan göra det svårare att slå ihop ändringarna. |
| Drift                  | Vi använder Pull Requests för att granska ändringar. Med squash merge slås alla commits från arbetsgrenen ihop till en enda commit i `main`.                         | Teamet behöver hålla flera grenar uppdaterade och hantera sammanslagningar.                         |
| Pris                   | Ingen separat kostnad undersöktes.                                                                                                                                   | Ingen separat kostnad undersöktes.                                                                  |

## Motivering

Vi valde trunk-based development med en gemensam huvudgren. Det innebär att varje person arbetar med sina ändringar i en egen arbetsgren och sedan öppnar en Pull Request för granskning innan ändringarna förs in i `main`.

Vi använder squash merge, vilket innebär att flera commits från en arbetsgren slås ihop till en enda commit när ändringarna förs in i `main`. Det gör historiken i huvudgrenen enklare att följa.

En viktig del av beslutet är att ingen får gå förbi reglerna för `main`, inte heller tech lead. Det gör att samma regler gäller för hela teamet.

Priset är att ändringar behöver gå igenom Pull Requests och granskas innan de förs in i huvudgrenen.

## Konsekvenser

- Teamet arbetar utifrån en gemensam huvudgren (`main`).
- Vi använder kortlivade arbetsgrenar för ändringar.
- Ändringar granskas via Pull Requests innan de förs in i `main`.
- Squash merge används för att slå ihop commits och hålla historiken i `main` tydlig.
- Ingen, inte heller tech lead, får gå förbi reglerna för `main`.
- **Omprövas om** teamets arbetssätt inte längre fungerar bra eller om projektets storlek gör att en annan grenstrategi behövs.
