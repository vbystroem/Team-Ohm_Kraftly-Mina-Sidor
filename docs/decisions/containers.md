# Containers

**Datum:** 2026-09-15
**Beslut:** Vi använder en multi-stage Docker-image med nginx:1.24-alpine för frontend och en separat Node:22-alpine-service för mock-API.

## Bakgrund

Vi behövde bestämma hur Kraftly skulle köras i Docker och hur vi kunde hålla image-storleken nere. Vi ville också att frontend skulle kunna kommunicera med API via Docker Compose.

## Alternativ vi jämförde

|                                    | Multi-stage med nginx:1.24-alpine (valt)                                                                         | Naiv image med Node + dist                                  |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Hur stor blir imagen?              | 76,8 MB.                                                                                                         | 250+ MB.                                                    |
| Hur skiljer sig körning och drift? | Frontend serveras med nginx och mock-API körs separat. Det ger en mindre image men kräver två separata tjänster. | Node och dist ingår i samma image. Det ger en större image. |

## Motivering

Vi valde multi-stage med nginx:1.24-alpine eftersom den färdiga imagen blev betydligt mindre än en naiv image med Node och dist. Mock-API körs separat med Node:22-alpine. Priset är att frontend och API behöver hanteras som separata tjänster och att nginx behöver konfigureras för att vidarebefordra API-anrop.

## Konsekvenser

- Frontend och API körs som separata tjänster i Docker Compose.
- Frontend anropar API via `/api`, som nginx vidarebefordrar till `http://api:4000`.
- Image-storleken kontrolleras i CI och ska vara under 100 MB.
- **Omprövas om** image-storleken ökar över gränsen, eller om projektets krav på drift och uppdelning mellan frontend och API förändras.

## Hur man kör

```bash
# Från repo-roten
docker compose up --build
```

- Frontend: http://localhost:8080
- API: http://localhost:4000

## Storlekstabell

| Image                                               | Storlek (DISK USAGE) |
| --------------------------------------------------- | -------------------- |
| kraftly-mina-sidor (multi-stage, nginx:1.24-alpine) | 76.8 MB              |
| Naiv image (med Node + dist)                        | 250+ MB              |

_Skärmdump:_
![docker image ls kraftly-mina-sidor](image-9.png)

## Tre beslut

1. **Basimage**: nginx:1.24-alpine (lättvikt, 64.4 MB basstorlek)
2. **Mock-API**: Körs som separat service i docker-compose med Node:22-alpine
3. **Browser -> API**: Anropar /api relativt, nginx proxar till http://api:4000 (servicename i docker-compose)

## Vad som körs i CI

- `docker build` som eget jobb i GitHub Actions
- Loggarens storlek skrivs ut i build-loggen
- Verifierar att imagen är < 100 MB

## Kända begränsningar

- Testad på Windows med Docker Desktop
- Kräver Docker Desktop igång för att bygga lokalt
