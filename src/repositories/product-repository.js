import { randomUUID } from 'node:crypto';

export class ProductRepositoryPostgres {
  constructor(pool) {
    this.pool = pool;
  }

  async create(product) {
    const id = product.id ?? randomUUID();
    const query = `INSERT INTO products (id, nome, descricao, preco, quantidade, categoria, ativo, criadoem, atualizadoem)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
    const values = [
      id,
      product.nome,
      product.descricao,
      product.preco,
      product.quantidade,
      product.categoria,
      product.ativo,
      product.criadoem,
      product.atualizadoem,
    ];
    await this.pool.query(query, values);
    return id;
  }

  async list(search) {
    if (search) {
      const q = `SELECT * FROM products WHERE nome ILIKE $1`;
      const { rows } = await this.pool.query(q, [`%${search}%`]);
      return rows;
    }
    const { rows } = await this.pool.query('SELECT * FROM products');
    return rows;
  }

  async findById(id) {
    const { rows } = await this.pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return rows[0] ?? null;
  }

  async update(id, product) {
    const q = `UPDATE products SET nome=$1, descricao=$2, preco=$3, quantidade=$4, categoria=$5, ativo=$6, atualizadoem=$7 WHERE id=$8`;
    const values = [
      product.nome,
      product.descricao,
      product.preco,
      product.quantidade,
      product.categoria,
      product.ativo,
      product.atualizadoem,
      id,
    ];
    await this.pool.query(q, values);
  }

  async delete(id) {
    await this.pool.query('DELETE FROM products WHERE id=$1', [id]);
  }
}
