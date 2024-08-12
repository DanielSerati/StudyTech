import { executarComandoSQL } from "../database/mysql";
import { Curso } from "../model/Curso";

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
                        id INT NOT NULL AUTO_INCREMENT,
                        nome VARCHAR2() NOT NULL,
                        area VARCHAR2() NOT NULL,
                        descricao VARCHAR2() NOT NULL,
                        nivel  VARCHAR2() NOT NULL,
                        duracao VARCHAR2() NOT NULL,
                        valor DECIMAL() NOT NULL,
                        nomeProfessor VARCHAR2() NOT NULL, 
                        idProfessor INT(3),
                        PRIMARY KEY (id),
                        FOREING KEY (idProfessor) REFERENCES Professor(idProfessor) 
                        )`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log("Sucesso ao criar tabela Curso")
        }
        catch (err) {
            console.error('Error');
        }
    }

    async insertCurso(curso: Curso): Promise<Curso> {
        try {
            const resultado = await executarComandoSQL("INSERT INTO StudyTech.Curso (id, nome, area, descricao, nivel, duracao, valor, nomeProfessor, idProfessor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [curso.id, curso.nome, curso.area, curso.descricao, curso.nivel, curso.duracao, curso.valor, curso.nomeProfessor, curso.idProfessor]);
            curso.id = resultado.insertId;
            console.log("Curso criado com sucesso: ", curso);
            return curso;
        } catch (err) {
            console.error("Erro ao criar um curso: ", err)
            throw err
        }
    }

    async filterCursoByNameId(nome?: string, id?: number): Promise<Curso[]> {
        let query = `SELECT * FROM StudyTech.Curso WHERE`;
        const params: any[] = [];

        if (nome) {
            query += "name = ?"
            params.push(nome);
        }
        if (id) {
            query += (params.length ? " AND" : "") + " id = ?";
            params.push(id);
        }
        if (params.length === 0) {
            throw new Error("Insira no minimo um parametro(id ou nome)");
        }

        try {
            const resultado = await executarComandoSQL(query, params);
            console.log("Sucesso ao localizar Curso: ", resultado);
            return resultado;
        } catch (err) {
            console.error("Não foi possivel buscar curso, erro: ", err);
            throw err;
        }
    }

    async getAll(): Promise<Curso[]> {
        const query = "SELECT * FROM StudyTech.Curso";
        try {
            const resultado: Curso[] = await executarComandoSQL(query, [])
            console.log("Sucesso ao listar os cursos: ",)
            return resultado;
        } catch (err) {
            console.error("Não foi possivel listar os cursos: ", err);
            throw err;
        }
    }

    async updateCurso(curso: Curso): Promise<void> {
        const query = "UPDATE StudyTech.Curso SET descricao = ?, valor = ?, duracao = ?, nomeProfessor = ?, idProfessor = ?  WHERE id = ?";
        try {
            await executarComandoSQL(query, [curso.descricao, curso.valor, curso.duracao, curso.nomeProfessor, curso.idProfessor, curso.id]);
            console.log("Curso atualizado com sucesso: ", curso.id);
        } catch (err) {
            console.error("Não foi possivel atualizar o curso(Id: " + curso.id + "): ", err);
            throw err;
        }
    }

    async deleteCurso(id?: number): Promise<void> {
        try {
            const query = "DELETE FROM StudyTech.Curso WHERE id = ?";
            await executarComandoSQL(query, [id])
            console.log("Curso deletado com sucesso: ", id);
        } catch (err) {
            console.error("Não foi possivel deletar o curso: ", err);
            throw err;
        }
    }
    async getCursoByArea(area?: string): Promise<Curso[]> {
        try {
            const query = "SELECT * FROM StudyTech.Curso WHERE area = ? ";
            const resultado: Curso[] = await executarComandoSQL(query, [area]);
            console.log("Cursos localizados com sucesso: ");
            return resultado;
        } catch (err) {
            console.error("Não foi listar os cursos ", err);
            throw err;
        }
    }
}