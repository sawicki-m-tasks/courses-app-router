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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_models_1 = require("../models/common.models");
const decorators_1 = require("../helpers/decorators");
const auth_models_1 = require("../auth/auth.models");
const authorization_guard_1 = require("../core/authorization.guard");
const core_module_config_1 = require("../core/core-module.config");
let UsersController = class UsersController {
    getAllAuthors(req) {
        return {
            successful: true,
            result: req.user,
        };
    }
};
__decorate([
    common_1.Get('me'),
    swagger_1.ApiBasicAuth(core_module_config_1.METADATA_AUTHORIZED_KEY),
    decorators_1.Authorized(),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "getAllAuthors", null);
UsersController = __decorate([
    common_1.Controller('users'),
    swagger_1.ApiTags('Users'),
    common_1.UseGuards(authorization_guard_1.AuthorizationGuard)
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map