import { Observable } from 'rxjs';
import { FailedRequest, SuccessfulRequest } from '@models/common.models';
import { TokenService } from '@core/token.service';
import { UserModel } from './auth.models';
export declare class AuthService {
    private tokenService;
    private filesFolder;
    private readonly filePath;
    constructor(tokenService: TokenService, filesFolder: string);
    login(user: UserModel): Observable<SuccessfulRequest<string> | FailedRequest>;
    register(user: UserModel): Observable<SuccessfulRequest<string> | FailedRequest>;
    logout(tokenWithBearer: string): Observable<void>;
}
