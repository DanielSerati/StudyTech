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
exports.ProfessorRepository = void 0;
const mysql_1 = require("../database/mysql");
class ProfessorRepository {
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProfessorRepository();
        }
        return this.instance;
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `CREATE TABLE IF NOT EXISTS StudyTech.Professor (
                        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                        nome VARCHAR2(255) NOT NULL,
                        sobrenome VARCHAR2(255) NOT NULL,
                        dataNascimento DATE NOT NULL,
                        cpf VARCHAR2(11) NOT NULL,
                        email VARCHAR2(255) NOT NULL,
                        matricula VARCHAR2(12) NOT NULL,
                        senha VARCHAR2(255) NOT NULL,
                        idCurso INT NOT NULL,
                        FOREIGN KEY (idCurso) REFERENCES studyTech.Curso(id)
                        )`;
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log("Sucesso ao criar tabela Professor");
            }
            catch (err) {
                console.error('Error');
            }
        });
    }
    insertProfessor(professor) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)("INSERT INTO StudyTech.Curso (nome, sobrenome, dataNascimento, cpf, email, matricula, senha, idCurso) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [professor.id, professor.nome, professor.sobrenome, professor.dataNascimento, professor.cpf, professor.email, professor.matricula, professor.senha, professor.idCurso]);
                professor.id = resultado.insertId;
                console.log("Professor cadastrado com sucesso: ", professor);
                return new Promise((resolve) => {
                    resolve(professor);
                });
            }
            catch (err) {
                console.error(`Erro ao cadastrar professor: ${professor.nome}  ${professor.sobrenome}`, err);
                throw err;
            }
        });
    }
    filterProfessorByNameIdCPF(professor) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `SELECT * FROM StudyTech.Professor WHERE`;
            const params = [];
            if (professor.nome) {
                query += " name = ?";
                params.push(professor.nome);
            }
            if (professor.cpf) {
                query += (params.length ? " AND" : "") + " cpf = ?";
                params.push(professor.cpf);
            }
            if (professor.id) {
                query += (params.length ? " AND" : "") + " id = ?";
                params.push(professor.id);
            }
            if (params.length === 0) {
                throw new Error("Insira no minimo um parametro(id ou nome ou cpf)");
            }
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, params);
                console.log("Sucesso ao localizar Professor: ", resultado);
                return resultado;
            }
            catch (err) {
                console.error("Não foi possivel localizar o professor, erro: ", err);
                throw err;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM StudyTech.Professor";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error("Não foi possivel listar os professores: ", err);
                throw err;
            }
        });
    }
    updateProfessor(professor) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = "UPDATE StudyTech.Professor SET";
            const params = [];
            if (professor.nome !== undefined) {
                query += " nome = ?";
                params.push(professor.nome);
            }
            if (professor.sobrenome !== undefined) {
                query += (params.length ? ", " : "") + " sobrenome = ?";
                params.push(professor.sobrenome);
            }
            if (professor.email !== undefined) {
                query += (params.length ? ", " : "") + " email = ?";
                params.push(professor.email);
            }
            if (professor.senha !== undefined) {
                query += (params.length ? ", " : "") + " senha = ?";
                params.push(professor.senha);
            }
            if (professor.idCurso !== undefined) {
                query += (params.length ? ", " : "") + " idCurso = ?";
                params.push(professor.idCurso);
            }
            if (params.length === 0) {
                throw new Error("Nenhum campo para atualizar.");
            }
            query += " WHERE = ?";
            params.push(professor.id);
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, params);
                console.log("Dados do professor atualizados com sucesso: ", professor.id);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error("Não foi possivel atualizar dados do professor (Id: " + professor.id + "): ", err);
                throw err;
            }
        });
    }
    deleteProfessor(professor) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "DELETE FROM StudyTech.Professor WHERE id = ? AND nome = ? AND cpf = ? ";
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [professor.id, professor.nome, professor.cpf]);
                console.log("Professor removido com sucesso: ", professor.nome);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error("Não foi possivel remover o professor: ", err);
                throw err;
            }
        });
    }
}
exports.ProfessorRepository = ProfessorRepository;
