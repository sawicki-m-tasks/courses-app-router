import { SuccessfulRequest } from '@models/common.models';
import { User } from '@auth/auth.models';
export declare class UsersController {
    getAllAuthors(req: any): SuccessfulRequest<User>;
}
