import { executarComandoSQL } from "../database/mysql";
import { Professor } from "../model/Professor";

export class ProfessorRepository {

    private static instance: ProfessorRepository;

    private constructor() {
        this.createTable();
    }

    public static getInstance(): ProfessorRepository {
        if (!this.instance) {
            this.instance = new ProfessorRepository();
        }
        return this.instance
    }

    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS StudyTech.Professor (
                        id INT NOT NULL AUTO_INCREMENT,
                        nome VARCHAR2() NOT NULL,
                        sobrenome VARCHAR2() NOT NULL,
                        dataNascimento DATE NOT NULL;
                        cpf INT() NOT NULL
                        email VARCHAR2() NOT NULL,
                        matricula VARCHAR2() NOT NULL,
                        senha VARCHAR2() NOT NULL,
                        idCurso INT() NOT NULL,
                        PRIMARY KEY (id),
                        FOREING KEY (idCurso) REFERENCES Curso(curso)
                        )`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log("Sucesso ao criar tabela Professor")
        }
        catch (err) {
            console.error('Error');
        }
    }

    async insertProfessor(professor: Professor): Promise<Professor> {
        try {
            const resultado = await executarComandoSQL("INSERT INTO StudyTech.Curso (id, nome, sobrenome, dataNascimento, cpf, email, matricula, senha, idCurso) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [professor.id, professor.nome, professor.sobrenome, professor.dataNascimento, professor.cpf, professor.email, professor.matricula, professor.senha, professor.idCurso]);
            professor.id = resultado.insertId;
            console.log("Professor cadastrado com sucesso: ", professor);
            return professor;
        } catch (err) {
            console.error("Erro ao cadastrar professor: ", err)
            throw err
        }
    }

    async getProfessorByNameId(nome?: string, id?: number): Promise<Professor[]> {
        let query = `SELECT * FROM StudyTech.Professor WHERE`;
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
            console.log("Sucesso ao localizar Professor: ", resultado);
            return resultado;
        } catch (err) {
            console.error("Não foi possivel localizar o professor, erro: ", err);
            throw err;
        }
    }

    async getAll(): Promise<Professor[]> {
        const query = "SELECT * FROM StudyTech.Professor";
        try {
            const resultado: Professor[] = await executarComandoSQL(query, [])
            console.log("Sucesso ao listar os professores: ",)
            return resultado;
        } catch (err) {
            console.error("Não foi possivel listar os professores: ", err);
            throw err;
        }
    }

    async updateCurso(professor: Professor): Promise<void> {
        const query = "UPDATE StudyTech.Professor SET email = ?, matricula = ? senha = ?, idCurso= ? WHERE id = ?";
        try {
            await executarComandoSQL(query, [professor.email, professor.matricula, professor.senha, professor.idCurso, professor.id]);
            console.log("Dados do professor atualizados com sucesso: ", professor.id);
        } catch (err) {
            console.error("Não foi possivel atualizar dados do professor (Id: " + professor.id + "): ", err);
            throw err;
        }
    }

    async deleteProfessor(id?: number): Promise<void> {
        try {
            const query = "DELETE FROM StudyTech.Professor WHERE id = ?";
            await executarComandoSQL(query, [id])
            console.log("Professor removido com sucesso: ", id);
        } catch (err) {
            console.error("Não foi possivel remover o professor: ", err);
            throw err;
        }
    }
}