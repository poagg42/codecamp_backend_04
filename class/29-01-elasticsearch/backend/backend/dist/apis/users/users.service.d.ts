import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    findOne({ email }: {
        email: any;
    }): Promise<User>;
    create({ email, hashedPassword: password, name, age }: {
        email: any;
        hashedPassword: any;
        name: any;
        age: any;
    }): Promise<{
        email: any;
        password: any;
        name: any;
        age: any;
    } & User>;
}
