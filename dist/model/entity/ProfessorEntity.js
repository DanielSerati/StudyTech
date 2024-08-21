"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessorEntity = void 0;
const DataUtil_1 = require("../../util/DataUtil");
class ProfessorEntity {
    constructor(id, nome, sobrenome, dataNascimento, cpf, email, matricula, senha, idCurso) {
        this.ValidInfo(nome, sobrenome, dataNascimento, cpf, email, matricula, senha, idCurso);
        this.id = id || 0;
        this.nome = nome || '';
        this.sobrenome = sobrenome || '';
        this.dataNascimento = (0, DataUtil_1.stringParaData)(dataNascimento || '');
        this.cpf = cpf || '';
        this.email = email || '';
        this.matricula = matricula || '';
        this.senha = senha || '';
        this.idCurso = idCurso || 0;
    }
    ValidInfo(nome, sobrenome, dataNascimento, cpf, email, matricula, senha, idCurso) {
        let error = '';
        if (typeof nome !== "string" || typeof sobrenome !== "string" || typeof dataNascimento !== "string" || typeof cpf !== "string" || typeof email !== "string" || typeof matricula !== "string" || typeof senha !== "string" || typeof idCurso !== "number") {
            error += ("Informações incorretas. ");
        }
        ;
        if (!nome || !sobrenome || !dataNascimento || !cpf || !email || !matricula || !senha || !idCurso) {
            error += ("Informações incompletas. ");
        }
        if (!(0, DataUtil_1.verificaFormatoData)(dataNascimento)) {
            error += ("Formato invalido, inserir da seguinte forma dd/mm/aaaa");
        }
        if (error != '') {
            throw new Error(error);
        }
    }
}
exports.ProfessorEntity = ProfessorEntity;
0;
