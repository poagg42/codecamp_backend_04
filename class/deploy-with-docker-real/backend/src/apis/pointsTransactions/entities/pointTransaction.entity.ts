import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum POINT_TRANSACTION_STATUS_ENUM { // 실제 ENUM은 이거고
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}

registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
  // 이것은 graphql에 등록하기 위해
  name: 'POINT_TRANSACTION_STATUS_ENUM',
});

POINT_TRANSACTION_STATUS_ENUM.PAYMENT;

@Entity()
@ObjectType()
export class PointTransaction {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ default: true })
  @Field(() => String)
  impUid: string;

  @Column({ default: true })
  @Field(() => Int)
  amount: number;

  @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM })
  @Field(() => POINT_TRANSACTION_STATUS_ENUM)
  status: string;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}
