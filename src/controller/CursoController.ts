import { CursoService } from "../service/CursoService";
import { CursoEntity } from "../model/entity/CursoEntity";
import { CursoDto } from "../model/dto/CursoDto";
import { CursoRequestDto } from "../model/dto/CursoRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";

@Route("curso")
@Tags("Curso")

export class CursoController extends Controller {
    cursoService = new CursoService();

    @Post()
    async cadastrarCurso(
        @Body() dto: CursoRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const curso = await this.cursoService.criarCurso(dto);
            return sucess(201, new BasicResponseDto("Curso criado com sucesso!", curso));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put()
    async atualizarCurso(
        @Body() dto: CursoDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const curso = await this.cursoService.atualizarCurso(dto);
            return sucess(200, new BasicResponseDto("Curso atualizado com sucesso!", curso))
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletarCurso(
        @Body() dto: CursoDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const curso = await this.cursoService.deletarCurso(dto);
            return success(200, new BasicResponseDto("Curso deletado com sucesso!", curso));
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
            const curso = await this.cursoService.localizarPorId(id);
            return success(200, new BasicResponseDto("curso encontrado!", curso));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("professor")
    async filtrarPorProfessor(
        @Query() nomeProf: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const cursos: CursoEntity = await this.cursoService.localizarPorProfessor(nomeProf);
            return success(200, new BasicResponseDto("Cursos encontrados com sucesso!", cursos));
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
            const cursos: CursoEntity[] = await this.cursoService.localizarPorNome(nome);
            return success(200, new BasicResponseDto("Curso encontrado com sucesso!", cursos));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("area")
    async filtrarPorArea(
        @Query() nomeProf: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const cursos: CursoEntity = await this.cursoService.listarCursosArea(nomeProf);
            return success(200, new BasicResponseDto("Cursos encontrados com sucesso!", cursos));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarCursos(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const cursos: CursoEntity[] = await this.cursoService.listarCursos();
            return success(200, new BasicResponseDto("Cursos listados com sucesso!", cursos));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}
