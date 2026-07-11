export class Client {
    constructor({ id, nome, email, telefone, documento, ativo = true, criadoEm, atualizadoEm}) {
        if (!nome) throw new Error('nome obrigatorio');
        const  isValidEmail = ( email ) => emailRegex. test (email);
        if (!isValidEmail) throw new Error('email inválido');
        this.id = id;
        this.nome = nome,
        this.telefone = telefone,
        this.documento = documento,
        this.ativo = ativo,
        this.criadoem = criadoem ?? new Date().toISOString();
        this.atualizadoem = atualizadoem ?? null;
    }

    toRecord(){
        return {
            id: this.id,
            nome: this.nome,
            telefone: this.telefone,
            documento: this.documento,
            ativo : this.ativo,
            criadoem: this.criadoem,
            atualizadoem: this.atualizadoem
        };
    }
}