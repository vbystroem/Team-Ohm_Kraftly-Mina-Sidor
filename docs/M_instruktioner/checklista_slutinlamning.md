Produktionsfärdig app – checklistan

Det här är vad en app brukar ha när den får kallas produktionsfärdig – och varför. Varje rad är något ni gör i Kraftly; kolumnen längst till höger säger i vilken milstolpe. Använd sidan som karta: veckans övning 3 och M-uppgift säger vilka rader som är veckans. När ni undrar varför ett steg i en instruktion finns, står svaret oftast här.

I M10 kopierar ni tabellen till docs/readiness.md och fyller i en kolumn Status (klart · känd brist · saknas) per rad. Det blir ert bevis för "inga kända kritiska brister".
Område Punkt Varför Så bevisar ni det Kraftly
Repo och samarbete Branch protection, PR-mall, CODEOWNERS ingen kod når main utan att någon annan sett den inställningen i GitHub, en PR som blockerats M0
Skuldinventering man kan inte betala av det man inte skrivit upp docs/debt.md M0
Arbetslogg och beslut nästa person ska kunna läsa sig till varför docs/log.md, docs/decisions/ löpande
Kvalitet Enhets- och komponenttester regressioner syns innan kunden ser dem ≥ 10 test, ≥ 1 regressionstest på en bugg ur skulden M1
Lint och format i pre-commit stilfrågor tas av maskinen, inte i code review en commit som stoppats lokalt M1
Teststrategi alla vet vad som testas var docs/testing.md M1
CI Lint + test + build på varje PR, röd status blockerar "funkar på min maskin" slutar gälla grön och röd körning länkade, required check M2
Smoke-test i browsern enhetstester ser inte att sidan inte laddar Cypress-jobbet i pipelinen M2
Beroendecache med uppmätt vinst en snabb pipeline används, en långsam kringgås före/efter-tider i docs/pipeline.md M2
Container Multi-stage Dockerfile, liten image samma artefakt överallt; mindre yta, snabbare deploy docker images under 100 MB M3
docker compose up startar allt en ny kollega är igång på minuter kommandot och vad som startar M3
Leverans Merge till main deployar till staging varje ändring testas i en riktig miljö deploy-jobbet, /version.txt med sha M4
Imagen byggs en gång, taggas med sha det som testats är det som körs taggen i registret = sha på main M4
Hemligheter utanför koden, roterade läckta nycklar är den vanligaste incidenten git log -S tomt, nyckeln bara i plattformen M4
Drift Prod skild från staging, konfig via variabler man ska kunna testa utan att röra kund samma image, olika variabler M5
Feature flag slå av en funktion på sekunder, utan release flaggan på i staging, av i prod M5
Cache-headers på statiska assets färre bytes över nätet, snabbare sida curl -I före/efter M5
Rollback genomförd man övar inte för första gången under en incident logg eller skärmdump av rollbacken M5
Skalningsstrategi på egna mätvärden gissningar skalar inte docs/scaling.md med siffror M5
Säkerhet Riktig autentisering, skyddade routes en fejkad inloggning är ingen inloggning token-flödet, en route som svarar 401 M6
OWASP-genomgång de tio vanligaste hålen är kända – kolla dem docs/security.md, kolumnen Kontroll M6
CORS och CSP begränsar vad som får prata med och köras i er sida curl -I på headrarna M6
Prestanda Mätmetod skriven ner med olika metoder jämför man inställningar, inte kod docs/performance.md, Så mäter vi M7
≥ 3 optimeringar med före/efter en förbättring utan mätning är en åsikt tabellen i docs/performance.md M7
Budget i CI som stoppar annars växer bundlen tillbaka required check, en röd körning M7
Tillgänglighet och komponenter Ett komponentbibliotek en knapp att göra rätt, i stället för tre KButton, inga gamla kvar (M8) · KField (M9) M8, M9
Labels, fokus, kontrast, lang, alt, scope det tangentbordet och skärmläsaren behöver – och ett lagkrav sedan juni 2025 Vad vi åtgärdade i docs/accessibility.md M8
Storybook och axe lokalt komponenterna testas en och en, i isolering stories för KButton och de komponenter ni ändrat, axe-test för KButton och inloggningen (M8) · stories för samtliga och axe-test per formulärvy (M9) · Violations 0 M8, M9
Tangentbordsgenomgång före/efter axe ser inte allt tabellen i docs/accessibility.md M8
Automation och hållbarhet Storybook och axe i pipelinen det som bara körs lokalt körs inte jobben i pipelinen M9
AI-steg utvärderat AI i flödet utan utvärdering är brus tre dokumenterade exempel och teamets regler M9
Hållbarhetsanalys med siffror bytes är energi docs/sustainability.md M9
Dokumentation README, ADR:er, arkitekturskiss nästa team ska kunna ta över docs/ komplett, docs/readiness.md ifylld M10
Inga kända kritiska brister det som är kvar är medvetet, och skrivet Kända brister i varje dokument M10
Release Taggad release, demo live i prod det är det här allt handlade om v1.0, slutdemon v. 12
