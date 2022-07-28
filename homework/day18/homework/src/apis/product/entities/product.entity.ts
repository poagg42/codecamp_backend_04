import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Image } from 'src/apis/image/entities/image.entity';
import { ProductCategory } from 'src/apis/category/entities/category.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Payment } from 'src/apis/payment/entities/payment.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  _code: string;

  @Column()
  @Field(() => String)
  product_name: string;

  @Column()
  @Field(() => String)
  user_code: number;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => String)
  region: string;

  @Column()
  @Field(() => String)
  desc: string;

  @JoinColumn()
  @OneToOne(() => Image)
  @Field(() => Image)
  image: Image;

  @JoinColumn()
  @OneToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  category: ProductCategory;

  @JoinColumn()
  @ManyToOne(() => Payment)
  @Field(() => Payment)
  pay: Payment;

  @JoinTable()
  @ManyToMany(() => User, (users) => users.products)
  @Field(() => User)
  users: User[];
}
