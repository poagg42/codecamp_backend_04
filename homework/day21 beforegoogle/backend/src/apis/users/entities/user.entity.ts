import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { Product } from 'src/apis/products/entities/product.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  _code: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  email: string;

  // @Column()
  // @Field(() => String)
  // phone: string;

  // @Column()
  // @Field(() => String)
  // region: string;

  // @Column()
  // @Field(() => String)
  // role: string;

  @Column()
  @Field(() => String)
  age: string;

  @Column()
  @Field(() => String)
  name: string;

  @JoinColumn()
  @ManyToMany(() => Product, (products) => products.id)
  products: Product[];

  @DeleteDateColumn()
  deletedAt: Date;
}
