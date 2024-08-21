export class ProfessorDto {
    id: number;
    nome: string;
    sobrenome: string;
    dataNascimento: Date;
    cpf: string;
    email: string;
    matricula: string;
    senha: string;
    idCurso: number;

    constructor(id: number, nome: string, sobrenome: string, dataNascimento: Date, cpf: string, email: string, matricula: string, senha: string, idCurso: number) {
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.email = email;
        this.matricula = matricula;
        this.senha = senha;
        this.idCurso = idCurso;
    }
}
