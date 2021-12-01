import { Observable } from 'rxjs';
import { FailedRequest, ItemModel, SuccessfulRequest } from '@models/common.models';
import { AuthorModel } from './authors.models';
import { AuthorsService } from './authors.service';
export declare class AuthorsController {
    private authorsService;
    constructor(authorsService: AuthorsService);
    getAllAuthors(): Observable<SuccessfulRequest<ItemModel[] | string> | FailedRequest>;
    addAuthor(body: AuthorModel): Observable<SuccessfulRequest<string | ItemModel> | FailedRequest>;
    getSingleAuthor(id: string): Observable<SuccessfulRequest<ItemModel | string> | FailedRequest>;
    editAuthor(id: string, body: AuthorModel): Observable<SuccessfulRequest<string> | FailedRequest>;
    deleteAuthor(id: string): Observable<SuccessfulRequest<string> | FailedRequest>;
}
