import { Observable } from 'rxjs';
import { FailedRequest, ItemModel, SuccessfulRequest } from '@models/common.models';
export declare function getAllItems(filePath: string): Observable<SuccessfulRequest<ItemModel[] | string> | FailedRequest>;
export declare function getItem(id: string, filePath: string): Observable<SuccessfulRequest<ItemModel | string> | FailedRequest>;
export declare function addItem(item: ItemModel, filePath: string): Observable<SuccessfulRequest<string | ItemModel> | FailedRequest>;
export declare function editItem(item: ItemModel, id: string, filePath: string): Observable<SuccessfulRequest<string> | FailedRequest>;
export declare function deleteItem(id: string, filePath: string): Observable<SuccessfulRequest<string> | FailedRequest>;
export declare function areAllItemsExist(ids: string[], filePath: string, property: string, reverse?: boolean): Promise<boolean>;
