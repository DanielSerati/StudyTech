export class ProfessorRequestDto {
    nome: string;
    sobrenome: string;
    dataNascimento: string;
    cpf: string;
    email: string;
    matricula: string;
    senha: string;
    idCurso: number;

    constructor(nome?: string, sobrenome?: string, dataNascimento?: string, cpf?: string, email?: string, matricula?: string, senha?: string, idCurso?: number) {
        this.nome = nome || '';
        this.sobrenome = sobrenome || '';
        this.dataNascimento = dataNascimento || '';
        this.cpf = cpf || '';
        this.email = email || '';
        this.matricula = matricula || '';
        this.senha = senha || '';
        this.idCurso = idCurso || 0;
    }
}
