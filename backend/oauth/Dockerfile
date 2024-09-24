
ARG NODE_VERSION=20.17.0

ENV KEYCLOAK_INTERNAL_HOST=${KEYCLOAK_INTERNAL_HOST}
ENV KEYCLOAK_INTERNAL_PORT=${KEYCLOAK_INTERNAL_PORT}
ENV KEYCLOAK_CLIENT_ID=${KEYCLOAK_CLIENT_ID}
ENV KEYCLOAK_CLIENT_SECRET=${KEYCLOAK_CLIENT_SECRET}
ENV KEYCLOAK_GRANT_TYPE=${KEYCLOAK_GRANT_TYPE}
ENV KEYCLOAK_REALM=${KEYCLOAK_REALM}

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app
EXPOSE 8080

FROM base as dev
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
USER node
COPY . .
CMD npm run dev