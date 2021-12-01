"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const common_1 = require("@nestjs/common");
const core_module_config_1 = require("./core-module.config");
const token_service_1 = require("./token.service");
let CoreModule = CoreModule_1 = class CoreModule {
    static forRoot({ algorithm, timeLiving, filesFolder, }) {
        const filesFolderProvider = {
            provide: core_module_config_1.FILES_FOLDER,
            useValue: filesFolder,
        };
        return {
            module: CoreModule_1,
            providers: [
                token_service_1.TokenService,
                {
                    provide: core_module_config_1.TOKEN_CONFIG,
                    useValue: {
                        algorithm,
                        timeLiving: timeLiving * 1000,
                    },
                },
                filesFolderProvider,
            ],
            exports: [token_service_1.TokenService, filesFolderProvider],
        };
    }
};
CoreModule = CoreModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], CoreModule);
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map