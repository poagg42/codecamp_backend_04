import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  product_name: string;

  @Field(() => String)
  user_code: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => String)
  region: string;

  @Field(() => String)
  desc: string;
}
