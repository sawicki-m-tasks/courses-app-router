import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
export declare class AuthorizationGuard implements CanActivate {
    private reflector;
    private tokenService;
    constructor(reflector: Reflector, tokenService: TokenService);
    canActivate(context: ExecutionContext): boolean | Observable<boolean>;
}
