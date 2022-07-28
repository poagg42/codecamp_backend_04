import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/product/entities/product.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Product_desc {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  desc_code: string;

  @JoinColumn()
  @OneToOne(() => Product)
  @Field(() => Product)
  product: Product;
}
