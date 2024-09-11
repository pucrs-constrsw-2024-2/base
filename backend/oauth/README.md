# OAuth

## Grupo 6

- Marcus Quirino

## pre requisitos

- node 20.11.0
- rest client (vscode)
- keycloak

## run

- nvm use
- mv .env.example .env
- (coloque as variaveis de ambiente no .env)
- npm i
- npm run dev

## teste

para testar uma rota primeiro precisa bater na rota de login para obter o token.

pega o token e coloca no header de autorizacao. (ele n dura muito tempo, então se der unauthorized é
só bater na rota de login de novo)

## antes de pushar

- npm run swagger-autogen
- npm run build
