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
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const common_models_1 = require("../models/common.models");
const decorators_1 = require("../helpers/decorators");
const authorization_guard_1 = require("../core/authorization.guard");
const core_module_config_1 = require("../core/core-module.config");
const role_guard_1 = require("../core/role.guard");
const models_1 = require("../../swagger/models");
const courses_service_1 = require("./courses.service");
let CoursesController = class CoursesController {
    constructor(coursesService) {
        this.coursesService = coursesService;
    }
    getAllCourses() {
        return this.coursesService.getAllCourses();
    }
    getFilteredCourses(queries = {}) {
        return this.coursesService.filterCourses(queries);
    }
    addCourse(body) {
        return this.coursesService.addCourse(body);
    }
    getSingelCourse(id) {
        return this.coursesService.getCourse(id);
    }
    editCourse(id, body) {
        return this.coursesService.editCourse(body, id);
    }
    deleteCourse(id) {
        return this.coursesService.deleteCourse(id);
    }
};
__decorate([
    common_1.Get('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], CoursesController.prototype, "getAllCourses", null);
__decorate([
    common_1.Get('filter'),
    swagger_1.ApiQuery({
        name: 'title',
        required: false,
        type: String,
        isArray: true,
        explode: false,
    }),
    swagger_1.ApiQuery({
        name: 'description',
        required: false,
        type: String,
        isArray: true,
        explode: false,
    }),
    swagger_1.ApiQuery({
        name: 'creationDate',
        required: false,
        type: String,
        isArray: true,
        explode: false,
    }),
    swagger_1.ApiQuery({
        name: 'creationDate',
        required: false,
        type: String,
        isArray: true,
        explode: false,
    }),
    swagger_1.ApiQuery({
        name: 'duration',
        required: false,
        type: String,
        isArray: true,
        explode: false,
    }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CoursesController.prototype, "getFilteredCourses", null);
__decorate([
    common_1.Post('add'),
    swagger_1.ApiBody({
        type: models_1.SwaggerCourse,
    }),
    swagger_1.ApiBasicAuth(core_module_config_1.METADATA_AUTHORIZED_KEY),
    decorators_1.Authorized(),
    decorators_1.Roles(core_module_config_1.UserRoles.admin),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CoursesController.prototype, "addCourse", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], CoursesController.prototype, "getSingelCourse", null);
__decorate([
    common_1.Put(':id'),
    swagger_1.ApiBody({
        type: models_1.SwaggerCourse,
    }),
    swagger_1.ApiBasicAuth(core_module_config_1.METADATA_AUTHORIZED_KEY),
    decorators_1.Authorized(),
    decorators_1.Roles(core_module_config_1.UserRoles.admin),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CoursesController.prototype, "editCourse", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiBasicAuth(core_module_config_1.METADATA_AUTHORIZED_KEY),
    decorators_1.Authorized(),
    decorators_1.Roles(core_module_config_1.UserRoles.admin),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], CoursesController.prototype, "deleteCourse", null);
CoursesController = __decorate([
    common_1.Controller('courses'),
    swagger_1.ApiTags('Courses'),
    common_1.UseGuards(authorization_guard_1.AuthorizationGuard, role_guard_1.RoleGuard),
    __metadata("design:paramtypes", [courses_service_1.CoursesService])
], CoursesController);
exports.CoursesController = CoursesController;
//# sourceMappingURL=courses.controller.js.map