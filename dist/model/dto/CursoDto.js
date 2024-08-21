"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoDto = void 0;
class CursoDto {
    constructor(id, nome, area, descricao, nivel, duracao, valor, nomeProfessor, idProfessor, idMaterial) {
        this.id = id;
        this.nome = nome;
        this.area = area;
        this.descricao = descricao;
        this.nivel = nivel;
        this.duracao = duracao;
        this.valor = valor;
        this.nomeProfessor = nomeProfessor;
        this.idProfessor = idProfessor;
        this.idMaterial = idMaterial;
    }
}
exports.CursoDto = CursoDto;
