"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialRequestDto = void 0;
class MaterialRequestDto {
    constructor(nome, descricao, formato, link, idCurso) {
        this.nome = nome || '';
        this.descricao = descricao || '';
        this.formato = formato || '';
        this.link = link || '';
        this.idCurso = idCurso || 0;
    }
}
exports.MaterialRequestDto = MaterialRequestDto;
