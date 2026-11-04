# Slutdemo torsdag 5/11

**Demo-ansvarig:** Kim, Veronica, Andryan · **Miljö:** prod – https://kraftly-ohm.onrender.com · **Tid:** 10 min demo + 5 min frågor · **Version:** `v1.0`

## Körschema
| Minut | Vad | Vem | Vad som ska synas |
|---|---|---|---|
| 0–1 | Vad vi tog över – och vad det kostade beställaren | … | <t.ex. tre rader ur docs/debt.md> |
| 1–… | <ett demo-ögonblick per område – ett, inte en rundtur> | … | <fliken, sidan, siffran> |
| …–9 | Vad vi inte gjorde | … | docs/known-issues.md |
| 9–10 | Sammanfattning: vad portalen klarar i dag | … | <prod, en sak> |
| 10–15 | Frågor | alla | – |

| Minut | Vad | Vem | Vad som ska synas |
|---|---|---|---|
| 0–1 | Introt | Andryan | <t.ex. tre rader ur docs/debt.md> |
| 1–3 | Tester - pipeline | Andryan| <fliken, sidan, siffran> |
| 3-6|Docker| Veronica | Docker desktop, web + api | 
| 3-6|Continuous Delivery / Staging och Prod (Veronica) | Veronica | README (mermaid-diagrammet över pipelinen) |
| 3-6|Security / OWASP | Veronica | Security.md (OWASP-genomgången) |

| 6-9| Performance, A11y / UI, AI-implementering  | Kim | Performance – dashboarden med hero-bilden och diagrammet. Resultat från docs/performance.md. A11y / AI – visa tangentbordsnavigering med Tab och Enter samt visa kort KButton.vue, label och Sidan runt komponenterna,  AI-implementering – visa ai-in-pipeline.md.
| 9–10 | Sammanfattning: vad portalen klarar i dag | Kim, Veronica, Andryan | <prod, en sak> |
| 10–15 | Frågor | alla | – |

## Förberedelser
- [ ] Prod verifierad samma morgon – `/version.txt` visar sha:n för `v1.0`
- [ ] Prod väckt tio minuter före (Render sover efter 15 minuter utan trafik)
- [ ] Flikarna öppna, i ordning: …
- [ ] Inloggad med testkontot i en flik, utloggad i en annan
- [ ] Reserven på skrivbordet: skärmdumpar av varje demo-ögonblick, eller en inspelning
- [ ] Det som ska skrivas live finns att kopiera

## Om något går fel 
| Om | Då |
|---|---|
| Prod svarar inte | <reserven: skärmdumparna eller inspelningen – och säg vad som skulle synas> |
| Inloggningen fungerar inte | … |
| Nätet dör | … |
| Vi är efter i tid | <vilket moment som stryks först> |