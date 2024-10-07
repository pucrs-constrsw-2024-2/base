# Auth
## Arquitetura

A arquitetura para este serviço segue os princípios da Arquitetura Hexagonal (Ports and Adapters), onde a lógica central de negócios (localizada na camada `application`) é desacoplada de sistemas externos por meio de interfaces bem definidas (ports) e implementações (adapters).

- **Camada Application**: Contém os casos de uso que gerenciam as funcionalidades principais e os Data Transfer Objects (DTOs) para manipular o fluxo de dados.
  
- **Camada Adapter**: Responsável por interagir com frameworks e serviços externos, como as controllers REST para lidar com requisições HTTP e as integrações com o Keycloak para autenticação. Essa separação garante flexibilidade, permitindo que a lógica central permaneça independente de tecnologias externas, facilitando a testabilidade e a adaptabilidade.

## Documentação

Para mais informações sobre a API, acesse a documentação Swagger em:
[Documentação Swagger](http:localhost:8080/swagger-ui.html)
