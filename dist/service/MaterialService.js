"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialService = void 0;
const MaterialEntity_1 = require("../model/entity/MaterialEntity");
const CursoEntity_1 = require("../model/entity/CursoEntity");
const MaterialRepository_1 = require("../repository/MaterialRepository");
const CursoRepository_1 = require("../repository/CursoRepository");
class MaterialService {
    constructor() {
        this.cursoRepository = CursoRepository_1.CursoRepository.getInstance();
        this.materialRepository = MaterialRepository_1.MaterialRepository.getInstance();
    }
    criarMaterial(materialData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nome, descricao, formato, link, idCurso } = materialData;
            const verificarMaterial = yield this.materialRepository.filterPorNameIdFormato(materialData);
            if (verificarMaterial) {
                throw new Error("Esse Material já está cadastrado");
            }
            const verificarCurso = yield this.cursoRepository.filterCursoByNameId(idCurso);
            if (!verificarCurso) {
                throw new Error("Não foi possivel cadastrar o professor, pois o curso não existe");
            }
            const novoMaterial = yield this.materialRepository.insertMaterial(new MaterialEntity_1.MaterialEntity(id, nome, descricao, formato, link, idCurso));
            yield this.atualizarCurso(materialData);
            console.log("Service - Insert");
            return novoMaterial;
        });
    }
    atualizarCurso(materialData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCurso, nome, id } = materialData;
            if (!idCurso || !nome || !id) {
                throw new Error("Parâmetros insuficientes fornecidos para atualizar o curso.");
            }
            try {
                const material = yield this.materialRepository.filterPorNameIdFormato(materialData);
                if (!material || material.length === 0) {
                    throw new Error("Nenhum material encontrado com o nome e ID especificados.");
                }
                const idMaterial = material[0].id;
                const cursoExistenteArray = yield this.cursoRepository.filterCursoByNameId(new CursoEntity_1.CursoEntity(idCurso));
                if (cursoExistenteArray.length === 0) {
                    throw new Error(`Curso com ID ${idCurso} não encontrado.`);
                }
                const cursoExistente = cursoExistenteArray[0];
                const novosIdMaterial = [...cursoExistente.idMaterial, idMaterial];
                const cursoData = new CursoEntity_1.CursoEntity(idCurso, cursoExistente.nome, cursoExistente.area, cursoExistente.descricao, cursoExistente.nivel, cursoExistente.duracao, cursoExistente.valor, cursoExistente.nomeProfessor, cursoExistente.idProfessor, novosIdMaterial);
                const cursoAtualizado = yield this.cursoRepository.updateCurso(cursoData);
                if (!cursoAtualizado) {
                    throw new Error(`Não foi possível atualizar o curso com ID ${idCurso}`);
                }
                console.log(`Curso com ID ${idCurso} atualizado com sucesso.`);
            }
            catch (err) {
                console.error(`Erro ao atualizar o curso com ID ${idCurso}: `, err);
                throw err;
            }
        });
    }
    atualizarMaterial(materialData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nome, descricao, formato, link, idCurso } = materialData;
            const material = new MaterialEntity_1.MaterialEntity(id, nome, descricao, formato, link, idCurso);
            const verificarMaterial = yield this.materialRepository.filterPorNameIdFormato(materialData);
            if (verificarMaterial.length === 0) {
                throw new Error("Não foi possivel atualizar, pois não foi encontrado nenhum material");
            }
            yield this.materialRepository.updateMaterial(materialData);
            console.log("Service - Update", material);
            console.log(`Sucesso ao atualizar dados do Professor ${nome}`);
            return material;
        });
    }
    listarMateriais() {
        return __awaiter(this, void 0, void 0, function* () {
            const materiais = yield this.materialRepository.getAll();
            if (!materiais) {
                throw new Error("Erro ao listar Materiais");
            }
            console.log("Service - Filtrar Todos", materiais);
            return materiais;
        });
    }
    localizarPorNomeIdformato(materialData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nome, formato, idCurso } = materialData;
            if (!id && !nome && !formato && !idCurso) {
                throw new Error("É necessário fornecer ao menos um parâmetro (id, nome, formato ou idCurso ).");
            }
            else {
                const material = yield this.materialRepository.filterPorNameIdFormato(materialData);
                console.log("Service - Filtrar", material);
                return material;
            }
        });
    }
    deletarMaterial(materialData) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = materialData;
            if (!id) {
                throw new Error("É necessário do id.");
            }
            const material = yield this.materialRepository.filterPorNameIdFormato(materialData);
            if (!material.length) {
                throw new Error("Material inexistente");
            }
            yield this.materialRepository.deleteMaterial(materialData);
            console.log("service - Delete");
        });
    }
}
exports.MaterialService = MaterialService;
