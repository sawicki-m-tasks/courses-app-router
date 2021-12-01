import { ValueWithRequiredState } from '@models/common.models';
export declare class Course implements CourseModelWithRequiredState {
    title: ValueWithRequiredState<string>;
    description: ValueWithRequiredState<string>;
    duration: ValueWithRequiredState<number>;
    authors: ValueWithRequiredState<string[]>;
    filePath: string;
    constructor({ title, description, duration, authors, }: CourseModel, { titleRequired, descriptionRequired, durationRequired, authorsRequired, }?: {
        [key: string]: boolean;
    });
    get errorStates(): Promise<string[]>;
}
interface CourseModelWithRequiredState {
    title: ValueWithRequiredState<string>;
    description: ValueWithRequiredState<string>;
    duration: ValueWithRequiredState<number>;
    authors: ValueWithRequiredState<string[]>;
}
export interface CourseModel {
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
    id: string;
}
export {};
