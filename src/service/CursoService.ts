import { CursoEntity } from "../model/entity/CursoEntity";
import { CursoRepository } from "../repository/CursoRepository";

export class CursoService {
    cursoRepository = CursoRepository.getInstance();

    async criarCurso(cursoData: any): Promise<CursoEntity> {
        const { nome, area, descricao, nivel, duracao, valor } = cursoData;
        if (typeof nome !== 'string' || typeof area !== 'string' || typeof descricao !== 'string' || typeof nivel !== 'string' || typeof duracao !== 'string' || typeof valor !== 'number') {
            throw new Error("Dados incorretos, verificar se é 'number' ou 'string'");
        }
        if (!nome || !area || !descricao || !nivel || !duracao || !valor) {
            throw new Error("Dados incompletos, verificar se foi inseridos todos os dados obrigatórios(nome, area, descricao, nivel, duracao, valor)");
        }
        const verificarCurso = await this.localizarPorNome({ nome });
        if (verificarCurso.length > 0) {
            throw new Error("Não foi possivel criar o curso, pois ele já existe.");
        }
        const novoCurso = this.cursoRepository.insertCurso(new CursoEntity(undefined, nome, area, descricao, nivel, duracao, valor, undefined, undefined, undefined));
        console.log("Service - Insert ", novoCurso);
        return novoCurso;
    }

    async localizarPorNome(cursoData: any): Promise<CursoEntity[]> {
        const { nome } = cursoData;

        if (!nome) {
            throw new Error("É necessário fornecer o nome.");
        } else {
            const curso = await this.cursoRepository.filterCursoByNome(cursoData);
            console.log("Service - Filtrar por nome", curso);
            return curso;
        }
    }

    async localizarPorId(cursoData: any): Promise<CursoEntity[]> {
        const { id } = cursoData;

        if (!id) {
            throw new Error("É necessário fornecer o id.");
        } else {
            const curso = await this.cursoRepository.filterCursoByNome(cursoData);
            console.log("Service - Filtrar por id", curso);
            return curso;
        }
    }

    async localizarPorProfessor(cursoData: any): Promise<CursoEntity> {
        const nomeProf: string = cursoData
        if (!nomeProf) {
            throw new Error("É necessário fornecer o nome do professor para realizar a consulta");
        }
        console.log("Service - Filtrar por professor");
        return await this.cursoRepository.filterProf(cursoData);
    }

    async listarCursos(): Promise<CursoEntity[]> {
        const cursos = await this.cursoRepository.getAll();
        console.log("Service - Listar Tudo", cursos);
        return cursos;
    }

    async listarCursosArea(cursoData: any): Promise<CursoEntity> {
        const area: string = cursoData;
        if (!area) {
            throw new Error("É necessário fornecer o nome da area para realizar a consulta");
        }
        const cursos = await this.cursoRepository.filterCursosByArea(cursoData);
        console.log("Service - Listar Por Area", cursos);
        return cursos;
    }

    async atualizarCurso(cursoData: any): Promise<CursoEntity> {
        const { id, nome, descricao, duracao, valor, nomeProfessor, idProfessor } = cursoData;
        if (typeof id !== 'number' || typeof nome !== 'string' || typeof descricao !== 'string' || typeof duracao !== 'string' || typeof valor !== 'string' || typeof nomeProfessor !== 'string' || typeof idProfessor !== 'number') {
            throw new Error("Dados incorretos, verifique se os dados informados são dos tipos: 'number' ou 'string'");
        }
        const curso = new CursoEntity(id, nome, descricao, duracao, valor, nomeProfessor, idProfessor);

        const verificarCurso = await this.cursoRepository.filterCursoById(cursoData);
        if (verificarCurso.length === 0) {
            throw new Error("Não foi possível atualizar o curso, pois ele não existe.");
        }
        await this.cursoRepository.updateCurso(curso);
        console.log("Service - Update", curso);
        return curso;
    }

    async deletarCurso(cursoData: any): Promise<void> {
        const { id } = cursoData;
        if (!id) {
            throw new Error("É necessário fornecer um id.");
        }

        const curso = await this.cursoRepository.filterCursoById(cursoData);
        if (curso.length === 0) {
            throw new Error("O curso não existe prara ser deletado");
        }
        await this.cursoRepository.deleteCurso(cursoData);
        console.log("Service - Delete");
    }

}