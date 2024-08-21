"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoController = void 0;
const CursoService_1 = require("../service/CursoService");
const CursoDto_1 = require("../model/dto/CursoDto");
const CursoRequestDto_1 = require("../model/dto/CursoRequestDto");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const tsoa_1 = require("tsoa");
let CursoController = class CursoController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.cursoService = new CursoService_1.CursoService();
    }
    cadastrarCurso(dto, fail, sucess) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const curso = yield this.cursoService.criarCurso(dto);
                return sucess(201, new BasicResponseDto_1.BasicResponseDto("Curso criado com sucesso!", curso));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    atualizarCurso(dto, notFound, sucess) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const curso = yield this.cursoService.atualizarCurso(dto);
                return sucess(200, new BasicResponseDto_1.BasicResponseDto("Curso atualizado com sucesso!", curso));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    deletarCurso(dto, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const curso = yield this.cursoService.deletarCurso(dto);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Curso deletado com sucesso!", curso));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    filtrarPorId(id, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const curso = yield this.cursoService.localizarPorId(id);
                return success(200, new BasicResponseDto_1.BasicResponseDto("curso encontrado!", curso));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    filtrarPorProfessor(nomeProf, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cursos = yield this.cursoService.localizarPorProfessor(nomeProf);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Cursos encontrados com sucesso!", cursos));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    filtrarPorNome(nome, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cursos = yield this.cursoService.localizarPorNome(nome);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Curso encontrado com sucesso!", cursos));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    filtrarPorArea(nomeProf, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cursos = yield this.cursoService.listarCursosArea(nomeProf);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Cursos encontrados com sucesso!", cursos));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    listarCursos(notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cursos = yield this.cursoService.listarCursos();
                return success(200, new BasicResponseDto_1.BasicResponseDto("Cursos listados com sucesso!", cursos));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
};
exports.CursoController = CursoController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CursoRequestDto_1.CursoRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], CursoController.prototype, "cadastrarCurso", null);
__decorate([
    (0, tsoa_1.Put)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CursoDto_1.CursoDto, Function, Function]),
    __metadata("design:returntype", Promise)
], CursoController.prototype, "atualizarCurso", null);
__decorate([
    (0, tsoa_1.Delete)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CursoDto_1.CursoDto, Function, Function]),
    __metadata("design:returntype", Promise)
], CursoController.prototype, "deletarCurso", null);
__decorate([
    (0, tsoa_1.Get)("id/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], CursoController.prototype, "filtrarPorId", null);
__decorate([
    (0, tsoa_1.Get)("professor"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], CursoController.prototype, "filtrarPorProfessor", null);
__decorate([
    (0, tsoa_1.Get)("nome"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], CursoController.prototype, "filtrarPorNome", null);
__decorate([
    (0, tsoa_1.Get)("area"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], CursoController.prototype, "filtrarPorArea", null);
__decorate([
    (0, tsoa_1.Get)("all"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], CursoController.prototype, "listarCursos", null);
exports.CursoController = CursoController = __decorate([
    (0, tsoa_1.Route)("curso"),
    (0, tsoa_1.Tags)("Curso")
], CursoController);
