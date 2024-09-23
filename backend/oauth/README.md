# Documentação do Projeto OAuth

## Descrição

Este projeto é uma API para gerenciamento de usuário desenvolvido em uma arquitetura em camadas. Utilizamos um padrão dividido em três camadas principais: **Service**, **Controller** e **Client**. O sistema foi projetado para se integrar com o Keycloak para autenticação e autorização.

## Arquitetura

### Camadas do Sistema

1. **Controller**: 
   - Responsável por gerenciar as requisições HTTP e interagir com os serviços. Os controladores processam as entradas, chamam os serviços apropriados e retornam as respostas ao cliente.

2. **Service**: 
   - Contém a lógica de negócio da aplicação. Os serviços realizam operações complexas e interagem com as camadas de dados, se necessário. Essa camada é responsável por implementar regras de negócio e manipular dados.

3. **Client**: 
   - Encapsula a comunicação com o Keycloak, gerenciando as requisições de autenticação e autorização. Essa camada facilita a integração com o Keycloak e oferece uma interface simplificada para os serviços e controladores.

## Documentação da API

A documentação da API pode ser acessada através do Swagger, que fornece uma interface visual para explorar e testar os endpoints da aplicação.

- **URL do Swagger**: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

Além disso, também foi criada uma collection e um ambiente do Postman para validação de requisições da API. Importe os arquivos do seguinte path:
- **Collection do Postman**: [collection](../../2024-2-constrsw.postman_collection.json) e [environment](../../constrsw.postman_environment.json)

## Instruções para Execução

Para executar a aplicação, utilize o Docker Compose. Siga as instruções abaixo:

1. Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.
2. Clone este repositório em sua máquina local.
3. Navegue até o diretório do projeto.
4. Crie os três volumes do docker
```bash
docker volume create constrsw-keycloak-data
docker volume create constrsw-postgresql-data
docker volume create constrsw-mongodb-data
```
6. Execute o seguinte comando:

   ```bash
   docker-compose up
   ```

7. A aplicação estará disponível em `http://localhost:8080`.
