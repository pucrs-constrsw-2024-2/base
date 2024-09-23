# OAuth

A arquitetura para este serviço segue os princípios da Arquitetura Hexagonal (Ports and Adapters), onde a lógica central de negócios (localizada na camada application) é desacoplada de sistemas externos por meio de interfaces bem definidas (ports) e implementações (adapters). 

A camada application contém os casos de uso que gerenciam as funcionalidades principais e os Data Transfer Objects (DTOs) para manipular o fluxo de dados. 

A camada adapter é responsável por interagir com frameworks e serviços externos, como as controllers REST para lidar com requisições HTTP e as integrações com o Keycloak para autenticação. Essa separação garante flexibilidade, permitindo que a lógica central permaneça independente de tecnologias externas, facilitando a testabilidade e a adaptabilidade.