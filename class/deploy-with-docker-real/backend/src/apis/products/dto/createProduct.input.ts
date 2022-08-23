import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductsSaleslocationInput } from 'src/apis/productsSaleslocations/dto/productSaleslocation.input';
@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => ProductsSaleslocationInput)
  productSaleslocation: ProductsSaleslocationInput;

  @Field(() => String)
  productCategoryId: string;

  @Field(() => [String])
  productTags: string[];
}


// import { ProductSaleslocationInput } from 'src/apis/productsSaleslocations/dto/productsaleslocation.input';

//   @Field(() => ProductSaleslocationInput)
// productSaleslocation: ProductSaleslocationInput;
