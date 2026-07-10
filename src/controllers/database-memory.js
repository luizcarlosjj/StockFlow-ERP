import { randomUUID } from "node:crypto";

export class Databasememory {
    #produtos = new Map();

    async list(search){
        return Array.from(this.#produtos.entries())
        .map((ProdutoArray) => {
            const id = ProdutoArray[0]
            const data = ProdutoArray[1]

            return {
                id,
                ...data
            }
        })
        .filter(produto => {
            if (search) {
                return produto.nome.includes(search)
            }
        })
    }

    create(produto){
        const produtoId = randomUUID();
        this.#produtos.set(produtoId, produto);
    }

    update(id,produto) {
        this.#produtos.set(id, video);
    }

    delete(id) {
        this.#produtos.delete(id);
    }
}