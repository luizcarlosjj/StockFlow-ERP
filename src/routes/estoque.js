// Rotas HTTP de Estoque: adaptam requisições HTTP para os use-cases
import {
  registrarEntrada,
  registrarSaida,
  listarMovimentacoes,
} from '../usecases/estoqueUseCases.js';

export async function registerEstoqueRoutes(server, { productRepo, stockRepo }) {
  // Entrada de estoque
  server.post('/estoque/entrada', async (req, reply) => {
    try {
      const mov = await registrarEntrada(productRepo, stockRepo, req.body);
      return reply.status(201).send(mov);
    } catch (err) {
      return reply.status(400).send({ error: err.message });
    }
  });

  // Saída de estoque
  server.post('/estoque/saida', async (req, reply) => {
    try {
      const mov = await registrarSaida(productRepo, stockRepo, req.body);
      return reply.status(201).send(mov);
    } catch (err) {
      return reply.status(400).send({ error: err.message });
    }
  });

  // Histórico geral de movimentações
  server.get('/estoque/movimentacoes', async (req, reply) => {
    const movs = await listarMovimentacoes(stockRepo);
    return reply.send(movs);
  });

  // Histórico de um produto específico
  server.get('/estoque/movimentacoes/:produtoId', async (req, reply) => {
    const movs = await listarMovimentacoes(stockRepo, req.params.produtoId);
    return reply.send(movs);
  });
}
