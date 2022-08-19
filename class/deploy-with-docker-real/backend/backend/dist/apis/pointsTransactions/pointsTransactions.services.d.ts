import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { PointTransaction } from './entities/pointTransaction.entity';
export declare class PointsTransactionsService {
    private readonly pointsTransactionsRepository;
    private readonly usersRepository;
    constructor(pointsTransactionsRepository: Repository<PointTransaction>, usersRepository: Repository<User>);
    create({ impUid, amount, user: _user }: {
        impUid: any;
        amount: any;
        user: any;
    }): Promise<PointTransaction>;
}
