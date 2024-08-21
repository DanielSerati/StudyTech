"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialEntity = void 0;
class MaterialEntity {
    constructor(id, nome, descricao, formato, link, idCurso) {
        this.id = id || 0;
        this.nome = nome || '';
        this.descricao = descricao || '';
        this.formato = formato || '';
        this.link = link || '';
        this.idCurso = idCurso || 0;
    }
}
exports.MaterialEntity = MaterialEntity;
