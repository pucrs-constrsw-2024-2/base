## Documentação do Projeto

A seguinte API tem como objetivo comunicar-se com a API do Keycloak. 
A API pode criar/registrar/logar/atualizar/deletar um usuário. A fim de poder utilizar os endpoints é necessário, primeiramente, logar com o usuário já cadastrado.

Por conseguinte, a arquitetura da API foi dividida em três camadas, Controller, Service e Repositery. Ademais, a API fornece tratamento de erros HTTP.

Ambos os serviços (API e Keycloak) estão rodando em containers docker por meio da utilização da utilização do arquivo **docker-compose.yml**.

## URL Swagger

```
http://localhost:8090/swaggerui.html
```


## Como rodar
Para rodar o projeto é necessário estar no diretório base do projeto, e exeutar o seguinte comando:

```
docker-compose up -d
```

