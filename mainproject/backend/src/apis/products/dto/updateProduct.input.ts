import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './createProduct.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  // @Field(() => String)
  // qqq: string
}

// PickType(CreateProductInput, ["name", "price"])
// OmitType(CreateProductInput, ["description"]) 유틸리티 타입들
