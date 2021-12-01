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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const common_models_1 = require("../models/common.models");
const decorators_1 = require("../helpers/decorators");
const authorization_guard_1 = require("../core/authorization.guard");
const core_module_config_1 = require("../core/core-module.config");
const role_guard_1 = require("../core/role.guard");
const models_1 = require("../../swagger/models");
const authors_service_1 = require("./authors.service");
let AuthorsController = class AuthorsController {
    constructor(authorsService) {
        this.authorsService = authorsService;
    }
    getAllAuthors() {
        return this.authorsService.getAllAuthors();
    }
    addAuthor(body) {
        return this.authorsService.addAuthor(body);
    }
    getSingleAuthor(id) {
        return this.authorsService.getAuthor(id);
    }
    editAuthor(id, body) {
        return this.authorsService.editAuthor(body, id);
    }
    deleteAuthor(id) {
        return this.authorsService.deleteAuthor(id);
    }
};
__decorate([
    common_1.Get('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthorsController.prototype, "getAllAuthors", null);
__decorate([
    common_1.Post('add'),
    swagger_1.ApiBody({
        type: models_1.SwaggerAuthor,
    }),
    swagger_1.ApiBasicAuth(core_module_config_1.METADATA_AUTHORIZED_KEY),
    decorators_1.Authorized(),
    decorators_1.Roles(core_module_config_1.UserRoles.admin),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthorsController.prototype, "addAuthor", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthorsController.prototype, "getSingleAuthor", null);
__decorate([
    common_1.Put(':id'),
    swagger_1.ApiBody({
        type: models_1.SwaggerAuthor,
    }),
    swagger_1.ApiBasicAuth(core_module_config_1.METADATA_AUTHORIZED_KEY),
    decorators_1.Authorized(),
    decorators_1.Roles(core_module_config_1.UserRoles.admin),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthorsController.prototype, "editAuthor", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiBasicAuth(core_module_config_1.METADATA_AUTHORIZED_KEY),
    decorators_1.Authorized(),
    decorators_1.Roles(core_module_config_1.UserRoles.admin),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthorsController.prototype, "deleteAuthor", null);
AuthorsController = __decorate([
    common_1.Controller('authors'),
    swagger_1.ApiTags('Authors'),
    common_1.UseGuards(authorization_guard_1.AuthorizationGuard, role_guard_1.RoleGuard),
    __metadata("design:paramtypes", [authors_service_1.AuthorsService])
], AuthorsController);
exports.AuthorsController = AuthorsController;
//# sourceMappingURL=authors.controller.js.map