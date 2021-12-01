import { ValueWithRequiredState } from '@models/common.models';
export interface UserModel {
    name: string;
    email: string;
    password: string;
    role: string;
}
export declare class User implements UserModelWithRequiredState {
    name: ValueWithRequiredState<string>;
    email: ValueWithRequiredState<string>;
    password: ValueWithRequiredState<string>;
    filePath: string;
    constructor({ name, email, password }: UserModel, { nameRequired, emailRequired, passwordRequired, }?: {
        [key: string]: boolean;
    });
    get errorStates(): Promise<string[]>;
}
interface UserModelWithRequiredState {
    name: ValueWithRequiredState<string>;
    email: ValueWithRequiredState<string>;
    password: ValueWithRequiredState<string>;
}
export {};
