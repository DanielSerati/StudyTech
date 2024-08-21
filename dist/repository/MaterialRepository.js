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
exports.MaterialRepository = void 0;
const mysql_1 = require("../database/mysql");
class MaterialRepository {
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new MaterialRepository();
        }
        return this.instance;
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `CREATE TABLE IF NOT EXISTS StudyTech.Material (
                        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                        nome VARCHAR2(255) NOT NULL,
                        descricao VARCHAR2(255) NOT NULL,
                        formato VARCHAR2(255) NOT NULL,
                        link VARCHAR2(255) NOT NULL,
                        idCurso INT NOT NULL,
                        FOREIGN KEY (idCurso) REFERENCES studyTech.Curso(id)
                        )`;
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log("Sucesso ao criar tabela Material");
            }
            catch (err) {
                console.error('Error');
            }
        });
    }
    insertMaterial(material) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)("INSERT INTO StudyTech.Material (id, nome, descricao, formato, link, idCurso) VALUES (?, ?, ?, ?, ?, ?)", [material.id, material.nome, material.descricao, material.formato, material.link, material.idCurso]);
                material.id = resultado.insertId;
                console.log("Material Inserido com sucesso: ", material);
                return material;
            }
            catch (err) {
                console.error("Erro ao inserir Material: ", err);
                throw err;
            }
        });
    }
    filterPorNameIdFormato(material) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `SELECT * FROM StudyTech.Material WHERE`;
            const params = [];
            if (material.nome) {
                query += " name = ?";
                params.push(material.nome);
            }
            if (material.id) {
                query += (params.length ? " AND" : "") + " id = ?";
                params.push(material.id);
            }
            if (material.formato) {
                query += (params.length ? " AND" : "") + " formato = ?";
                params.push(material.formato);
            }
            if (material.idCurso) {
                query += (params.length ? " AND" : "") + " idCurso = ?";
                params.push(material.idCurso);
            }
            if (params.length === 0) {
                throw new Error("Insira no minimo um parametro(id, nome ou formato)");
            }
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, params);
                console.log("Sucesso ao localizar Material: ", resultado);
                return resultado;
            }
            catch (err) {
                console.error("Não foi possivel localizar o Material, erro: ", err);
                throw err;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM StudyTech.Material";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error("Não foi possivel listar os Materiais: ", err);
                throw err;
            }
        });
    }
    updateMaterial(material) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "UPDATE StudyTech.Material SET nome = ?, link = ? WHERE id = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [material.nome, material.link, material.id]);
                console.log("Material alterado com sucesso: ", material.id);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error("Não foi possivel alterar dados do Material (Id: " + material.id + "): ", err);
                throw err;
            }
        });
    }
    deleteMaterial(material) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "DELETE FROM StudyTech.Material WHERE id = ?";
            try {
                yield (0, mysql_1.executarComandoSQL)(query, [material.id]);
                console.log("Material removido com sucesso: ", material);
                return material;
            }
            catch (err) {
                console.error(`Não foi possivel remover o Material: ${material.id}`, err);
                throw err;
            }
        });
    }
}
exports.MaterialRepository = MaterialRepository;
