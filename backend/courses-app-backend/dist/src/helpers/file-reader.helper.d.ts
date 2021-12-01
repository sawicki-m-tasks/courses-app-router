import { Observable } from 'rxjs';
import { FailedRequest, QueryParams, SuccessfulRequest } from '@models/common.models';
import { ObjectInfo, Position } from '@models/file-processing.models';
declare class JsonReader {
    getWholeJson<T>(path: string): Observable<SuccessfulRequest<T[] | string> | FailedRequest>;
    areAllItemsExistByProperty(items: string[], path: string, property: string): Observable<boolean>;
    getObjectByObject<T>(path: string): Observable<ObjectInfo<T> | FailedRequest>;
    getSingleObject<T>(path: string, queries: QueryParams): Observable<SuccessfulRequest<T | string> | FailedRequest>;
    getAllObjectsByQueries<T>(path: string, queries: any): Observable<SuccessfulRequest<T[] | string> | FailedRequest>;
    getLastCharacterPosition(path: string): Observable<Position | FailedRequest>;
}
export declare const jsonReader: JsonReader;
export {};
