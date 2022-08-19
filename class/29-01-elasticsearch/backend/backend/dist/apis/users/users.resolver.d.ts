import { User } from './entities/user.entity';
import { UsersService } from './users.service';
export declare class UserResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    fetchUser(context: any): string;
    createUser(email: string, password: string, name: string, age: number): Promise<{
        email: any;
        password: any;
        name: any;
        age: any;
    } & User>;
}
