# OAuth

1. Efetuar login

POST http://localhost:8001/auth/login
Request body:
{
username: admin@pucrs.br
password: a12345678
}

2. Criar usuário (requer autenticação)

POST http://localhost:8001/users
Request body:
{
    "username":"me@gmail.com",
    "firstName":"usuario",
    "lastName":"novo",
    "credentials":[{
        "value":"abc123"
        }]
}

3. Retorna a lista de todos os usuários (requer autenticação)

GET http://localhost:8001/users
Request body: (vazio)

4. Retorna o usuário com o id especificado (requer autenticação)

GET http://localhost:8001/users/{id}
Request body: (vazio)

5. Atualiza o usuário com o id especificado (obs: Como username e email devem ser iguais, informar apenas um atualizará o outro também. Se os dois forem informados, o campo email será priorizado) (requer autenticação)

PUT http://localhost:8001/users/{id}
Request body:
{
  "firstName": "Novo Nome",
  "lastName": "Novo Sobrenome"
}

6. Atualiza a senha do usuário com o id especificado (requer autenticação)

PATCH http://localhost:8001/users/{id}/password
Request body:
{
  "password": "novaSenhaSegura123"
}

7. Desabilita o usuário com o id especificado. (requer autenticação)

DELETE http://localhost:8001/users/{id}
Request body: (vazio)
