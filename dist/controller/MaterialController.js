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
exports.MaterialController = void 0;
const MaterialService_1 = require("../service/MaterialService");
const MaterialDto_1 = require("../model/dto/MaterialDto");
const MaterialRequestDto_1 = require("../model/dto/MaterialRequestDto");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const tsoa_1 = require("tsoa");
let MaterialController = class MaterialController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.materialService = new MaterialService_1.MaterialService();
    }
    cadastrarMaterial(dto, fail, sucess) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const material = yield this.materialService.criarMaterial(dto);
                return sucess(201, new BasicResponseDto_1.BasicResponseDto("Material criado com sucesso!", material));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    atualizarMaterial(dto, notFound, sucess) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const material = yield this.materialService.atualizarMaterial(dto);
                return sucess(200, new BasicResponseDto_1.BasicResponseDto("Material atualizado com sucesso!", material));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    deletarMaterial(dto, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const material = yield this.materialService.deletarMaterial(dto);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Material deletado com sucesso!", material));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    filtrarPorId(id, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const material = yield this.materialService.localizarPorNomeIdformato(id);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Material encontrado!", material));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    filtrarPorNome(nome, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const materiais = yield this.materialService.localizarPorNomeIdformato(nome);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Material encontrado com sucesso!", materiais));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    filtrarPorFormato(formato, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const materiais = yield this.materialService.localizarPorNomeIdformato(formato);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Materiais encontrados com sucesso!", materiais));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    listarMateriais(notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const materiais = yield this.materialService.listarMateriais();
                return success(200, new BasicResponseDto_1.BasicResponseDto("Materiais listados com sucesso!", materiais));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
};
exports.MaterialController = MaterialController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MaterialRequestDto_1.MaterialRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], MaterialController.prototype, "cadastrarMaterial", null);
__decorate([
    (0, tsoa_1.Put)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MaterialDto_1.MaterialDto, Function, Function]),
    __metadata("design:returntype", Promise)
], MaterialController.prototype, "atualizarMaterial", null);
__decorate([
    (0, tsoa_1.Delete)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MaterialDto_1.MaterialDto, Function, Function]),
    __metadata("design:returntype", Promise)
], MaterialController.prototype, "deletarMaterial", null);
__decorate([
    (0, tsoa_1.Get)("id/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], MaterialController.prototype, "filtrarPorId", null);
__decorate([
    (0, tsoa_1.Get)("nome"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], MaterialController.prototype, "filtrarPorNome", null);
__decorate([
    (0, tsoa_1.Get)("formato"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], MaterialController.prototype, "filtrarPorFormato", null);
__decorate([
    (0, tsoa_1.Get)("all"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], MaterialController.prototype, "listarMateriais", null);
exports.MaterialController = MaterialController = __decorate([
    (0, tsoa_1.Route)("material"),
    (0, tsoa_1.Tags)("Material")
], MaterialController);
