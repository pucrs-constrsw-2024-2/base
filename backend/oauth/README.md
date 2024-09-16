# OAuth

Serviço de autenticação por Keycloak da disciplina de Construção de Software.

## Arquitetura

O serviço foi desenvolvido com o objetivo de diminuir o acoplamento com o framework das regras de negócio, garantindo uma maior manutenibilidade do código. Para alcançar esse objetivo, foi utilizada uma arquitetura em camadas, conforme descrito na estrutura de pastas abaixo: 

```
.
├── adapters                  # Funções responsáveis por abstrair o uso das dependências usadas
├── config                    # Arquivos de configuração e variáveis de ambiente
├── controller                # Camada de comunicação com o cliente
├── handler                   # Camada intermediária entre o framework express e a aplicação
├── middlewares               # Funções intermediárias que executam ao chamar os endpoints da aplicação
├── models                    # Modelos de dados usados na aplicação
├── public                    # Arquivos para documentação e Swagger UI
├── rest                      # Camada de comunicação para APIs externas
├── routes                    # Cadastro dos endpoints da aplicação
├── services                  # Camada de regras de negócio
├── utils                     # Funções utilitárias
```

baixo, a URL para acessar a documentação Swagger do serviço contendo todos os endpoints disponíveis:

```
http://localhost:<OAUTH_INTERNAL_PORT>/api/oauth/docs/swagger/index.html 
```

## Instruções

Para inicializar a aplicação, siga as intruções abaixo:

Dentro do diretório do serviço de autenticação, instale as dependências com o comando:
```
> npm install
```

Para inicializar a aplicação, execute o comando:

```
> npm run dev
```

Após a inicialização, a aplicação mostrará no console a mensagem '🚀 Servidor rodando na porta <OAUTH_INTERNAL_PORT>!'. 