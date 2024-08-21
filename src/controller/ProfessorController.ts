import { ProfessorService } from "../service/ProfessorService";
import { ProfessorEntity } from "../model/entity/ProfessorEntity";
import { ProfessorDto } from "../model/dto/ProfessorDto";
import { ProfessorRequestDto } from "../model/dto/ProfessorRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";

@Route("professor")
@Tags("Professor")

export class ProfessorController extends Controller {
    professorService = new ProfessorService();

    @Post()
    async cadastrarProfessor(
        @Body() dto: ProfessorRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const professor = await this.professorService.criarProfessor(dto);
            return sucess(201, new BasicResponseDto("Professor cadastrado com sucesso!", professor));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put()
    async atualizarProfessor(
        @Body() dto: ProfessorDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const professor = await this.professorService.atualizarProfessor(dto);
            return sucess(200, new BasicResponseDto("Professor atualizado com sucesso!", professor))
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletarProfessor(
        @Body() dto: ProfessorDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const professor = await this.professorService.deletarProfessor(dto);
            return success(200, new BasicResponseDto("Professor deletado com sucesso!", professor));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("id/{id}")
    async filtrarPorId(
        @Path() id: number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const professor = await this.professorService.localizarPorNomeIdCPF(id);
            return success(200, new BasicResponseDto("Professor encontrado!", professor));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("nome")
    async filtrarPorNome(
        @Query() nome: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const materiais: ProfessorEntity[] = await this.professorService.localizarPorNomeIdCPF(nome);
            return success(200, new BasicResponseDto("Professor encontrado com sucesso!", materiais));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("cpf")
    async filtrarPorFormato(
        @Query() formato: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const materiais: ProfessorEntity[] = await this.professorService.localizarPorNomeIdCPF(formato);
            return success(200, new BasicResponseDto("Professor encontrado com sucesso!", materiais));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarProfessores(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const materiais: ProfessorEntity[] = await this.professorService.listarProfessores();
            return success(200, new BasicResponseDto("Prodfessores listados com sucesso!", materiais));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}
