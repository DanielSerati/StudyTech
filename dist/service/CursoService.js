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
exports.CursoService = void 0;
const CursoEntity_1 = require("../model/entity/CursoEntity");
const CursoRepository_1 = require("../repository/CursoRepository");
class CursoService {
    constructor() {
        this.cursoRepository = CursoRepository_1.CursoRepository.getInstance();
    }
    criarCurso(cursoData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, area, descricao, nivel, duracao, valor } = cursoData;
            if (typeof nome !== 'string' || typeof area !== 'string' || typeof descricao !== 'string' || typeof nivel !== 'string' || typeof duracao !== 'string' || typeof valor !== 'number') {
                throw new Error("Dados incorretos, verificar se é 'number' ou 'string'");
            }
            if (!nome || !area || !descricao || !nivel || !duracao || !valor) {
                throw new Error("Dados incompletos, verificar se foi inseridos todos os dados obrigatórios(nome, area, descricao, nivel, duracao, valor)");
            }
            const verificarCurso = yield this.localizarPorNome({ nome });
            if (verificarCurso.length > 0) {
                throw new Error("Não foi possivel criar o curso, pois ele já existe.");
            }
            const novoCurso = this.cursoRepository.insertCurso(new CursoEntity_1.CursoEntity(undefined, nome, area, descricao, nivel, duracao, valor, undefined, undefined, undefined));
            console.log("Service - Insert ", novoCurso);
            return novoCurso;
        });
    }
    localizarPorNome(cursoData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome } = cursoData;
            if (!nome) {
                throw new Error("É necessário fornecer o nome.");
            }
            else {
                const curso = yield this.cursoRepository.filterCursoByNome(cursoData);
                console.log("Service - Filtrar por nome", curso);
                return curso;
            }
        });
    }
    localizarPorId(cursoData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = cursoData;
            if (!id) {
                throw new Error("É necessário fornecer o id.");
            }
            else {
                const curso = yield this.cursoRepository.filterCursoByNome(cursoData);
                console.log("Service - Filtrar por id", curso);
                return curso;
            }
        });
    }
    localizarPorProfessor(cursoData) {
        return __awaiter(this, void 0, void 0, function* () {
            const nomeProf = cursoData;
            if (!nomeProf) {
                throw new Error("É necessário fornecer o nome do professor para realizar a consulta");
            }
            console.log("Service - Filtrar por professor");
            return yield this.cursoRepository.filterProf(cursoData);
        });
    }
    listarCursos() {
        return __awaiter(this, void 0, void 0, function* () {
            const cursos = yield this.cursoRepository.getAll();
            console.log("Service - Listar Tudo", cursos);
            return cursos;
        });
    }
    listarCursosArea(cursoData) {
        return __awaiter(this, void 0, void 0, function* () {
            const area = cursoData;
            if (!area) {
                throw new Error("É necessário fornecer o nome da area para realizar a consulta");
            }
            const cursos = yield this.cursoRepository.filterCursosByArea(cursoData);
            console.log("Service - Listar Por Area", cursos);
            return cursos;
        });
    }
    atualizarCurso(cursoData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nome, descricao, duracao, valor, nomeProfessor, idProfessor } = cursoData;
            if (typeof id !== 'number' || typeof nome !== 'string' || typeof descricao !== 'string' || typeof duracao !== 'string' || typeof valor !== 'string' || typeof nomeProfessor !== 'string' || typeof idProfessor !== 'number') {
                throw new Error("Dados incorretos, verifique se os dados informados são dos tipos: 'number' ou 'string'");
            }
            const curso = new CursoEntity_1.CursoEntity(id, nome, descricao, duracao, valor, nomeProfessor, idProfessor);
            const verificarCurso = yield this.cursoRepository.filterCursoById(cursoData);
            if (verificarCurso.length === 0) {
                throw new Error("Não foi possível atualizar o curso, pois ele não existe.");
            }
            yield this.cursoRepository.updateCurso(curso);
            console.log("Service - Update", curso);
            return curso;
        });
    }
    deletarCurso(cursoData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = cursoData;
            if (!id) {
                throw new Error("É necessário fornecer um id.");
            }
            const curso = yield this.cursoRepository.filterCursoById(cursoData);
            if (curso.length === 0) {
                throw new Error("O curso não existe prara ser deletado");
            }
            yield this.cursoRepository.deleteCurso(cursoData);
            console.log("Service - Delete");
        });
    }
}
exports.CursoService = CursoService;
