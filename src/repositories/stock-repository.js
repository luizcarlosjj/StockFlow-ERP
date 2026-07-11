import { randomUUID } from 'node:crypto';

// Repositório de movimentações: histórico append-only (sem update/delete)
export class StockRepositoryPostgres {
  constructor(pool) {
    this.pool = pool;
  }

  async create(movement) {
    const id = movement.id ?? randomUUID();
    const query = `INSERT INTO stock_movements (id, produtoid, tipo, quantidade, motivo, datamovimentacao)
    VALUES ($1,$2,$3,$4,$5,$6)`;
    const values = [
      id,
      movement.produtoid,
      movement.tipo,
      movement.quantidade,
      movement.motivo,
      movement.datamovimentacao,
    ];
    await this.pool.query(query, values);
    return id;
  }

  async list() {
    const { rows } = await this.pool.query(
      'SELECT * FROM stock_movements ORDER BY datamovimentacao DESC'
    );
    return rows;
  }

  async listByProduto(produtoid) {
    const { rows } = await this.pool.query(
      'SELECT * FROM stock_movements WHERE produtoid = $1 ORDER BY datamovimentacao DESC',
      [produtoid]
    );
    return rows;
  }
}
