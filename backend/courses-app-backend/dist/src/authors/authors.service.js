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
exports.AuthorsService = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const rxjs_1 = require("rxjs");
const common_models_1 = require("../models/common.models");
const decorators_1 = require("../helpers/decorators");
const items_helpers_1 = require("../helpers/items.helpers");
const core_module_config_1 = require("../core/core-module.config");
const authors_models_1 = require("./authors.models");
let AuthorsService = class AuthorsService {
    constructor(filesFolder) {
        this.filesFolder = filesFolder;
        this.filePath = path.join(this.filesFolder, 'authors.json');
    }
    getAllAuthors() {
        return items_helpers_1.getAllItems(this.filePath);
    }
    getAuthor(id) {
        return items_helpers_1.getItem(id, this.filePath);
    }
    addAuthor(author) {
        return items_helpers_1.addItem(author, this.filePath);
    }
    editAuthor(author, id) {
        return items_helpers_1.editItem(author, id, this.filePath);
    }
    deleteAuthor(id) {
        return items_helpers_1.deleteItem(id, this.filePath);
    }
};
__decorate([
    decorators_1.ModelValidation(authors_models_1.Author),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthorsService.prototype, "addAuthor", null);
__decorate([
    decorators_1.ModelValidation(authors_models_1.Author),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthorsService.prototype, "editAuthor", null);
AuthorsService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(core_module_config_1.FILES_FOLDER)),
    __metadata("design:paramtypes", [String])
], AuthorsService);
exports.AuthorsService = AuthorsService;
//# sourceMappingURL=authors.service.js.map