// Entidade Product: representa regras do domínio e validações básicas
export class Product {
  constructor({ id, nome, descricao, preco, quantidade, categoria, ativo = true, criadoem, atualizadoem }) {
    if (!nome) throw new Error('nome obrigatório');
    if (typeof preco !== 'number' || preco < 0) throw new Error('preco inválido');
    if (!Number.isInteger(quantidade) || quantidade < 0) throw new Error('quantidade inválida');
    this.id = id;
    this.nome = nome;
    this.descricao = descricao ?? null;
    this.preco = preco;
    this.quantidade = quantidade;
    this.categoria = categoria ?? null;
    this.ativo = ativo;
    this.criadoem = criadoem ?? new Date().toISOString();
    this.atualizadoem = atualizadoem ?? null;
  }

  // Converte para formato pronto para persistência (DB)
  toRecord() {
    return {
      id: this.id,
      nome: this.nome,
      descricao: this.descricao,
      preco: this.preco,
      quantidade: this.quantidade,
      categoria: this.categoria,
      ativo: this.ativo,
      criadoem: this.criadoem,
      atualizadoem: this.atualizadoem,
    };
  }
}
