import { CoreModuleConfig } from './core-module.config';
import { TokenVerificationResult } from './token.models';
export declare class TokenService {
    private tokenConfig;
    private tokens;
    private padding;
    private tokenTimeLiving;
    constructor(tokenConfig: CoreModuleConfig);
    sign(data: {
        [key: string]: any;
    }): string;
    verify<T>(base64Signature: string, cb: (result: TokenVerificationResult<T>) => void): void;
    destroy(base64Signature: string): void;
}
