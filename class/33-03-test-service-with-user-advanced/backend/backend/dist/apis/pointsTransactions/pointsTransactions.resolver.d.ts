import { IContext } from 'src/commons/type/context';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointsTransactionsService } from './pointsTransactions.services';
export declare class PointsTransactionsResolver {
    private readonly pointsTransactionsService;
    constructor(pointsTransactionsService: PointsTransactionsService);
    createPointTransaction(impUid: string, amount: number, context: IContext): Promise<PointTransaction>;
}
