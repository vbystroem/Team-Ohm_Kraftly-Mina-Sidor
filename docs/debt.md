1. ingen authentication, alla email + lösen-kombinationer funkar
2. autentisering-funktionen kollar bara efter en flagga i localstorage (gör inget)
3. flera olika knapp-komponenter, utan styling
4. ingen lazy-loading i routingen, blir långsammare
5. api-nyckel är exposed
6. 6MB+ hero image
7. // Simple mock of Kraftly's API. Built for the demo -- NOT for production.

- De har ingen riktig API

8. // Webbmakarna AB / M & J

- Den webbyrån som gjorde hemsidan, inte relevant egentligen då det inte säger så mycket om arbetet

9. tog bort outline från :focus, dåligt för a11y

10. // CORS -- opens everything so it just works

- CORS gör så att andra hemsidor inte kan interagera med kraftly’s api, så att stänga av den är en stor säkerhetsrisk, eftersom användardata ligger där så bryter det mot GDPR också.

11. // quick fix: dashboard felt too fast in the demo, added a delay so the spinner shows /J

- Inte ett riktigt problem, man vill oftast att hemsidan ska ladda så fort som möjligt

12. // anyone gets in, we'll add real auth later(TM)

- Med andra ord kan vem helst komma in, stort problem

13. // PDF generation coming in phase 2 per the quote

- Funktionen för att kunna ladda ner fakturan funkar inte än, och måste implementeras

14. // Dashboard. Got a bit big, clean up some day /M + // debounce on resize, chart.js redraws itself but we log a bit /J

- Lodash har blivit importerat bara för resize och loggning på en chart i charts.js, vilket är onödigt. charts.js hanterar redan debounce on resize själv och Lodash är ett stort paket.
