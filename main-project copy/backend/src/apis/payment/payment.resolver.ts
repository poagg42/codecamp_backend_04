import {
  Query,
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Mutation, Args, Int, Resolver, Context } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';
import { IamportService } from '../iamport/iamport.services';

@Resolver()
export class PaymentResolver {
  constructor(
    private readonly paymentService: PaymentService, // // private readonly iamportService: IamportService,
    private readonly iamportService: IamportService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async createPayment(
    @Args('impUid') impUid: string,
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ) {
    const user = context.req.user;
    const Token = await this.iamportService.setNewToken();
    const Data = await this.iamportService.getPaymentData({ impUid, Token });
    const checkData = await this.paymentService.check({ impUid });
    // console.log('22222', Token);
    // console.log('33333', Data);
    // console.log('44444', checkData);

    //에러 처리
    // Data.data.amount or imp_uid or merchant_uid

    //결제 검증하기

    return this.paymentService.create({ impUid, amount, user });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Payment)
  async cancelPayment(
    @Args('impUid') impUid: string,
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ) {
    // try {
    const user = context.req.user;
    const Token = await this.iamportService.setNewToken();
    const cancelData = await this.iamportService.getCancelData({
      imp_uid: impUid,
      Token,
      amount,
    });

    const checkRefund = await this.paymentService.refundCheck({ impUid });

    console.log('55555', Token);
    // console.log('66666', cancelData.request); // 여기까지 해서 amount -100 된다.

    return this.paymentService.cancel({ impUid, amount, user });
    // } catch {
    //   throw new UnprocessableEntityException('예외!!!');
    // }
  }
}
