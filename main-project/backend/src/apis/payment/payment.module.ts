import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/apis/users/entities/user.entity';
import { IamportService } from '../iamport/iamport.services';
import { Payment } from './entities/payment.entity';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment, //
      User,
    ]),
  ],

  providers: [
    PaymentResolver, //
    PaymentService,
    IamportService,
  ],
})
export class PaymentModule {}
