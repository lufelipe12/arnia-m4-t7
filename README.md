## Descrição
Este projeto foi desenvolvido com o objetivo de demonstrar uma aplicação completa aos alunos da Arnia do módulo de backend avançado com Nestjs. Pra isso foi desenvolvida uma API que cuida do gerenciamento de Usuários (administradores, estudantes e instrutores) e suas matérias relacionadas. Link para a documentação do projeto [aqui]().

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



