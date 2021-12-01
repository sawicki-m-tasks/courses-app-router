import { Observable } from 'rxjs';
import { FailedRequest, SuccessfulRequest } from '@models/common.models';
declare class JsonWriter {
    addObject<T>(path: string, data: T): Observable<SuccessfulRequest<string | T> | FailedRequest>;
    deleteObject<T extends {
        id: string;
    }>(path: string, id: string): Observable<SuccessfulRequest<string> | FailedRequest>;
    editObject<T extends {
        id: string;
    }>(path: string, data: T, id: string): Observable<SuccessfulRequest<string> | FailedRequest>;
    private writeToFile;
    private deleteFile;
    private renameFile;
    private _editObject;
    private _addObject;
    createJSON<T>(path: string, data: T): Observable<SuccessfulRequest<string | T> | FailedRequest>;
}
export declare const jsonWriter: JsonWriter;
export {};
