import { CustomDecorator } from '@nestjs/common';
export declare function Authorized(): CustomDecorator;
export declare function Roles(...roles: string[]): CustomDecorator;
export declare function ModelValidation<T, P extends {
    errorStates: Promise<string[]>;
}>(Model: {
    new (model: T, requiredFields: {
        [key: string]: boolean;
    }, filePath?: string): P;
}, requiredState?: {
    [key: string]: boolean;
}): MethodDecorator;
