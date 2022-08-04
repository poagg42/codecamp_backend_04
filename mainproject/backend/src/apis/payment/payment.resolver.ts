import { UseGuards } from '@nestjs/common';
import { Mutation, Args, Int, Resolver, Context } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';


@Resolver()
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  createPayment(
    @Args('impUid') impUid: string,
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ) {
    const user = context.req.user;
    return this.paymentService.create({ impUid, amount, user });
  }
}
