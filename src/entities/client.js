export class Client {
    constructor({ id, nome, email, telefone, documento, ativo = true, criadoem, atualizadoem }) {
        if (!nome) throw new Error('nome obrigatório');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) throw new Error('email inválido');

        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.documento = documento;
        this.ativo = ativo;
        this.criadoem = criadoem ?? new Date().toISOString();
        this.atualizadoem = atualizadoem ?? null;
    }

    toRecord() {
        return {
            id: this.id,
            nome: this.nome,
            email: this.email,
            telefone: this.telefone,
            documento: this.documento,
            ativo: this.ativo,
            criadoem: this.criadoem,
            atualizadoem: this.atualizadoem,
        };
    }
}