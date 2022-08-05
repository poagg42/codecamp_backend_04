import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/apis/users/entities/user.entity';
import { Payment, PAYMENT_STATUS_ENUM } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create({ impUid, amount, user: _user }) {
    // 1. payment 테이블에 거래기록 1줄 생성
    const payment = this.paymentRepository.create({
      impUid: impUid,
      amount: amount,
      user: _user,
      status: PAYMENT_STATUS_ENUM.PAYMENT,
    });
    console.log(payment);
    console.log('1');
    await this.paymentRepository.save(payment);

    // 2. 유저의 돈 찾아오기
    const user = await this.usersRepository.findOne({
      where: { _code: _user._code },
    });
    console.log('2');
    console.log(user);
    // 3. 유저의 돈 업데이트
    await this.usersRepository.update(
      { _code: _user._code },
      { point: user.point + amount },
    );
    console.log('3');
    // 4. 최종결과 프론트엔드에 돌려주기
    return payment;
  }
}
