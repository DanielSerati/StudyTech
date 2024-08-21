import { stringParaData, verificaFormatoData } from "../../util/DataUtil";

export class ProfessorEntity {
    id: number;
    nome: string;
    sobrenome: string;
    dataNascimento: Date;
    cpf: string;
    email: string;
    matricula: string;
    senha: string;
    idCurso: number;

    constructor(id?: number, nome?: string, sobrenome?: string, dataNascimento?: string, cpf?: string, email?: string, matricula?: string, senha?: string, idCurso?: number) {
        this.ValidInfo(nome, sobrenome, dataNascimento, cpf, email, matricula, senha, idCurso)
        this.id = id || 0;
        this.nome = nome || '';
        this.sobrenome = sobrenome || '';
        this.dataNascimento = stringParaData(dataNascimento || '');
        this.cpf = cpf || '';
        this.email = email || '';
        this.matricula = matricula || '';
        this.senha = senha || '';
        this.idCurso = idCurso || 0;
    }

    private ValidInfo(nome: any, sobrenome: any, dataNascimento: any, cpf: any, email: any, matricula: any, senha: any, idCurso: any) {
        let error = '';
        if (typeof nome !== "string" || typeof sobrenome !== "string" || typeof dataNascimento !== "string" || typeof cpf !== "string" || typeof email !== "string" || typeof matricula !== "string" || typeof senha !== "string" || typeof idCurso !== "number") {
            error += ("Informações incorretas. ");
        };
        if (!nome || !sobrenome || !dataNascimento || !cpf || !email || !matricula || !senha || !idCurso) {
            error += ("Informações incompletas. ");
        }
        if (!verificaFormatoData(dataNascimento)) {
            error += ("Formato invalido, inserir da seguinte forma dd/mm/aaaa");
        }
        if (error != '') {
            throw new Error(error);
        }

    }
} 0