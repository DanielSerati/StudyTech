import { executarComandoSQL } from "../database/mysql";
import { CursoEntity } from "../model/entity/CursoEntity";
import { ProfessorEntity } from "../model/entity/ProfessorEntity";

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
            const resultado = await executarComandoSQL(query, []);
            console.log("Sucesso ao criar tabela Professor")
        }
        catch (err) {
            console.error('Error');
        }
    }

    async insertProfessor(professor: ProfessorEntity): Promise<ProfessorEntity> {
        try {
            const resultado = await executarComandoSQL("INSERT INTO StudyTech.Curso (nome, sobrenome, dataNascimento, cpf, email, matricula, senha, idCurso) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [professor.id, professor.nome, professor.sobrenome, professor.dataNascimento, professor.cpf, professor.email, professor.matricula, professor.senha, professor.idCurso]);
            professor.id = resultado.insertId;
            console.log("Professor cadastrado com sucesso: ", professor);
            return new Promise<ProfessorEntity>((resolve) => {
                resolve(professor);
            })
        } catch (err: any) {
            console.error(`Erro ao cadastrar professor: ${professor.nome}  ${professor.sobrenome}`, err)
            throw err;
        }
    }

    async filterProfessorByNameIdCPF(professor: ProfessorEntity): Promise<ProfessorEntity[]> {
        let query = `SELECT * FROM StudyTech.Professor WHERE`;
        const params: any[] = [];

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
            const resultado = await executarComandoSQL(query, params);
            console.log("Sucesso ao localizar Professor: ", resultado);
            return resultado;
        } catch (err) {
            console.error("Não foi possivel localizar o professor, erro: ", err);
            throw err;
        }
    }

    async getAll(): Promise<ProfessorEntity[]> {
        const query = "SELECT * FROM StudyTech.Professor";
        try {
            const resultado = await executarComandoSQL(query, [])
            return new Promise<ProfessorEntity[]>((resolve) => {
                resolve(resultado);
            })

        } catch (err: any) {
            console.error("Não foi possivel listar os professores: ", err);
            throw err;
        }
    }

    async updateProfessor(professor: ProfessorEntity): Promise<ProfessorEntity> {
        let query = "UPDATE StudyTech.Professor SET";
        const params: any[] = [];

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
        query += " WHERE = ?"
        params.push(professor.id);

        try {
            const resultado = await executarComandoSQL(query, params);
            console.log("Dados do professor atualizados com sucesso: ", professor.id);
            return new Promise<ProfessorEntity>((resolve) => {
                resolve(resultado);
            })
        } catch (err) {
            console.error("Não foi possivel atualizar dados do professor (Id: " + professor.id + "): ", err);
            throw err;
        }
    }

    async deleteProfessor(professor: ProfessorEntity): Promise<ProfessorEntity> {
        try {
            const query = "DELETE FROM StudyTech.Professor WHERE id = ? AND nome = ? AND cpf = ? ";
            const resultado = await executarComandoSQL(query, [professor.id, professor.nome, professor.cpf]);
            console.log("Professor removido com sucesso: ", professor.nome);
            return new Promise<ProfessorEntity>((resolve) => {
                resolve(resultado);
            });

        } catch (err: any) {
            console.error("Não foi possivel remover o professor: ", err);
            throw err;
        }
    }
}