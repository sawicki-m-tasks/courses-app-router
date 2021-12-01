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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
const core_module_config_1 = require("./core-module.config");
let TokenService = class TokenService {
    constructor(tokenConfig) {
        var _a;
        this.tokenConfig = tokenConfig;
        this.tokens = new Map();
        this.padding = crypto.constants.RSA_PKCS1_PSS_PADDING;
        this.tokenTimeLiving = (_a = this.tokenConfig.timeLiving) !== null && _a !== void 0 ? _a : 60;
    }
    sign(data) {
        const stringifiedData = JSON.stringify(data);
        const base64Data = Buffer.from(stringifiedData);
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            },
        });
        let signature;
        if (crypto.sign) {
            signature = crypto.sign(this.tokenConfig.algorithm, base64Data, {
                key: privateKey,
                padding: this.padding,
            });
        }
        else {
            const signer = crypto.createSign(this.tokenConfig.algorithm);
            signer.update(base64Data);
            signer.end();
            signature = signer.sign(privateKey);
        }
        const base64Signature = signature.toString('base64');
        this.tokens.set(base64Signature, {
            stringifiedData,
            publicKey,
            privateKey,
            creationDate: Date.now(),
        });
        return base64Signature;
    }
    verify(base64Signature, cb) {
        const result = {
            error: null,
            user: null,
        };
        if (!this.tokens.has(base64Signature)) {
            result.error = {
                message: 'Invalid token.',
            };
            cb(result);
            return;
        }
        const signature = Buffer.from(base64Signature, 'base64');
        const { publicKey, stringifiedData, creationDate } = this.tokens.get(base64Signature);
        const timePassed = Date.now() - creationDate;
        if (timePassed >= this.tokenTimeLiving) {
            this.destroy(base64Signature);
            result.error = {
                message: 'Token expired.',
            };
            cb(result);
            return;
        }
        let isVerified;
        if (crypto.verify) {
            isVerified = crypto.verify(this.tokenConfig.algorithm, Buffer.from(stringifiedData), {
                key: publicKey,
                padding: this.padding,
            }, signature);
        }
        else {
            const verifier = crypto.createVerify(this.tokenConfig.algorithm);
            verifier.update(Buffer.from(stringifiedData));
            verifier.end();
            isVerified = verifier.verify(publicKey, signature);
        }
        if (isVerified) {
            result.user = JSON.parse(stringifiedData);
        }
        else {
            result.error = {
                message: 'Invalid token.',
            };
        }
        cb(result);
    }
    destroy(base64Signature) {
        this.tokens.delete(base64Signature);
    }
};
TokenService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(core_module_config_1.TOKEN_CONFIG)),
    __metadata("design:paramtypes", [Object])
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map