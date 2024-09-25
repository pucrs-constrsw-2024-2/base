# OAuth

# API com Express.js e Swagger

Esta aplicação é uma REST API construída com Express.js e documentada utilizando Swagger. A seguir, estão descritas a arquitetura da aplicação, a URL da documentação Swagger e as instruções para executar o projeto localmente.

## Arquitetura de Software

A API segue uma arquitetura de rotas separadas para autenticação e gerenciamento de usuários:

- **Express.js** é o framework usado para criar a API.
- **Swagger** é utilizado para documentar as rotas e as respostas da API.
- **Body-parser** é empregado para processar as requisições com `JSON`.

### Estrutura de Arquivos

- **`/routes/auth`**: Rota de autenticação (login).
- **`/routes/users`**: Rota para gerenciar usuários (criar, editar, etc.).
- **`/swaggerConfig`**: Configuração da documentação Swagger.

## Documentação Swagger

A documentação da API gerada pelo Swagger pode ser acessada através da seguinte URL quando o servidor está em execução:

http://localhost:3000/api-docs


Essa documentação detalha todas as rotas disponíveis, suas respectivas requisições e respostas, incluindo exemplos de uso.

## Instruções para Execução

### Pré-requisitos

- **Docker**

### Passos para executar o projeto

1. Suba o conteiner Docker:
   docker compose up
2. Acesse a documentação Swagger em:
   http://localhost:3000/api-docs
3. Acesse a aplicação no navegador em:
   http://localhost:3000

