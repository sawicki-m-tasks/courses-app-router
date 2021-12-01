import { Observable } from 'rxjs';
import { FailedRequest, SuccessfulRequest } from '@models/common.models';
import { UserModel } from './auth.models';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: UserModel): Observable<SuccessfulRequest<string> | FailedRequest>;
    register(body: UserModel): Observable<SuccessfulRequest<string> | FailedRequest>;
    logout(token: string): Observable<void | FailedRequest>;
}
