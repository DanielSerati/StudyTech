"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoEntity = void 0;
class CursoEntity {
    constructor(id, nome, area, descricao, nivel, duracao, valor, nomeProfessor, idProfessor, idMaterial) {
        this.id = id || 0;
        this.nome = nome || '';
        this.area = area || '';
        this.descricao = descricao || '';
        this.nivel = nivel || '';
        this.duracao = duracao || '';
        this.valor = valor || 0;
        this.nomeProfessor = nomeProfessor || '';
        this.idProfessor = idProfessor || 0;
        this.idMaterial = idMaterial || [];
    }
}
exports.CursoEntity = CursoEntity;
