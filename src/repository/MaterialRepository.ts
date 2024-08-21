import { executarComandoSQL } from "../database/mysql";
import { CursoEntity } from "../model/entity/CursoEntity";
import { MaterialEntity } from "../model/entity/MaterialEntity";

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
                        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                        nome VARCHAR2(255) NOT NULL,
                        descricao VARCHAR2(255) NOT NULL,
                        formato VARCHAR2(255) NOT NULL,
                        link VARCHAR2(255) NOT NULL,
                        idCurso INT NOT NULL,
                        FOREIGN KEY (idCurso) REFERENCES studyTech.Curso(id)
                        )`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log("Sucesso ao criar tabela Material")
        }
        catch (err) {
            console.error('Error');
        }
    }

    async insertMaterial(material: MaterialEntity): Promise<MaterialEntity> {
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

    async filterPorNameIdFormato(material: MaterialEntity): Promise<MaterialEntity[]> {
        let query = `SELECT * FROM StudyTech.Material WHERE`;
        const params: any[] = [];

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
            const resultado = await executarComandoSQL(query, params);
            console.log("Sucesso ao localizar Material: ", resultado);
            return resultado;
        } catch (err) {
            console.error("Não foi possivel localizar o Material, erro: ", err);
            throw err;
        }
    }

    async getAll(): Promise<MaterialEntity[]> {
        const query = "SELECT * FROM StudyTech.Material";
        try {
            const resultado: MaterialEntity[] = await executarComandoSQL(query, []);
            return new Promise<MaterialEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error("Não foi possivel listar os Materiais: ", err);
            throw err;
        }
    }

    async updateMaterial(material: MaterialEntity): Promise<MaterialEntity> {
        const query = "UPDATE StudyTech.Material SET nome = ?, link = ? WHERE id = ?";
        try {
            const resultado = await executarComandoSQL(query, [material.nome, material.link, material.id]);
            console.log("Material alterado com sucesso: ", material.id);
            return new Promise<MaterialEntity>((resolve) => {
                resolve(resultado);
            })
        } catch (err) {
            console.error("Não foi possivel alterar dados do Material (Id: " + material.id + "): ", err);
            throw err;
        }
    }

    async deleteMaterial(material: MaterialEntity): Promise<MaterialEntity> {
        const query = "DELETE FROM StudyTech.Material WHERE id = ?";
        try {
            await executarComandoSQL(query, [material.id])
            console.log("Material removido com sucesso: ", material);
            return material;
        } catch (err: any) {
            console.error(`Não foi possivel remover o Material: ${material.id}`, err);
            throw err;
        }
    }
}