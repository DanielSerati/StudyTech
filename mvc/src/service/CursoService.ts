import { Curso } from "../model/entity/Curso";
import { CursoRepository } from "../repository/CursoRepository";

export class CursoService {
    cursoRepository = CursoRepository.getInstance();

    async criarCurso(cursoData: any): Promise<Curso> {
        const { nome, area, descricao, nivel, duracao, valor } = cursoData;
        if (typeof nome !== 'string' || typeof area !== 'string' || typeof descricao !== 'string' || typeof nivel !== 'string' || typeof duracao !== 'string' || typeof valor !== 'number') {
            throw new Error("Dados incorretos, verificar se é 'number' ou 'string'");
        }
        if (!nome || !area || !descricao || !nivel || !duracao || !valor) {
            throw new Error("Dados incompletos, verificar se foi inseridos todos os dados obrigatórios(nome, area, descricao, nivel, duracao, valor)");
        }
        const verificarCurso = await this.localizarPorIdNome(cursoData);
        if (verificarCurso) {
            throw new Error("Não foi possivel criar o curso, pois ele já existe.");
        }
        const novoCurso = this.cursoRepository.insertCurso(new Curso(undefined, nome, area, descricao, nivel, duracao, valor, undefined, undefined, undefined));
        console.log("Service - Insert ", novoCurso);
        return novoCurso;
    }

    async localizarPorIdNome(cursoData: any): Promise<Curso[]> {
        const { idCurso, nomeCurso } = cursoData;
        if (!idCurso && !nomeCurso) {
            throw new Error("É necessário fornecer ao menos um parâmetro (idCurso ou nomeCurso).");
        }
        else {
            const curso = this.cursoRepository.filterCursoByNameId(cursoData);
            console.log("Service - Filtrar por id e nome", curso);
            return curso;
        }
    }

    async localizarPorProfessor(cursoData: any): Promise<Curso> {
        const nomeProf: string = cursoData
        if (!nomeProf) {
            throw new Error("É necessário fornecer o nome do professor para realizar a consulta");
        }
        console.log("Service - Filtrar por professor");
        return await this.cursoRepository.filterProf(cursoData);
    }

    async listarCursos(): Promise<Curso[]> {
        const cursos = await this.cursoRepository.getAll();
        console.log("Service - Listar Tudo", cursos);
        return cursos;
    }

    async listarCursosArea(cursoData: any): Promise<Curso[]> {
        const area: string = cursoData;
        if (!area) {
            throw new Error("É necessário fornecer o nome da area para realizar a consulta");
        }
        const cursos = await this.cursoRepository.filterCursoByNameId(cursoData);
        console.log("Service - Listar Por Area", cursos);
        return cursos;
    }

    async atualizarCurso(cursoData: any): Promise<Curso> {
        const { id, nome, descricao, duracao, valor, nomeProfessor, idProfessor } = cursoData;
        if (typeof id !== 'number' || typeof nome !== 'string' || typeof descricao !== 'string' || typeof duracao !== 'string' || typeof valor !== 'string' || typeof nomeProfessor !== 'string' || typeof idProfessor !== 'number') {
            throw new Error("Dados incorretos, verifique se os dados informados são dos tipos: 'number' ou 'string'");
        }
        const curso = new Curso(id, nome, descricao, duracao, valor, nomeProfessor, idProfessor);

        const verificarCurso = await this.cursoRepository.filterCursoByNameId(cursoData);
        if (verificarCurso.length === 0) {
            throw new Error("Não foi possível atualizar o curso, pois ele não existe.");
        }
        await this.cursoRepository.updateCurso(curso);
        console.log("Service - Update", curso);
        return curso;
    }

    async deletarCurso(cursoData: any): Promise<void> {
        const { nome, id } = cursoData;
        if (!id && !nome) {
            throw new Error("É necessário fornecer pelo menos um parâmetro (id ou nome).");
        }

        const curso = await this.cursoRepository.filterCursoByNameId(cursoData);
        if (curso.length === 0) {
            throw new Error("O curso não existe prara ser deletado");
        }
        await this.cursoRepository.deleteCurso(cursoData);
        console.log("Service - Delete");
    }

}