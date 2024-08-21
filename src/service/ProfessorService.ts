import { ProfessorEntity } from "../model/entity/ProfessorEntity";
import { ProfessorRepository } from "../repository/ProfessorRepository";
import { CursoRepository } from "../repository/CursoRepository";
import { CursoEntity } from "../model/entity/CursoEntity";

export class ProfessorService {
    professorRepository = ProfessorRepository.getInstance();
    cursoRepository = CursoRepository.getInstance();

    async criarProfessor(professorData: any): Promise<ProfessorEntity> {
        const { nome, sobrenome, dataNascimento, cpf, email, matricula, senha, idCurso } = professorData;

        const verificarProf = await this.professorRepository.filterProfessorByNameIdCPF(professorData);
        if (verificarProf) {
            throw new Error("Esse Professor já está cadastrado");
        }
        const verificarCurso = await this.cursoRepository.filterCursoByNameId(idCurso)
        if (!verificarCurso) {
            throw new Error("Não foi possivel cadastrar o professor, pois o curso não existe");
        }
        const novoProfessor = await this.professorRepository.insertProfessor(new ProfessorEntity(undefined, nome, sobrenome, dataNascimento, cpf, email, matricula, senha, idCurso));
        await this.atualizarCurso(professorData);
        console.log("Service - Insert");
        return novoProfessor;
    }

    async atualizarCurso(professorData: any): Promise<void> {
        const { idCurso, nome, cpf } = professorData;
        if (!idCurso || !nome || !cpf) {
            throw new Error("Parâmetros insuficientes fornecidos para atualizar o curso.");
        }

        try {
            const professor = await this.professorRepository.filterProfessorByNameIdCPF(professorData);
            if (!professor || professor.length === 0) {
                throw new Error("Nenhum professor encontrado com o nome e id especificados.");
            }
            const idProfessor = professor[0].id;

            const cursoData = new CursoEntity(idCurso, undefined, undefined, undefined, undefined, undefined, undefined, nome, idProfessor, []);
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



    async atualizarProfessor(professorData: any): Promise<ProfessorEntity> {
        const { id, nome, sobrenome, email, senha, idCurso } = professorData;

        const professor = new ProfessorEntity(id, nome, sobrenome, email, senha, idCurso);

        const verificarProf = await this.professorRepository.filterProfessorByNameIdCPF(professorData);
        if (verificarProf.length === 0) {
            throw new Error("Não foi possivel atualizar, pois não foi encontrado nenhum professor");
        }
        await this.professorRepository.updateProfessor(professorData);
        console.log("Service - Update", professor);
        console.log(`Sucesso ao atualizar dados do Professor ${nome}`);
        return professor;
    }

    async listarProfessores(): Promise<ProfessorEntity[]> {
        const professores = await this.professorRepository.getAll();
        if (!professores) {
            throw new Error("Erro ao listar Professores");
        }
        console.log("Service - Filtrar Todos", professores);
        return professores;
    }

    async localizarPorNomeIdCPF(professorData: any): Promise<ProfessorEntity[]> {
        const { id, nome, cpf } = professorData;
        if (!id && !nome && !cpf) {
            throw new Error("É necessário fornecer ao menos um parâmetro (id, nome ou cpf).");
        }
        else {
            const professor = await this.professorRepository.filterProfessorByNameIdCPF(professorData);
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