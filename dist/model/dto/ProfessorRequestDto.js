"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessorRequestDto = void 0;
class ProfessorRequestDto {
    constructor(nome, sobrenome, dataNascimento, cpf, email, matricula, senha, idCurso) {
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
exports.ProfessorRequestDto = ProfessorRequestDto;
