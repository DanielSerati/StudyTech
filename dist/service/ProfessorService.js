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
exports.ProfessorService = void 0;
const ProfessorEntity_1 = require("../model/entity/ProfessorEntity");
const ProfessorRepository_1 = require("../repository/ProfessorRepository");
const CursoRepository_1 = require("../repository/CursoRepository");
const CursoEntity_1 = require("../model/entity/CursoEntity");
class ProfessorService {
    constructor() {
        this.professorRepository = ProfessorRepository_1.ProfessorRepository.getInstance();
        this.cursoRepository = CursoRepository_1.CursoRepository.getInstance();
    }
    criarProfessor(professorData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, sobrenome, dataNascimento, cpf, email, matricula, senha, idCurso } = professorData;
            const verificarProf = yield this.professorRepository.filterProfessorByNameIdCPF(professorData);
            if (verificarProf) {
                throw new Error("Esse Professor já está cadastrado");
            }
            const verificarCurso = yield this.cursoRepository.filterCursoByNameId(idCurso);
            if (!verificarCurso) {
                throw new Error("Não foi possivel cadastrar o professor, pois o curso não existe");
            }
            const novoProfessor = yield this.professorRepository.insertProfessor(new ProfessorEntity_1.ProfessorEntity(undefined, nome, sobrenome, dataNascimento, cpf, email, matricula, senha, idCurso));
            yield this.atualizarCurso(professorData);
            console.log("Service - Insert");
            return novoProfessor;
        });
    }
    atualizarCurso(professorData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCurso, nome, cpf } = professorData;
            if (!idCurso || !nome || !cpf) {
                throw new Error("Parâmetros insuficientes fornecidos para atualizar o curso.");
            }
            try {
                const professor = yield this.professorRepository.filterProfessorByNameIdCPF(professorData);
                if (!professor || professor.length === 0) {
                    throw new Error("Nenhum professor encontrado com o nome e id especificados.");
                }
                const idProfessor = professor[0].id;
                const cursoData = new CursoEntity_1.CursoEntity(idCurso, undefined, undefined, undefined, undefined, undefined, undefined, nome, idProfessor, []);
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
    atualizarProfessor(professorData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nome, sobrenome, email, senha, idCurso } = professorData;
            const professor = new ProfessorEntity_1.ProfessorEntity(id, nome, sobrenome, email, senha, idCurso);
            const verificarProf = yield this.professorRepository.filterProfessorByNameIdCPF(professorData);
            if (verificarProf.length === 0) {
                throw new Error("Não foi possivel atualizar, pois não foi encontrado nenhum professor");
            }
            yield this.professorRepository.updateProfessor(professorData);
            console.log("Service - Update", professor);
            console.log(`Sucesso ao atualizar dados do Professor ${nome}`);
            return professor;
        });
    }
    listarProfessores() {
        return __awaiter(this, void 0, void 0, function* () {
            const professores = yield this.professorRepository.getAll();
            if (!professores) {
                throw new Error("Erro ao listar Professores");
            }
            console.log("Service - Filtrar Todos", professores);
            return professores;
        });
    }
    localizarPorNomeIdCPF(professorData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nome, cpf } = professorData;
            if (!id && !nome && !cpf) {
                throw new Error("É necessário fornecer ao menos um parâmetro (id, nome ou cpf).");
            }
            else {
                const professor = yield this.professorRepository.filterProfessorByNameIdCPF(professorData);
                console.log("Service - Filtrar", professor);
                return professor;
            }
        });
    }
    deletarProfessor(professorData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, id, cpf } = professorData;
            if (!nome || !id || !cpf) {
                throw new Error("É necessário preenceher todos os campos (nome, id e cpf).");
            }
            const encontrarProfessor = yield this.localizarPorNomeIdCPF(professorData);
            if (encontrarProfessor.length === 0) {
                throw new Error("O Professor não foi localizado");
            }
            yield this.professorRepository.deleteProfessor(professorData);
            console.log("service - Delete");
        });
    }
}
exports.ProfessorService = ProfessorService;
