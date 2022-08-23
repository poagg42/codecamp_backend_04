import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Payment } from 'src/apis/payment/entities/payment.entity';
import { ProductImage } from 'src/apis/productimage/entities/productimage.entity';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productsTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  OneToOne,
  JoinTable,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid') //mysql 용
  @Field(() => String) //graphql 용
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Payment)
  @Field(() => Payment)
  payment: Payment;

  @OneToOne(() => ProductImage)
  @Field(() => ProductImage)
  image: ProductImage;

  // @JoinColumn()
  // @OneToOne(() => ProductSaleslocation)
  // @Field(() => ProductSaleslocation)
  // productCategory: ProductSaleslocation;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  @Field(() => ProductTag)
  productTags: ProductTag[];
}
