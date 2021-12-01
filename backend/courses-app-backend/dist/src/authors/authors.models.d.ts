import { ValueWithRequiredState } from '@models/common.models';
export declare class Author implements AuthorModelWithRequiredState {
    name: ValueWithRequiredState<string>;
    constructor({ name }: AuthorModel);
    get errorStates(): Promise<string[]>;
}
interface AuthorModelWithRequiredState {
    name: ValueWithRequiredState<string>;
}
export interface AuthorModel {
    name: string;
    id: string;
}
export {};
