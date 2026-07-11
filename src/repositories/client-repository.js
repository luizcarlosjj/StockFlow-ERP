import { randomUUID } from "node:crypto";

export class ClientRepositoryPostgres {
    constructor(pool) {
        this.pool = pool;
    }

    async create(client) {
        const id = client.id ?? randomUUID();
        const query = `INSERT INTO clients (id, nome, telefone, documento, ativo, criadoem, atualizadoem) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
        const values = [
            id,
            client.nome,
            client.telefone,
            client.documento,
            client.ativo,
            client.criadoem,
            client.atualizadoem
        ];
        await this.pool.query(query, values);
        return id;
    }

    async list(search) {
        if (search) {
            const q = `SELECT * FROM clients WHERE nome ILIKE $1`;
            const { rows } = await this.pool.query(q, [`%${search}%`]);
            return rows;
        }
        const { rows } = await this.pool.query('SELECT * FROM clients');

        return rows;
    }

    async findById(id) {
        const { rows } = await this.pool.query('SELECT * FROM clients WHERE id = $1', [id]);
        return rows[0] ?? null;
    }

    async update(id, client) {
        const q = `UPDATE clients SET nome=$1, telefone=$2, documento=$3, ativo=$4, atualizadoem=$5 WHERE id=$6`;
        const values = [
            client.nome,
            client.telefone,
            client.documento,
            client.ativo,
            client.atualizadoem,
            id,
        ];
        await this.pool.query(q, values);
    }

    async delete(id) {
        await this.pool.query('DELETE FROM clients WHERE id=$1', [id]);
    }
}