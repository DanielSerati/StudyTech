import { MaterialEntity } from "../model/entity/MaterialEntity";
import { CursoEntity } from "../model/entity/CursoEntity";
import { MaterialRepository } from "../repository/MaterialRepository";
import { CursoRepository } from "../repository/CursoRepository";

export class MaterialService {
    cursoRepository = CursoRepository.getInstance();
    materialRepository = MaterialRepository.getInstance();

    async criarMaterial(materialData: any): Promise<MaterialEntity> {
        const { id, nome, descricao, formato, link, idCurso } = materialData;

        const verificarMaterial = await this.materialRepository.filterPorNameIdFormato(materialData);
        if (verificarMaterial) {
            throw new Error("Esse Material já está cadastrado");
        }
        const verificarCurso = await this.cursoRepository.filterCursoByNameId(idCurso)
        if (!verificarCurso) {
            throw new Error("Não foi possivel cadastrar o professor, pois o curso não existe");
        }
        const novoMaterial = await this.materialRepository.insertMaterial(new MaterialEntity(id, nome, descricao, formato, link, idCurso));
        await this.atualizarCurso(materialData);
        console.log("Service - Insert");
        return novoMaterial;
    }

    async atualizarCurso(materialData: any): Promise<void> {
        const { idCurso, nome, id } = materialData;
        if (!idCurso || !nome || !id) {
            throw new Error("Parâmetros insuficientes fornecidos para atualizar o curso.");
        }

        try {
            const material = await this.materialRepository.filterPorNameIdFormato(materialData);
            if (!material || material.length === 0) {
                throw new Error("Nenhum material encontrado com o nome e ID especificados.");
            }
            const idMaterial = material[0].id;

            const cursoExistenteArray = await this.cursoRepository.filterCursoByNameId(new CursoEntity(idCurso));
            if (cursoExistenteArray.length === 0) {
                throw new Error(`Curso com ID ${idCurso} não encontrado.`);
            }
            const cursoExistente = cursoExistenteArray[0];
            const novosIdMaterial = [...cursoExistente.idMaterial, idMaterial]
            const cursoData = new CursoEntity(idCurso, cursoExistente.nome, cursoExistente.area, cursoExistente.descricao, cursoExistente.nivel, cursoExistente.duracao, cursoExistente.valor, cursoExistente.nomeProfessor, cursoExistente.idProfessor, novosIdMaterial
            );
            const cursoAtualizado = await this.cursoRepository.updateCurso(cursoData);

            if (!cursoAtualizado) {
                throw new Error(`Não foi possível atualizar o curso com ID ${idCurso}`);
            }
            console.log(`Curso com ID ${idCurso} atualizado com sucesso.`);
        } catch (err) {
            console.error(`Erro ao atualizar o curso com ID ${idCurso}: `, err);
            throw err;
        }
    }

    async atualizarMaterial(materialData: any): Promise<MaterialEntity> {
        const { id, nome, descricao, formato, link, idCurso } = materialData;
        const material = new MaterialEntity(id, nome, descricao, formato, link, idCurso);

        const verificarMaterial = await this.materialRepository.filterPorNameIdFormato(materialData);
        if (verificarMaterial.length === 0) {
            throw new Error("Não foi possivel atualizar, pois não foi encontrado nenhum material");
        }
        await this.materialRepository.updateMaterial(materialData);
        console.log("Service - Update", material);
        console.log(`Sucesso ao atualizar dados do Professor ${nome}`);
        return material;
    }

    async listarMateriais(): Promise<MaterialEntity[]> {
        const materiais = await this.materialRepository.getAll();
        if (!materiais) {
            throw new Error("Erro ao listar Materiais");
        }
        console.log("Service - Filtrar Todos", materiais);
        return materiais;
    }

    async localizarPorNomeIdformato(materialData: any): Promise<MaterialEntity[]> {
        const { id, nome, formato, idCurso } = materialData;
        if (!id && !nome && !formato && !idCurso) {
            throw new Error("É necessário fornecer ao menos um parâmetro (id, nome, formato ou idCurso ).");
        }
        else {
            const material = await this.materialRepository.filterPorNameIdFormato(materialData);
            console.log("Service - Filtrar", material);
            return material;
        }
    }

    async deletarMaterial(materialData: any): Promise<void> {
        const id: number = materialData;
        if (!id) {
            throw new Error("É necessário do id.");
        }
        const material = await this.materialRepository.filterPorNameIdFormato(materialData);
        if (!material.length) {
            throw new Error("Material inexistente");
        }
        await this.materialRepository.deleteMaterial(materialData);
        console.log("service - Delete");
    }
}