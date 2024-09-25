# API de Gerenciamento de Usuários com OAuth

Esta API permite o gerenciamento de usuários em um sistema que utiliza autenticação OAuth. Ela foi desenvolvida utilizando Node.js e oferece diversas funcionalidades relacionadas à criação, atualização, consulta e desabilitação de usuários.

## Arquitetura de Software

A API é construída sobre uma arquitetura RESTful, onde os recursos são acessíveis via endpoints HTTP. As operações CRUD (Create, Read, Update, Delete) são realizadas através de métodos HTTP apropriados. A autenticação é gerida por meio do OAuth, garantindo a segurança das operações.

### Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para construção de APIs REST.
- **Keycloak**: Sistema de gerenciamento de identidade e acesso (IAM) para autenticação e autorização.

## Documentação

A documentação da API pode ser acessada através do [Swagger](http://localhost:8001/api-docs).

## Endpoints

### 1. Efetuar login

- **Método**: `POST`
- **URL**: `http://localhost:8001/auth/login`
- **Request body**:
  ```json
  {
    "username": "admin@pucrs.br",
    "password": "a12345678"
  }
```

### 2. Criar um usuário (Requer autenticação e permissão)

- **Método**: `POST`
- **URL**: `http://localhost:8001/auth/users`
- **Request body**:
  ```json
 {
  "username": "me@gmail.com",
  "firstName": "usuario",
  "lastName": "novo",
  "credentials": [{
      "value": "abc123"
    }]}
```

### 3. Retorna a lista de todos os usuários (requer autenticação e permissão)

- **Método**: `GET`
- **URL**: `http://localhost:8001/auth/users`
- **Request body**: (vazio)

### 4. Retorna o usuário com o id especificado (requer autenticação e permissão)

- **Método**: `GET`
- **URL**: `http://localhost:8001/auth/users/<id>`
- **Request body**: (vazio)

### 5. Atualiza o usuário com o id especificado (requer autenticação e permissão)

- **Método**: `PUT`
- **URL**: `http://localhost:8001/auth/users/<id>`
- **Request body**:
```json
{
  "firstName": "Novo Nome",
  "lastName": "Novo Sobrenome"
}
```
 Como *username* e *email* devem ser iguais, atualizar um modificará o outro também. Se ambos forem informados ao mesmo tempo, o campo *email* será priorizado e *username*, ignorado.

 ### 6. Atualiza a senha do usuário com o id especificado (requer autenticação e permissão)

 - **Método**: `PATCH`
- **URL**: `http://localhost:8001/auth/users/<id>`
- **Request body**:
```json
{
  "password": "novaSenhaSegura123"
}
```

### 7. Desabilitar o usuário com o id especificado (requer autenticação)

- **Método**: `DELETE`
- **URL**: `http://localhost:8001/auth/users/<id>`
- **Request body**: (vazio)


## Coleção do Postman

A coleção de *endpoints* pode ser importada para o Postman com [este link](https://www.postman.com/gabrielgiaretta/workspace/constrsw "este link")
