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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const common_models_1 = require("../models/common.models");
const decorators_1 = require("../helpers/decorators");
const authorization_guard_1 = require("../core/authorization.guard");
const core_module_config_1 = require("../core/core-module.config");
const models_1 = require("../../swagger/models");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(body) {
        return this.authService.login(body);
    }
    register(body) {
        return this.authService.register(body);
    }
    logout(token) {
        return this.authService.logout(token);
    }
};
__decorate([
    common_1.Post('login'),
    swagger_1.ApiBody({
        type: models_1.SwaggerUser,
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post('register'),
    swagger_1.ApiBody({
        type: models_1.SwaggerUser,
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthController.prototype, "register", null);
__decorate([
    common_1.Delete('logout'),
    swagger_1.ApiBasicAuth(core_module_config_1.METADATA_AUTHORIZED_KEY),
    decorators_1.Authorized(),
    __param(0, common_1.Headers(core_module_config_1.METADATA_AUTHORIZED_KEY)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    common_1.Controller(),
    swagger_1.ApiTags('Auth'),
    common_1.UseGuards(authorization_guard_1.AuthorizationGuard),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map