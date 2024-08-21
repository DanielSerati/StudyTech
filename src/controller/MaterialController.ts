import { MaterialService } from "../service/MaterialService";
import { MaterialEntity } from "../model/entity/MaterialEntity";
import { MaterialDto } from "../model/dto/MaterialDto";
import { MaterialRequestDto } from "../model/dto/MaterialRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";

@Route("material")
@Tags("Material")

export class MaterialController extends Controller {
    materialService = new MaterialService();

    @Post()
    async cadastrarMaterial(
        @Body() dto: MaterialRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const material = await this.materialService.criarMaterial(dto);
            return sucess(201, new BasicResponseDto("Material criado com sucesso!", material));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put()
    async atualizarMaterial(
        @Body() dto: MaterialDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const material = await this.materialService.atualizarMaterial(dto);
            return sucess(200, new BasicResponseDto("Material atualizado com sucesso!", material))
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletarMaterial(
        @Body() dto: MaterialDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const material = await this.materialService.deletarMaterial(dto);
            return success(200, new BasicResponseDto("Material deletado com sucesso!", material));
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
            const material = await this.materialService.localizarPorNomeIdformato(id);
            return success(200, new BasicResponseDto("Material encontrado!", material));
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
            const materiais: MaterialEntity[] = await this.materialService.localizarPorNomeIdformato(nome);
            return success(200, new BasicResponseDto("Material encontrado com sucesso!", materiais));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("formato")
    async filtrarPorFormato(
        @Query() formato: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const materiais: MaterialEntity[] = await this.materialService.localizarPorNomeIdformato(formato);
            return success(200, new BasicResponseDto("Materiais encontrados com sucesso!", materiais));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarMateriais(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const materiais: MaterialEntity[] = await this.materialService.listarMateriais();
            return success(200, new BasicResponseDto("Materiais listados com sucesso!", materiais));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}
