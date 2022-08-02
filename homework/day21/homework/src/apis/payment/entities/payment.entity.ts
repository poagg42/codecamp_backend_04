import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  _code: string;

  @Column()
  @Field(() => String)
  price: string;

  @Column()
  @Field(() => String)
  pay_log: string;
}
