# Escolhe a imagem base com Node.js na versão 16.20.2
FROM node:16.20.2-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

# Expõe a porta em que a aplicação será executada
EXPOSE 3000

# Define o comando para rodar a aplicação
CMD ["npm", "start"]
