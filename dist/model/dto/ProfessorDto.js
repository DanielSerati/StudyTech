"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessorDto = void 0;
class ProfessorDto {
    constructor(id, nome, sobrenome, dataNascimento, cpf, email, matricula, senha, idCurso) {
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
exports.ProfessorDto = ProfessorDto;
