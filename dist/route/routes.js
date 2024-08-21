"use strict";
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
exports.RegisterRoutes = RegisterRoutes;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const ProfessorController_1 = require("./../controller/ProfessorController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const MaterialController_1 = require("./../controller/MaterialController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CursoController_1 = require("./../controller/CursoController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "ProfessorRequestDto": {
        "dataType": "refObject",
        "properties": {
            "nome": { "dataType": "string", "required": true },
            "sobrenome": { "dataType": "string", "required": true },
            "dataNascimento": { "dataType": "string", "required": true },
            "cpf": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "matricula": { "dataType": "string", "required": true },
            "senha": { "dataType": "string", "required": true },
            "idCurso": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "string", "required": true },
            "object": { "dataType": "any", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProfessorDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "nome": { "dataType": "string", "required": true },
            "sobrenome": { "dataType": "string", "required": true },
            "dataNascimento": { "dataType": "datetime", "required": true },
            "cpf": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "matricula": { "dataType": "string", "required": true },
            "senha": { "dataType": "string", "required": true },
            "idCurso": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MaterialRequestDto": {
        "dataType": "refObject",
        "properties": {
            "nome": { "dataType": "string", "required": true },
            "descricao": { "dataType": "string", "required": true },
            "formato": { "dataType": "string", "required": true },
            "link": { "dataType": "string", "required": true },
            "idCurso": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MaterialDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "nome": { "dataType": "string", "required": true },
            "descricao": { "dataType": "string", "required": true },
            "formato": { "dataType": "string", "required": true },
            "link": { "dataType": "string", "required": true },
            "idCurso": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CursoRequestDto": {
        "dataType": "refObject",
        "properties": {
            "nome": { "dataType": "string" },
            "area": { "dataType": "string" },
            "descricao": { "dataType": "string" },
            "nivel": { "dataType": "string" },
            "duracao": { "dataType": "string" },
            "valor": { "dataType": "double" },
            "nomeProfessor": { "dataType": "string" },
            "idProfessor": { "dataType": "double" },
            "idMaterial": { "dataType": "array", "array": { "dataType": "double" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CursoDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "nome": { "dataType": "string", "required": true },
            "area": { "dataType": "string", "required": true },
            "descricao": { "dataType": "string", "required": true },
            "nivel": { "dataType": "string", "required": true },
            "duracao": { "dataType": "string", "required": true },
            "valor": { "dataType": "double", "required": true },
            "nomeProfessor": { "dataType": "string", "required": true },
            "idProfessor": { "dataType": "double", "required": true },
            "idMaterial": { "dataType": "array", "array": { "dataType": "double" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.post('/professor', ...((0, runtime_1.fetchMiddlewares)(ProfessorController_1.ProfessorController)), ...((0, runtime_1.fetchMiddlewares)(ProfessorController_1.ProfessorController.prototype.cadastrarProfessor)), function ProfessorController_cadastrarProfessor(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "ProfessorRequestDto" },
                fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                sucess: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new ProfessorController_1.ProfessorController();
                yield templateService.apiHandler({
                    methodName: 'cadastrarProfessor',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/professor', ...((0, runtime_1.fetchMiddlewares)(ProfessorController_1.ProfessorController)), ...((0, runtime_1.fetchMiddlewares)(ProfessorController_1.ProfessorController.prototype.atualizarProfessor)), function ProfessorController_atualizarProfessor(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "ProfessorDto" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new ProfessorController_1.ProfessorController();
                yield templateService.apiHandler({
                    methodName: 'atualizarProfessor',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/professor', ...((0, runtime_1.fetchMiddlewares)(ProfessorController_1.ProfessorController)), ...((0, runtime_1.fetchMiddlewares)(ProfessorController_1.ProfessorController.prototype.deletarProfessor)), function ProfessorController_deletarProfessor(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "ProfessorDto" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new ProfessorController_1.ProfessorController();
                yield templateService.apiHandler({
                    methodName: 'deletarProfessor',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/professor/id/:id', ...((0, runtime_1.fetchMiddlewares)(ProfessorController_1.ProfessorController)), ...((0, runtime_1.fetchMiddlewares)(ProfessorController_1.ProfessorController.prototype.filtrarPorId)), function ProfessorController_filtrarPorId(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new ProfessorController_1.ProfessorController();
                yield templateService.apiHandler({
                    methodName: 'filtrarPorId',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/professor/nome', ...((0, runtime_1.fetchMiddlewares)(ProfessorController_1.ProfessorController)), ...((0, runtime_1.fetchMiddlewares)(ProfessorController_1.ProfessorController.prototype.filtrarPorNome)), function ProfessorController_filtrarPorNome(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                nome: { "in": "query", "name": "nome", "required": true, "dataType": "string" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new ProfessorController_1.ProfessorController();
                yield templateService.apiHandler({
                    methodName: 'filtrarPorNome',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/professor/cpf', ...((0, runtime_1.fetchMiddlewares)(ProfessorController_1.ProfessorController)), ...((0, runtime_1.fetchMiddlewares)(ProfessorController_1.ProfessorController.prototype.filtrarPorFormato)), function ProfessorController_filtrarPorFormato(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                formato: { "in": "query", "name": "formato", "required": true, "dataType": "string" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new ProfessorController_1.ProfessorController();
                yield templateService.apiHandler({
                    methodName: 'filtrarPorFormato',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/professor/all', ...((0, runtime_1.fetchMiddlewares)(ProfessorController_1.ProfessorController)), ...((0, runtime_1.fetchMiddlewares)(ProfessorController_1.ProfessorController.prototype.listarProfessores)), function ProfessorController_listarProfessores(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new ProfessorController_1.ProfessorController();
                yield templateService.apiHandler({
                    methodName: 'listarProfessores',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/material', ...((0, runtime_1.fetchMiddlewares)(MaterialController_1.MaterialController)), ...((0, runtime_1.fetchMiddlewares)(MaterialController_1.MaterialController.prototype.cadastrarMaterial)), function MaterialController_cadastrarMaterial(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "MaterialRequestDto" },
                fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                sucess: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new MaterialController_1.MaterialController();
                yield templateService.apiHandler({
                    methodName: 'cadastrarMaterial',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/material', ...((0, runtime_1.fetchMiddlewares)(MaterialController_1.MaterialController)), ...((0, runtime_1.fetchMiddlewares)(MaterialController_1.MaterialController.prototype.atualizarMaterial)), function MaterialController_atualizarMaterial(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "MaterialDto" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new MaterialController_1.MaterialController();
                yield templateService.apiHandler({
                    methodName: 'atualizarMaterial',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/material', ...((0, runtime_1.fetchMiddlewares)(MaterialController_1.MaterialController)), ...((0, runtime_1.fetchMiddlewares)(MaterialController_1.MaterialController.prototype.deletarMaterial)), function MaterialController_deletarMaterial(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "MaterialDto" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new MaterialController_1.MaterialController();
                yield templateService.apiHandler({
                    methodName: 'deletarMaterial',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/material/id/:id', ...((0, runtime_1.fetchMiddlewares)(MaterialController_1.MaterialController)), ...((0, runtime_1.fetchMiddlewares)(MaterialController_1.MaterialController.prototype.filtrarPorId)), function MaterialController_filtrarPorId(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new MaterialController_1.MaterialController();
                yield templateService.apiHandler({
                    methodName: 'filtrarPorId',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/material/nome', ...((0, runtime_1.fetchMiddlewares)(MaterialController_1.MaterialController)), ...((0, runtime_1.fetchMiddlewares)(MaterialController_1.MaterialController.prototype.filtrarPorNome)), function MaterialController_filtrarPorNome(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                nome: { "in": "query", "name": "nome", "required": true, "dataType": "string" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new MaterialController_1.MaterialController();
                yield templateService.apiHandler({
                    methodName: 'filtrarPorNome',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/material/formato', ...((0, runtime_1.fetchMiddlewares)(MaterialController_1.MaterialController)), ...((0, runtime_1.fetchMiddlewares)(MaterialController_1.MaterialController.prototype.filtrarPorFormato)), function MaterialController_filtrarPorFormato(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                formato: { "in": "query", "name": "formato", "required": true, "dataType": "string" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new MaterialController_1.MaterialController();
                yield templateService.apiHandler({
                    methodName: 'filtrarPorFormato',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/material/all', ...((0, runtime_1.fetchMiddlewares)(MaterialController_1.MaterialController)), ...((0, runtime_1.fetchMiddlewares)(MaterialController_1.MaterialController.prototype.listarMateriais)), function MaterialController_listarMateriais(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new MaterialController_1.MaterialController();
                yield templateService.apiHandler({
                    methodName: 'listarMateriais',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/curso', ...((0, runtime_1.fetchMiddlewares)(CursoController_1.CursoController)), ...((0, runtime_1.fetchMiddlewares)(CursoController_1.CursoController.prototype.cadastrarCurso)), function CursoController_cadastrarCurso(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "CursoRequestDto" },
                fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                sucess: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new CursoController_1.CursoController();
                yield templateService.apiHandler({
                    methodName: 'cadastrarCurso',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/curso', ...((0, runtime_1.fetchMiddlewares)(CursoController_1.CursoController)), ...((0, runtime_1.fetchMiddlewares)(CursoController_1.CursoController.prototype.atualizarCurso)), function CursoController_atualizarCurso(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "CursoDto" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new CursoController_1.CursoController();
                yield templateService.apiHandler({
                    methodName: 'atualizarCurso',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/curso', ...((0, runtime_1.fetchMiddlewares)(CursoController_1.CursoController)), ...((0, runtime_1.fetchMiddlewares)(CursoController_1.CursoController.prototype.deletarCurso)), function CursoController_deletarCurso(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "CursoDto" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new CursoController_1.CursoController();
                yield templateService.apiHandler({
                    methodName: 'deletarCurso',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/curso/id/:id', ...((0, runtime_1.fetchMiddlewares)(CursoController_1.CursoController)), ...((0, runtime_1.fetchMiddlewares)(CursoController_1.CursoController.prototype.filtrarPorId)), function CursoController_filtrarPorId(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new CursoController_1.CursoController();
                yield templateService.apiHandler({
                    methodName: 'filtrarPorId',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/curso/professor', ...((0, runtime_1.fetchMiddlewares)(CursoController_1.CursoController)), ...((0, runtime_1.fetchMiddlewares)(CursoController_1.CursoController.prototype.filtrarPorProfessor)), function CursoController_filtrarPorProfessor(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                nomeProf: { "in": "query", "name": "nomeProf", "required": true, "dataType": "string" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new CursoController_1.CursoController();
                yield templateService.apiHandler({
                    methodName: 'filtrarPorProfessor',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/curso/nome', ...((0, runtime_1.fetchMiddlewares)(CursoController_1.CursoController)), ...((0, runtime_1.fetchMiddlewares)(CursoController_1.CursoController.prototype.filtrarPorNome)), function CursoController_filtrarPorNome(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                nome: { "in": "query", "name": "nome", "required": true, "dataType": "string" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new CursoController_1.CursoController();
                yield templateService.apiHandler({
                    methodName: 'filtrarPorNome',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/curso/area', ...((0, runtime_1.fetchMiddlewares)(CursoController_1.CursoController)), ...((0, runtime_1.fetchMiddlewares)(CursoController_1.CursoController.prototype.filtrarPorArea)), function CursoController_filtrarPorArea(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                nomeProf: { "in": "query", "name": "nomeProf", "required": true, "dataType": "string" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new CursoController_1.CursoController();
                yield templateService.apiHandler({
                    methodName: 'filtrarPorArea',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/curso/all', ...((0, runtime_1.fetchMiddlewares)(CursoController_1.CursoController)), ...((0, runtime_1.fetchMiddlewares)(CursoController_1.CursoController.prototype.listarCursos)), function CursoController_listarCursos(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new CursoController_1.CursoController();
                yield templateService.apiHandler({
                    methodName: 'listarCursos',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
