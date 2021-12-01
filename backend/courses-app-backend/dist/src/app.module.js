"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const common_helpers_1 = require("./helpers/common.helpers");
const core_module_1 = require("./core/core.module");
const auth_module_1 = require("./auth/auth.module");
const authors_module_1 = require("./authors/authors.module");
const courses_module_1 = require("./courses/courses.module");
const users_module_1 = require("./users/users.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            core_module_1.CoreModule.forRoot({
                algorithm: 'sha256',
                timeLiving: 3600 * 24,
                filesFolder: common_helpers_1.bdMainPath,
            }),
            auth_module_1.AuthModule,
            courses_module_1.CoursesModule,
            authors_module_1.AuthorsModule,
            users_module_1.UsersModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map