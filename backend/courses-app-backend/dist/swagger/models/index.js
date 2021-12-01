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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerAuthor = exports.SwaggerUser = exports.SwaggerCourse = void 0;
const swagger_1 = require("@nestjs/swagger");
class SwaggerCourse {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], SwaggerCourse.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], SwaggerCourse.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], SwaggerCourse.prototype, "duration", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Array)
], SwaggerCourse.prototype, "authors", void 0);
exports.SwaggerCourse = SwaggerCourse;
class SwaggerUser {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], SwaggerUser.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], SwaggerUser.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], SwaggerUser.prototype, "password", void 0);
exports.SwaggerUser = SwaggerUser;
class SwaggerAuthor {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], SwaggerAuthor.prototype, "name", void 0);
exports.SwaggerAuthor = SwaggerAuthor;
//# sourceMappingURL=index.js.map