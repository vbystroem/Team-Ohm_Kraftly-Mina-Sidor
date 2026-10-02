FROM node:22-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.27-alpine
# Mall, inte färdig config: PORT, API_URL och API_KEY kommer från miljön vid start.
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY docker/security-headers.conf /etc/nginx/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html
# Skriver config.js från miljön när containern startar
COPY --chmod=755 docker/40-runtime-config.sh /docker-entrypoint.d/40-runtime-config.sh
ARG GIT_SHA=lokal
RUN echo "$GIT_SHA" > /usr/share/nginx/html/version.txt
# Render sätter PORT själv. Lokalt och i compose gäller 80.
ENV PORT=80
EXPOSE 80