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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const common_models_1 = require("../models/common.models");
const decorators_1 = require("../helpers/decorators");
const file_reader_helper_1 = require("../helpers/file-reader.helper");
const file_writer_helper_1 = require("../helpers/file-writer.helper");
const core_module_config_1 = require("../core/core-module.config");
const token_helpers_1 = require("../core/token.helpers");
const token_service_1 = require("../core/token.service");
const auth_models_1 = require("./auth.models");
let AuthService = class AuthService {
    constructor(tokenService, filesFolder) {
        this.tokenService = tokenService;
        this.filesFolder = filesFolder;
        this.filePath = path.join(this.filesFolder, 'users.json');
    }
    login(user) {
        return file_reader_helper_1.jsonReader
            .getSingleObject(this.filePath, user)
            .pipe(operators_1.map((user) => {
            if (user.result) {
                const accessToken = this.tokenService.sign(user.result);
                return {
                    successful: true,
                    result: 'Bearer ' + accessToken,
                    user: {
                        email: user.result.email,
                        name: user.result.name,
                    },
                };
            }
            throw new common_1.HttpException({ successful: false, result: 'Invalid data.' }, common_1.HttpStatus.BAD_REQUEST);
        }), operators_1.catchError((err) => {
            if (err.message === 'Error during file reading.') {
                throw new common_1.HttpException({ successful: false, result: 'Invalid data.' }, common_1.HttpStatus.BAD_REQUEST);
            }
            return rxjs_1.throwError(err);
        }));
    }
    register(user) {
        const userWithRole = Object.assign(Object.assign({}, user), { role: core_module_config_1.UserRoles.user });
        return file_writer_helper_1.jsonWriter.addObject(this.filePath, userWithRole).pipe(operators_1.map((result) => (Object.assign(Object.assign({}, result), { result: 'User was created.' }))), operators_1.catchError((err) => {
            if (err.message === 'Error during file reading.') {
                return file_writer_helper_1.jsonWriter
                    .createJSON(this.filePath, userWithRole)
                    .pipe(operators_1.map((result) => (Object.assign(Object.assign({}, result), { result: 'User was created.' }))), operators_1.catchError((err) => rxjs_1.of(err)));
            }
            return rxjs_1.of(err);
        }));
    }
    logout(tokenWithBearer) {
        const token = token_helpers_1.getTokenWithoutBearer(tokenWithBearer);
        this.tokenService.destroy(token);
        return rxjs_1.of(null);
    }
};
__decorate([
    decorators_1.ModelValidation(auth_models_1.User),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthService.prototype, "login", null);
__decorate([
    decorators_1.ModelValidation(auth_models_1.User, {
        nameRequired: true,
        emailRequired: true,
        passwordRequired: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthService.prototype, "register", null);
AuthService = __decorate([
    common_1.Injectable(),
    __param(1, common_1.Inject(core_module_config_1.FILES_FOLDER)),
    __metadata("design:paramtypes", [token_service_1.TokenService, String])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map