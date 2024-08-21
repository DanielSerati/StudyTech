"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoRequestDto = void 0;
class CursoRequestDto {
    constructor(nome, area, descricao, nivel, duracao, valor, nomeProfessor, idProfessor, idMaterial) {
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
exports.CursoRequestDto = CursoRequestDto;
