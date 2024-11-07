## Descrição
Este projeto foi desenvolvido com o objetivo de demonstrar uma aplicação completa aos alunos da Arnia do módulo de backend avançado com Nestjs. Pra isso foi desenvolvida uma API que cuida do gerenciamento de Usuários (administradores, estudantes e instrutores) e suas matérias relacionadas. Link para a documentação do projeto [aqui](https://arnia-m4-t7-production.up.railway.app/v1/docs).

## Tecnologias
- [Nestjs](https://docs.nestjs.com/): Framework Nodejs + Express para o desenvolvimento da API.
- [Postgres](https://www.postgresql.org/): Banco de dados relacional utilizado para gerenciamento dos dados do projeto.
- [Typeorm](https://typeorm.io/): ORM utilizado para acesso ao banco de dados de maneira simples e fluida.
- [Swagger](https://swagger.io/): Framework utilizado para desenvolvimento da documentação do projeto (OpenAPI).
- [Jest](https://jestjs.io/pt-BR/): Biblioteca de testes utilizada para o projeto.

## Instalando e rodando o projeto
Inicialmente para configuração do projeto, deverá ser copiado o arquivo .env.example e renomeado para .env e então preenchido com os valores das variáveis de ambiente. Após esse processo para instalação das devidas dependências, deve-se executar o seguinte comando:

```
npm i
```

Após instalação, caso ocorra tudo como esperado, pode ser executado o comando a seguir para iniciar o projeto em desenvolvimento:

```
npm run start:dev
```

Além disso, para caso de teste de inicialização em produção, deverá ser executado os seguintes comandos em sequência:

```
npm run build
```

```
npm run start:prod
```

## Testes
Para executar os testes presentes no projeto, executar o comando:
```
npm run test
```

## Documentações adicionais
#### DER

![DER](https://private-user-images.githubusercontent.com/90461911/384161841-7d98ac5a-eb89-4ad9-a0b2-459f67a1845b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzEwMTk1MjAsIm5iZiI6MTczMTAxOTIyMCwicGF0aCI6Ii85MDQ2MTkxMS8zODQxNjE4NDEtN2Q5OGFjNWEtZWI4OS00YWQ5LWEwYjItNDU5ZjY3YTE4NDViLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDExMDclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMTA3VDIyNDAyMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTNkN2VhZDk0Y2NkYWFjNTdjZmY5M2E1ZTFhZThmOWZiNzlhZTBlOWQ0ZGUyMTcyOTY4YWE1NTliMzdhNjQ4NWUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.mRQNNLilhhfqvNuumRru33CusZj4p-DHhuK9mqFi01I)



