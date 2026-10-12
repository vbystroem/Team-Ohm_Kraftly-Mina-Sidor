## Beslut om tokenlagring

## Var lagrar vi access token?

Vi har valt att lagra access token i minnet i stället för i localStorage eller en cookie. Token används när vi gör anrop till API för att visa att användaren är inloggad.

## Alternativ

LocalStorage: Token finns kvar även om man laddar om sidan, men JavaScript kan komma åt den. Om sidan drabbas av en XSS-attack finns det risk att någon stjäl token.

Cookie: En cookie kan användas för att lagra token. Om den har HttpOnly kan JavaScript inte läsa den. Vi använder en httpOnly-cookie för vår refresh token.

Minnet: Token sparas tillfälligt i minnet och försvinner när sidan laddas om. Vi har valt detta eftersom det minskar risken att token stjäls från webbläsarens lagring.

## Varför valde vi detta?

Vi valde att lagra access token i minnet eftersom det är säkrare än att spara den i localStorage. När token går ut använder vi refresh-cookien för att hämta en ny access token. På så sätt kan användaren fortsätta vara inloggad utan att access token behöver sparas permanent i webbläsaren.
