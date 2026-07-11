import { StockMovement, TipoMovimentacao } from '../entities/StockMovement.js';

// Núcleo compartilhado: orquestra produto + movimentação para qualquer tipo
async function movimentar(productRepo, stockRepo, tipo, input) {
  const { produtoid, quantidade, motivo } = input;

  const produto = await productRepo.findById(produtoid);
  if (!produto) throw new Error('produto não encontrado');

  // Valida a movimentação em si (tipo válido, quantidade > 0)
  const movement = new StockMovement({ produtoid, tipo, quantidade, motivo });

  const novaQuantidade =
    tipo === TipoMovimentacao.ENTRADA
      ? produto.quantidade + movement.quantidade
      : produto.quantidade - movement.quantidade;

  // Regra que cruza estado: saída não pode passar do estoque disponível
  if (novaQuantidade < 0) {
    throw new Error(
      `estoque insuficiente: disponível ${produto.quantidade}, solicitado ${movement.quantidade}`
    );
  }

  await productRepo.updateQuantidade(produtoid, novaQuantidade);
  const id = await stockRepo.create(movement.toRecord());

  return { id, ...movement.toRecord() };
}

export function registrarEntrada(productRepo, stockRepo, input) {
  return movimentar(productRepo, stockRepo, TipoMovimentacao.ENTRADA, input);
}

export function registrarSaida(productRepo, stockRepo, input) {
  return movimentar(productRepo, stockRepo, TipoMovimentacao.SAIDA, input);
}

// Lista histórico: geral ou filtrado por produto
export function listarMovimentacoes(stockRepo, produtoid) {
  return produtoid ? stockRepo.listByProduto(produtoid) : stockRepo.list();
}
