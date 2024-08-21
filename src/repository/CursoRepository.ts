import { executarComandoSQL } from "../database/mysql";
import { CursoEntity } from "../model/entity/CursoEntity";

export class CursoRepository {

    private static instance: CursoRepository;

    private constructor() {
        this.createTable();
    }

    public static getInstance(): CursoRepository {
        if (!this.instance) {
            this.instance = new CursoRepository();
        }
        return this.instance
    }

    private async createTable() {
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
            const resultado = await executarComandoSQL(query, []);
            console.log("Sucesso ao criar tabela Curso")
        }
        catch (err) {
            console.error('Error');
        }
    }

    async insertCurso(curso: CursoEntity): Promise<CursoEntity> {
        try {
            const resultado = await executarComandoSQL("INSERT INTO StudyTech.Curso (id, nome, area, descricao, nivel, duracao, valor, nomeProfessor, idProfessor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [curso.id, curso.nome, curso.area, curso.descricao, curso.nivel, curso.duracao, curso.valor, curso.nomeProfessor, curso.idProfessor]);
            console.log("Curso criado com sucesso: ", resultado.insertId);
            curso.id = resultado.insertId;
            return new Promise<CursoEntity>((resolve) => {
                resolve(curso);
            });
        } catch (err) {
            console.error("Erro ao criar um curso: ", err);
            throw err
        }
    }

    async filterCursoByNameId(curso: CursoEntity): Promise<CursoEntity[]> {
        let query = `SELECT * FROM StudyTech.Curso WHERE `;
        const params: any[] = [];

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
            const resultado = await executarComandoSQL(query, params);
            console.log("Sucesso ao localizar Curso: ", resultado);
            return resultado;
        } catch (err: any) {
            console.error("Não foi possivel buscar curso, erro: ", err);
            throw err;
        }
    }

    async filterCursoById(curso: CursoEntity): Promise<CursoEntity[]> {
        const query = `SELECT * FROM StudyTech.Curso WHERE id = ? `;
        try {
            const resultado = await executarComandoSQL(query, [curso.id]);
            console.log("Sucesso ao localizar Curso: ", resultado);
            return resultado;
        } catch (err: any) {
            console.error("Não foi possivel buscar curso, erro: ", err);
            throw err;
        }
    }

    async filterCursoByNome(curso: CursoEntity): Promise<CursoEntity[]> {
        const query = `SELECT * FROM StudyTech.Curso WHERE nome = ? `;
        try {
            const resultado = await executarComandoSQL(query, [curso.nome]);
            console.log("Sucesso ao localizar Curso: ", resultado);
            return resultado;
        } catch (err: any) {
            console.error("Não foi possivel buscar curso, erro: ", err);
            throw err;
        }
    }

    async filterProf(curso: CursoEntity): Promise<CursoEntity> {
        const query = "SELECT * FROM StudyTech.Curso WHERE = ?";
        try {
            const resultado = await executarComandoSQL(query, [curso.nomeProfessor]);
            console.log("Sucesso ao listar os cursos administrados pelo professor: ", resultado);
            return new Promise<CursoEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error("Não foi possivel listar os cursos: ", err);
            throw err;
        }
    }

    async filterCursosByArea(curso: CursoEntity): Promise<CursoEntity> {
        try {
            const query = "SELECT * FROM StudyTech.Curso WHERE area = ? ";
            const resultado = await executarComandoSQL(query, [curso.area]);
            console.log("Cursos localizados com sucesso: ", resultado);
            return new Promise<CursoEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi listar os cursos da area: ${curso.area}`, err);
            throw err;
        }
    }

    async getAll(): Promise<CursoEntity[]> {
        const query = "SELECT * FROM StudyTech.Curso";
        try {
            const resultado: CursoEntity[] = await executarComandoSQL(query, []);
            return new Promise<CursoEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Não foi possivel listar os cursos:  ${err}`);
            throw err;
        }
    }

    async updateCurso(curso: CursoEntity): Promise<CursoEntity> {
        let query = "UPDATE StudyTech.Curso SET";
        const params: any[] = [];

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
            const resultado = await executarComandoSQL(query, params);
            return new Promise<CursoEntity>((resolve) => {
                resolve(resultado);
            })
        } catch (err) {
            console.error("Não foi possível atualizar o curso (Id: " + curso.id + "): ", err);
            throw err;
        }
    }

    async deleteCurso(curso: CursoEntity): Promise<CursoEntity> {
        const query = "DELETE FROM StudyTech.Curso WHERE id = ?";
        try {
            const resultado = await executarComandoSQL(query, [curso.id])
            console.log("Curso deletado com sucesso: ", curso);
            return new Promise<CursoEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Não foi possivel deletar o curso de id: ${curso.id}`, err);
            throw err;
        }
    }


}