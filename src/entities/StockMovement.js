// Tipos válidos de movimentação (fonte única da verdade; extensível no futuro)
export const TipoMovimentacao = Object.freeze({
  ENTRADA: 'ENTRADA',
  SAIDA: 'SAIDA',
});

// Entidade StockMovement: representa uma movimentação de estoque e suas invariantes
export class StockMovement {
  constructor({ id, produtoid, tipo, quantidade, motivo, datamovimentacao }) {
    if (!produtoid) throw new Error('produtoid obrigatório');
    if (!Object.values(TipoMovimentacao).includes(tipo)) throw new Error('tipo inválido');
    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      throw new Error('quantidade deve ser maior que zero');
    }
    this.id = id;
    this.produtoid = produtoid;
    this.tipo = tipo;
    this.quantidade = quantidade;
    this.motivo = motivo ?? null;
    this.datamovimentacao = datamovimentacao ?? new Date().toISOString();
  }

  // Converte para formato pronto para persistência (DB)
  toRecord() {
    return {
      id: this.id,
      produtoid: this.produtoid,
      tipo: this.tipo,
      quantidade: this.quantidade,
      motivo: this.motivo,
      datamovimentacao: this.datamovimentacao,
    };
  }
}
