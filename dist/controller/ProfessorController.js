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
exports.ProfessorController = void 0;
const ProfessorService_1 = require("../service/ProfessorService");
const ProfessorDto_1 = require("../model/dto/ProfessorDto");
const ProfessorRequestDto_1 = require("../model/dto/ProfessorRequestDto");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const tsoa_1 = require("tsoa");
let ProfessorController = class ProfessorController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.professorService = new ProfessorService_1.ProfessorService();
    }
    cadastrarProfessor(dto, fail, sucess) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const professor = yield this.professorService.criarProfessor(dto);
                return sucess(201, new BasicResponseDto_1.BasicResponseDto("Professor cadastrado com sucesso!", professor));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    atualizarProfessor(dto, notFound, sucess) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const professor = yield this.professorService.atualizarProfessor(dto);
                return sucess(200, new BasicResponseDto_1.BasicResponseDto("Professor atualizado com sucesso!", professor));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    deletarProfessor(dto, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const professor = yield this.professorService.deletarProfessor(dto);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Professor deletado com sucesso!", professor));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    filtrarPorId(id, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const professor = yield this.professorService.localizarPorNomeIdCPF(id);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Professor encontrado!", professor));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    filtrarPorNome(nome, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const materiais = yield this.professorService.localizarPorNomeIdCPF(nome);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Professor encontrado com sucesso!", materiais));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    filtrarPorFormato(formato, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const materiais = yield this.professorService.localizarPorNomeIdCPF(formato);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Professor encontrado com sucesso!", materiais));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    listarProfessores(notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const materiais = yield this.professorService.listarProfessores();
                return success(200, new BasicResponseDto_1.BasicResponseDto("Prodfessores listados com sucesso!", materiais));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
};
exports.ProfessorController = ProfessorController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProfessorRequestDto_1.ProfessorRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], ProfessorController.prototype, "cadastrarProfessor", null);
__decorate([
    (0, tsoa_1.Put)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProfessorDto_1.ProfessorDto, Function, Function]),
    __metadata("design:returntype", Promise)
], ProfessorController.prototype, "atualizarProfessor", null);
__decorate([
    (0, tsoa_1.Delete)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProfessorDto_1.ProfessorDto, Function, Function]),
    __metadata("design:returntype", Promise)
], ProfessorController.prototype, "deletarProfessor", null);
__decorate([
    (0, tsoa_1.Get)("id/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], ProfessorController.prototype, "filtrarPorId", null);
__decorate([
    (0, tsoa_1.Get)("nome"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], ProfessorController.prototype, "filtrarPorNome", null);
__decorate([
    (0, tsoa_1.Get)("cpf"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], ProfessorController.prototype, "filtrarPorFormato", null);
__decorate([
    (0, tsoa_1.Get)("all"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], ProfessorController.prototype, "listarProfessores", null);
exports.ProfessorController = ProfessorController = __decorate([
    (0, tsoa_1.Route)("professor"),
    (0, tsoa_1.Tags)("Professor")
], ProfessorController);
