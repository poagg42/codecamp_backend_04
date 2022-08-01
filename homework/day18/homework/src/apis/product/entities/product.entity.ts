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

  @Column({ default: false }) //isDeleted로 softDelete를 한다.
  @Field(() => Boolean) // 처음에는 삭제가 되지 않은 상태이므로 기본값을 isDeleted가 false로 나타나게 한다.
  isDeleted: boolean; // 삭제 요청 시, 데이터를 완전히 삭제하는 것이 아닌 isDeleted가 true로 update되게 API를 만들자.

  @Column({ nullable: true }) // true일 경우 deletedAt의 데이터가 있는 경우(삭제된 날짜 데이터)
  @Field(() => Date) // false일 경우 deletedAt의 데이터인 날짜가 없는 null 상태
  deletedAt: Date;

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
