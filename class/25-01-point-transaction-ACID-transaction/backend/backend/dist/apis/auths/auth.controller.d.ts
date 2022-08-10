import { UsersService } from '../users/users.service';
import { AuthsService } from './auths.service';
import { Request, Response } from 'express';
interface IOAuthUser {
    user: {
        email: string;
        hashedPassword: string;
        name: string;
        age: number;
    };
}
export declare class AuthsController {
    private readonly usersService;
    private readonly authsService;
    constructor(usersService: UsersService, authsService: AuthsService);
    loginGoogle(req: Request & IOAuthUser, res: Response): Promise<void>;
}
export {};
