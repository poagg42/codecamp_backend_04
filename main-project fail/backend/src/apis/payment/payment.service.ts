import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/apis/users/entities/user.entity';
import { Payment, PAYMENT_STATUS_ENUM } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly dataSource: DataSource,
  ) {}

  // async findAll() {
  //   const queryRunner = await this.connection.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction('SERIALIZABLE');
  //   try {
  //     // 조회시 락을 걸고 조회함으로써, 다른 쿼리에서 조회 못하게 막음(대기시킴) => Select ~ For Update
  //     const payment = await queryRunner.manager.find(Payment, {
  //       lock: { mode: 'pessimistic_write' },
  //     });
  //     console.log(payment);

  //     // 처리에 5초간의 시간이 걸림을 가정!!
  //     setTimeout(async () => {
  //       await queryRunner.commitTransaction();
  //     }, 5000);
  //     return payment;

  //     //   await queryRunner.commitTransaction()const payment = await queryRunner.manager.find(Payment);;
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //   }}

  async create({ impUid, amount, user: _user }) {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();

    // ============== transaction 시작!! ==============
    await queryRunner.startTransaction('SERIALIZABLE');
    console.log('1');
    // ===============================================

    try {
      // 1. payment 테이블에 거래기록 1줄 생성
      const payment = this.paymentRepository.create({
        impUid: impUid,
        amount: amount,
        user: _user,
        status: PAYMENT_STATUS_ENUM.PAYMENT,
      });
      console.log(payment);
      // console.log('1');
      // await this.paymentRepository.save(payment);
      await queryRunner.manager.save(payment);

      // 2. 유저의 돈 찾아오기
      // const user = await this.usersRepository.findOne({
      //   where: { _code: _user._code },
      // });
      console.log('2');
      const user = await queryRunner.manager.findOne(User, {
        where: { _code: _user._code },
        lock: { mode: 'pessimistic_write' },
      });
      console.log('3');

      // console.log('2');
      // console.log(user);
      // 3. 유저의 돈 업데이트
      // await this.usersRepository.update(
      //   { _code: _user._code },
      //   { point: user.point + amount },
      // );
      const updatedUser = this.usersRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser);
      // ============== commit 성공 확정!!! ==============
      await queryRunner.commitTransaction();
      console.log('4');
      // ===============================================
      // 4. 최종결과 프론트엔드에 돌려주기
      return payment;
    } catch (error) {
      // ============== rollback 되돌리기!!! ==============
      await queryRunner.rollbackTransaction();
      // ===============================================
    } finally {
      // ============== 연결 해제!!! ==============
      await queryRunner.release();
      console.log('5');
      // ========================================
    }
  }

  async cancel({ impUid, amount, user: _user }) {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();

    // ============== transaction 시작!! ==============
    await queryRunner.startTransaction('SERIALIZABLE');

    // ===============================================
    try {
      // 1. payment 테이블에 거래기록 1줄 생성
      const payment2 = this.paymentRepository.create({
        impUid: impUid,
        amount: -amount,
        user: _user,
        status: PAYMENT_STATUS_ENUM.CANCEL,
      });

      // await this.paymentRepository.save(payment2);
      await queryRunner.manager.save(payment2);

      // 2. 유저의 돈 찾아오기
      // const user = await this.usersRepository.findOne({
      //   where: { _code: _user._code },
      // });
      const user = await queryRunner.manager.findOne(User, {
        where: { _code: _user._code },
        lock: { mode: 'pessimistic_write' },
      });

      //3. 유저의 돈 업데이트

      // await this.usersRepository.update(
      //   { _code: _user._code },
      //   { point: user.point - amount },
      // );

      const updatedUser = this.usersRepository.create({
        ...user,
        point: user.point - amount,
      });
      await queryRunner.manager.save(updatedUser);

      // ============== commit 성공 확정!!! ==============
      await queryRunner.commitTransaction();

      // ===============================================

      return payment2;
    } catch (error) {
      // ============== rollback 되돌리기!!! ==============
      await queryRunner.rollbackTransaction();

      // ===============================================
    } finally {
      // ============== 연결 해제!!! ==============
      await queryRunner.release();
      // ========================================
    }
  }

  async check({ impUid }) {
    const uid = await this.paymentRepository.findOne({ where: { impUid } });
    if (uid) {
      throw new ConflictException('이미 결제된 건입니다.');
    }
    // else if (uid.impUid !== impUid) {
    //   throw new UnprocessableEntityException('바르지 않은 impUid입니다.');
    // }
  }

  async refundCheck({ impUid }) {
    const cuid = await this.paymentRepository.findOne({
      where: { impUid },
      order: { id: 'DESC' },
    });
    console.log(cuid);
    if (cuid.status === PAYMENT_STATUS_ENUM.CANCEL) {
      throw new UnprocessableEntityException('이미 취소된 건입니다.');
    }
  }

  // async findAll() {
  //   const queryRunner = await this.connection.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction('READ COMMITTED');
  //   try {
  //     // 조회시 락을 걸고 조회함으로써, 다른 쿼리에서 조회 못하게 막음(대기시킴) => Select ~ For Update
  //     const payment = await queryRunner.manager.find(Payment, {
  //       lock: { mode: 'pessimistic_write' },
  //     });
  //     console.log(payment);

  //     // 처리에 5초간의 시간이 걸림을 가정!!

  //     setTimeout(async () => {
  //       await queryRunner.commitTransaction();
  //     }, 5000);

  //     return payment;
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //   }
  // }
}
