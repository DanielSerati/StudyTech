import { Professor } from "../model/entity/Professor";
import { ProfessorRepository } from "../repository/ProfessorRepository";
import { CursoRepository } from "../repository/CursoRepository";
import { CursoService } from "./CursoService";
import { Curso } from "../model/entity/Curso";

export class ProfessorService {
    professorRepository = ProfessorRepository.getInstance();
    cursoRepository = CursoRepository.getInstance();
    cursoService: CursoService = new CursoService();

    async criarProfessores(professorData: any): Promise<Professor> {
        const { nome, sobrenome, dataNascimento, cpf, email, matricula, senha, idCurso } = professorData;

        const verificarProf = await this.professorRepository.getProfessorByNameIdCPF(professorData);
        if (verificarProf) {
            throw new Error("Esse Professor já está cadastrado");
        }
        const verificarCurso = await this.cursoRepository.filterCursoByNameId(professorData)
        if (!verificarCurso) {
            throw new Error("Não foi possivel cadastrar o professor, pois o curso não existe");
        }
        const novoProfessor = await this.professorRepository.insertProfessor(new Professor(undefined, nome, sobrenome, dataNascimento, cpf, email, matricula, senha, idCurso));
        await this.atualizarCurso(professorData);
        console.log("Service - Insert");
        return novoProfessor;
    }

    async atualizarCurso(professorData: any): Promise<void> {
        const { idCurso, nomeProfessor, cpf } = professorData;
        if (!idCurso || !nomeProfessor || !cpf) {
            throw new Error("Parâmetros insuficientes fornecidos para atualizar o curso.");
        }

        try {
            const professor = await this.professorRepository.getProfessorByNameIdCPF(professorData);
            if (!professor || professor.length === 0) {
                throw new Error("Nenhum professor encontrado com o nome e id especificados.");
            }
            const idProfessor = professor[0].id;
            const cursoData = new Curso(idCurso, undefined, undefined, undefined, undefined, undefined, undefined, nomeProfessor, idProfessor, []
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



    async atualizarProfessor(professorData: any): Promise<Professor> {
        const { id, nome, sobrenome, email, senha, idCurso } = professorData;

        const professor = new Professor(id, nome, sobrenome, email, senha, idCurso);

        const verificarProf = await this.professorRepository.getProfessorByNameIdCPF(professorData);
        if (verificarProf.length === 0) {
            throw new Error("Não foi possivel atualizar o curso, pois não foi encontrado nenhum professor");
        }
        await this.professorRepository.updateProfessor(professorData);
        console.log("Service - Update", professor);
        console.log(`Sucesso ao atualizar dados do Professor ${nome}`);
        return professor;
    }

    async listarProfessores(): Promise<Professor[]> {
        const professores = await this.professorRepository.getAll();
        if (!professores) {
            throw new Error("Erro ao listar Professores");
        }
        console.log("Service - Filtrar Todos", professores);
        return professores;
    }

    async localizarPorNomeIdCPF(professorData: any): Promise<Professor[]> {
        const { id, nome, cpf } = professorData;
        if (!id && !nome && !cpf) {
            throw new Error("É necessário fornecer ao menos um parâmetro (id, nome ou cpf).");
        }
        else {
            const professor = await this.professorRepository.getProfessorByNameIdCPF(professorData);
            console.log("Service - Filtrar", professor);
            return professor;
        }
    }

    async deletarProfessor(professorData: any): Promise<void> {
        const { nome, id, cpf } = professorData;
        if (!nome || !id || !cpf) {
            throw new Error("É necessário preenceher todos os campos (nome, id e cpf).");
        }
        const encontrarProfessor = await this.localizarPorNomeIdCPF(professorData);
        if (encontrarProfessor.length === 0) {
            throw new Error("O Professor não foi localizado");
        }
        await this.professorRepository.deleteProfessor(professorData);
        console.log("service - Delete");
    }
}