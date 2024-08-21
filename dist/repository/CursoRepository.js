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
exports.CursoRepository = void 0;
const mysql_1 = require("../database/mysql");
class CursoRepository {
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CursoRepository();
        }
        return this.instance;
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `CREATE TABLE IF NOT EXISTS StudyTech.Curso (
                        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                        nome VARCHAR(255) NOT NULL,
                        area VARCHAR(255) NOT NULL,
                        descricao VARCHAR(255) NOT NULL,
                        nivel  VARCHAR(255) NOT NULL,
                        duracao VARCHAR(30) NOT NULL,
                        valor DECIMAL(10,2) NOT NULL,
                        nomeProfessor VARCHAR(255), 
                        idProfessor INT,
                        idMaterial INT
                        )`;
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log("Sucesso ao criar tabela Curso");
            }
            catch (err) {
                console.error('Error');
            }
        });
    }
    insertCurso(curso) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)("INSERT INTO StudyTech.Curso (id, nome, area, descricao, nivel, duracao, valor, nomeProfessor, idProfessor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [curso.id, curso.nome, curso.area, curso.descricao, curso.nivel, curso.duracao, curso.valor, curso.nomeProfessor, curso.idProfessor]);
                console.log("Curso criado com sucesso: ", resultado.insertId);
                curso.id = resultado.insertId;
                return new Promise((resolve) => {
                    resolve(curso);
                });
            }
            catch (err) {
                console.error("Erro ao criar um curso: ", err);
                throw err;
            }
        });
    }
    filterCursoByNameId(curso) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `SELECT * FROM StudyTech.Curso WHERE `;
            const params = [];
            if (curso.nome) {
                query += " ";
                params.push(curso.nome);
            }
            if (curso.id) {
                query += (params.length ? " AND" : "") + "id = ?";
                params.push(curso.id);
            }
            if (params.length === 0) {
                throw new Error("Insira no minimo um parametro(id, nome)");
            }
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, params);
                console.log("Sucesso ao localizar Curso: ", resultado);
                return resultado;
            }
            catch (err) {
                console.error("Não foi possivel buscar curso, erro: ", err);
                throw err;
            }
        });
    }
    filterCursoById(curso) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM StudyTech.Curso WHERE id = ? `;
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [curso.id]);
                console.log("Sucesso ao localizar Curso: ", resultado);
                return resultado;
            }
            catch (err) {
                console.error("Não foi possivel buscar curso, erro: ", err);
                throw err;
            }
        });
    }
    filterCursoByNome(curso) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM StudyTech.Curso WHERE nome = ? `;
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [curso.nome]);
                console.log("Sucesso ao localizar Curso: ", resultado);
                return resultado;
            }
            catch (err) {
                console.error("Não foi possivel buscar curso, erro: ", err);
                throw err;
            }
        });
    }
    filterProf(curso) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM StudyTech.Curso WHERE = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [curso.nomeProfessor]);
                console.log("Sucesso ao listar os cursos administrados pelo professor: ", resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error("Não foi possivel listar os cursos: ", err);
                throw err;
            }
        });
    }
    filterCursosByArea(curso) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT * FROM StudyTech.Curso WHERE area = ? ";
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [curso.area]);
                console.log("Cursos localizados com sucesso: ", resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi listar os cursos da area: ${curso.area}`, err);
                throw err;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM StudyTech.Curso";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel listar os cursos:  ${err}`);
                throw err;
            }
        });
    }
    updateCurso(curso) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = "UPDATE StudyTech.Curso SET";
            const params = [];
            if (curso.nome !== undefined) {
                query += " nome = ?";
                params.push(curso.nome);
            }
            if (curso.descricao !== undefined) {
                query += (params.length ? ", " : "") + "descricao = ?";
                params.push(curso.descricao);
            }
            if (curso.valor !== undefined) {
                query += (params.length ? ", " : "") + "valor = ?";
                params.push(curso.valor);
            }
            if (curso.duracao !== undefined) {
                query += (params.length ? ", " : "") + "duracao = ?";
                params.push(curso.duracao);
            }
            if (curso.nomeProfessor !== undefined) {
                query += (params.length ? ", " : "") + "nomeProfessor = ?";
                params.push(curso.nomeProfessor);
            }
            if (curso.idProfessor !== undefined) {
                query += (params.length ? ", " : "") + "idProfessor = ?";
                params.push(curso.idProfessor);
            }
            if (params.length === 0) {
                throw new Error("Nenhum campo para atualizar.");
            }
            query += " WHERE id = ?";
            params.push(curso.id);
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, params);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error("Não foi possível atualizar o curso (Id: " + curso.id + "): ", err);
                throw err;
            }
        });
    }
    deleteCurso(curso) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "DELETE FROM StudyTech.Curso WHERE id = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [curso.id]);
                console.log("Curso deletado com sucesso: ", curso);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel deletar o curso de id: ${curso.id}`, err);
                throw err;
            }
        });
    }
}
exports.CursoRepository = CursoRepository;
