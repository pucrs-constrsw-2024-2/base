FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${OAUTH_INTERNAL_PORT}
EXPOSE ${OAUTH_INTERNAL_DEBUG_PORT}

CMD ["npm", "run", "dev"]