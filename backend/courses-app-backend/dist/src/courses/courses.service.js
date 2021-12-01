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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const common_models_1 = require("../models/common.models");
const decorators_1 = require("../helpers/decorators");
const file_reader_helper_1 = require("../helpers/file-reader.helper");
const items_helpers_1 = require("../helpers/items.helpers");
const core_module_config_1 = require("../core/core-module.config");
const courses_models_1 = require("./courses.models");
let CoursesService = class CoursesService {
    constructor(filesFolder) {
        this.filesFolder = filesFolder;
        this.filePath = path.join(this.filesFolder, 'courses.json');
    }
    getAllCourses() {
        return items_helpers_1.getAllItems(this.filePath);
    }
    getCourse(id) {
        return items_helpers_1.getItem(id, this.filePath);
    }
    filterCourses(queries) {
        return file_reader_helper_1.jsonReader
            .getAllObjectsByQueries(this.filePath, queries)
            .pipe(operators_1.catchError((err) => {
            if (err.message === 'Error during file reading.') {
                return rxjs_1.of({
                    successful: true,
                    result: [],
                });
            }
            return rxjs_1.of(err);
        }));
    }
    addCourse(course) {
        const courseWithCreationDate = Object.assign(Object.assign({}, course), { creationDate: new Date().toLocaleDateString('en-GB') });
        return items_helpers_1.addItem(courseWithCreationDate, this.filePath);
    }
    editCourse(course, id) {
        return items_helpers_1.editItem(course, id, this.filePath);
    }
    deleteCourse(id) {
        return items_helpers_1.deleteItem(id, this.filePath);
    }
};
__decorate([
    decorators_1.ModelValidation(courses_models_1.Course),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesService.prototype, "addCourse", null);
__decorate([
    decorators_1.ModelValidation(courses_models_1.Course, {
        titleRequired: false,
        descriptionRequired: false,
        durationRequired: false,
        authorsRequired: false,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", rxjs_1.Observable)
], CoursesService.prototype, "editCourse", null);
CoursesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(core_module_config_1.FILES_FOLDER)),
    __metadata("design:paramtypes", [String])
], CoursesService);
exports.CoursesService = CoursesService;
//# sourceMappingURL=courses.service.js.map