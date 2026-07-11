# StockFlow-ERP

Projeto simples de API para gerenciar produtos e clientes usando Node.js e PostgreSQL.

## Estrutura principal

- `src/entities` - regras e validação de dados (produto e cliente)
- `src/infra` - configuração do banco de dados / conexão
- `src/repositories` - acesso ao banco com consultas SQL
- `src/usecases` - lógica da aplicação (criar, listar, atualizar, excluir)
- `src/routes` - rotas HTTP da API

## Rotas principais

- `GET /clients` - listar clientes
- `POST /clients` - criar cliente
- `GET /clients/:id` - buscar cliente por id
- `PUT /clients/:id` - atualizar cliente
- `DELETE /clients/:id` - excluir cliente

## Como usar

1. Instale dependências:
   ```bash
   npm install
   ```
2. Configure o banco de dados PostgreSQL.
3. Inicie o servidor:
   ```bash
   npm start
   ```
4. Use as rotas no `routes.http` para testar.

## Observação

O projeto usa uma arquitetura simples com camadas separadas para regras de negócio, persistência e rotas.
