import { Observable } from 'rxjs';
import { FailedRequest, ItemModel, SuccessfulRequest } from '@models/common.models';
import { AuthorModel } from './authors.models';
export declare class AuthorsService {
    private filesFolder;
    private readonly filePath;
    constructor(filesFolder: string);
    getAllAuthors(): Observable<SuccessfulRequest<ItemModel[] | string> | FailedRequest>;
    getAuthor(id: string): Observable<SuccessfulRequest<ItemModel | string> | FailedRequest>;
    addAuthor(author: AuthorModel): Observable<SuccessfulRequest<string | ItemModel> | FailedRequest>;
    editAuthor(author: AuthorModel, id: string): Observable<SuccessfulRequest<string> | FailedRequest>;
    deleteAuthor(id: string): Observable<SuccessfulRequest<string> | FailedRequest>;
}
