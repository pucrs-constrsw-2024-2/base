# Set the Node.js version
ARG NODE_VERSION=20.17.0

# Use the Node.js Alpine image as the base
FROM node:${NODE_VERSION}-alpine as base

# Set environment variables (ensure these are provided during build or runtime)
ENV KEYCLOAK_INTERNAL_HOST=${KEYCLOAK_INTERNAL_HOST}
ENV KEYCLOAK_INTERNAL_PORT=${KEYCLOAK_INTERNAL_PORT}
ENV KEYCLOAK_EXTERNAL_HOST=${KEYCLOAK_EXTERNAL_HOST}
ENV KEYCLOAK_EXTERNAL_PORT=${KEYCLOAK_EXTERNAL_PORT}
ENV KEYCLOAK_CLIENT_ID=${KEYCLOAK_CLIENT_ID}
ENV KEYCLOAK_CLIENT_SECRET=${KEYCLOAK_CLIENT_SECRET}
ENV KEYCLOAK_GRANT_TYPE=${KEYCLOAK_GRANT_TYPE}
ENV KEYCLOAK_REALM=${KEYCLOAK_REALM}
ENV OAUTH_INTERNAL_PORT=${OAUTH_INTERNAL_PORT}
ENV OAUTH_INTERNAL_DEBUG_PORT=${OAUTH_INTERNAL_DEBUG_PORT}

# Set the working directory
WORKDIR /usr/src/app

# Expose port 8080
EXPOSE 8080

# Install dependencies using npm ci with cache to speed up build times
# Ensure Docker BuildKit is enabled for this syntax to work
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the application files and set the ownership to the node user
COPY --chown=node:node . .

# Use the node user to run the application
USER node

# Define the command to start the application
CMD ["npm", "run", "dev"]
