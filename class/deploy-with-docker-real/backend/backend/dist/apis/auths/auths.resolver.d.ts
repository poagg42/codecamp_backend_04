import { UsersService } from '../users/users.service';
import { AuthsService } from './auths.service';
import { IContext } from 'src/commons/type/context';
export declare class AuthsResolver {
    private readonly usersService;
    private readonly authsService;
    constructor(usersService: UsersService, authsService: AuthsService);
    login(email: string, password: string, context: IContext): Promise<string>;
    restoreAccessToken(context: IContext): string;
}
