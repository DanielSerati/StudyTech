import { executarComandoSQL } from "../database/mysql";
import { Material } from "../model/Material";

export class MaterialRepository {

    private static instance: MaterialRepository;

    private constructor() {
        this.createTable();
    }

    public static getInstance(): MaterialRepository {
        if (!this.instance) {
            this.instance = new MaterialRepository();
        }
        return this.instance
    }

    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS StudyTech.Material (
                        id INT NOT NULL AUTO_INCREMENT,
                        nome VARCHAR2() NOT NULL,
                        descricao VARCHAR2() NOT NULL
                        formato VARCHAR2() NOT NULL
                        link VARCHAR2() NOT NULL,
                        idCurso INT() NOT NULL,
                        PRIMARY KEY (id),
                        FOREING KEY (idCurso) REFERENCES Curso(curso)
                        )`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log("Sucesso ao criar tabela Material")
        }
        catch (err) {
            console.error('Error');
        }
    }

    async insertMaterial(material: Material): Promise<Material> {
        try {
            const resultado = await executarComandoSQL("INSERT INTO StudyTech.Material (id, nome, descricao, formato, link, idCurso) VALUES (?, ?, ?, ?, ?, ?)", [material.id, material.nome, material.descricao, material.formato, material.link, material.idCurso]);
            material.id = resultado.insertId;
            console.log("Material Inserido com sucesso: ", material);
            return material;
        } catch (err) {
            console.error("Erro ao inserir Material: ", err)
            throw err
        }
    }

    async getMaterialByNameIdFormato(nome?: string, id?: number, formato?: string): Promise<Material[]> {
        let query = `SELECT * FROM StudyTech.Material WHERE`;
        const params: any[] = [];

        if (nome) {
            query += "name = ?"
            params.push(nome);
        }
        if (id) {
            query += (params.length ? " AND" : "") + " id = ?";
            params.push(id);
        }
        if (formato) {
            query += (params.length ? " AND" : "") + " formato = ?";
        }
        if (params.length === 0) {
            throw new Error("Insira no minimo um parametro(id, nome ou formato)");
        }

        try {
            const resultado = await executarComandoSQL(query, params);
            console.log("Sucesso ao localizar Material: ", resultado);
            return resultado;
        } catch (err) {
            console.error("Não foi possivel localizar o Material, erro: ", err);
            throw err;
        }
    }

    async getAll(): Promise<Material[]> {
        const query = "SELECT * FROM StudyTech.Material";
        try {
            const resultado: Material[] = await executarComandoSQL(query, [])
            console.log("Sucesso ao listar os Materiais: ",)
            return resultado;
        } catch (err) {
            console.error("Não foi possivel listar os Materiais: ", err);
            throw err;
        }
    }

    async updateMaterial(material: Material): Promise<void> {
        const query = "UPDATE StudyTech.Material SET nome = ?, link = ? WHERE id = ?";
        try {
            await executarComandoSQL(query, [material.nome, material.link, material.id]);
            console.log("Material alterado com sucesso: ", material.id);
        } catch (err) {
            console.error("Não foi possivel alterar dados do Material (Id: " + material.id + "): ", err);
            throw err;
        }
    }

    async deleteMaterial(id?: number): Promise<void> {
        try {
            const query = "DELETE FROM StudyTech.Material WHERE id = ?";
            await executarComandoSQL(query, [id])
            console.log("Material removido com sucesso: ", id);
        } catch (err) {
            console.error("Não foi possivel remover o Material: ", err);
            throw err;
        }
    }
}