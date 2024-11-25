# api/Dockerfile
FROM node:20.11.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${BFF_INTERNAL_PORT}

CMD ["node", "app.js"]
