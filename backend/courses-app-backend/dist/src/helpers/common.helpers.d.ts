export declare const bdMainPath: string;
export declare function isString(value: any): boolean;
export declare function isNumber(value: any): boolean;
export declare function getValuesFromModel<T, P>(model: T): P;
export declare function getValidityStateOfModel<T>(self: T): Promise<string[]>;
