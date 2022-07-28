import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  _code: string;

  @Column()
  @Field(() => String)
  category_name: string;
}
