# StockFlow-ERP

Projeto simples de API para gerenciar produtos e clientes usando Node.js e PostgreSQL.

## Estrutura principal

- `src/entities` - regras e validação de dados (produto, cliente e movimentação de estoque)
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

## Campos esperados para cliente

- `nome` (string)
- `email` (string)
- `telefone` (string)
- `documento` (string)
- `ativo` (boolean)

## Módulo de Estoque

A quantidade de um produto não pode ser alterada diretamente: toda mudança
passa por uma **movimentação** (ENTRADA ou SAÍDA), que atualiza o estoque do
produto e registra um histórico imutável (append-only).

### Rotas

- `POST /estoque/entrada` - registra entrada (soma ao estoque)
- `POST /estoque/saida` - registra saída (subtrai do estoque)
- `GET /estoque/movimentacoes` - histórico completo
- `GET /estoque/movimentacoes/:produtoId` - histórico de um produto

### Campos esperados para movimentação (POST)

- `produtoid` (uuid) - produto existente
- `quantidade` (inteiro > 0)
- `motivo` (string, opcional)

### Regras de negócio

- Produto deve existir.
- Quantidade deve ser maior que zero.
- Saída não pode ser maior que o estoque disponível (`400 estoque insuficiente`).

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
