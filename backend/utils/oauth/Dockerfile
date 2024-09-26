FROM node:18-alpine

# Variáveis de ambiente para configuração do Keycloak
ENV KEYCLOAK_INTERNAL_HOST=${KEYCLOAK_INTERNAL_HOST}
ENV KEYCLOAK_INTERNAL_PORT=${KEYCLOAK_INTERNAL_PORT}
ENV KEYCLOAK_CLIENT_ID=${KEYCLOAK_CLIENT_ID}
ENV KEYCLOAK_CLIENT_SECRET=${KEYCLOAK_CLIENT_SECRET}
ENV KEYCLOAK_GRANT_TYPE=${KEYCLOAK_GRANT_TYPE}
ENV KEYCLOAK_REALM=${KEYCLOAK_REALM}

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json
COPY package*.json ./

# Copia o arquivo swagger.yaml
COPY swagger.yaml ./

# Copia o restante do código da aplicação
COPY . .

# Instala as dependências
RUN npm install

# Cria um grupo e um usuário para executar a aplicação
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /usr/src/app
USER nodejs

# Expõe a porta da aplicação
EXPOSE 3000

# Define a variável de ambiente para produção
ENV NODE_ENV=production

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
