import { InputType, OmitType } from '@nestjs/graphql';
import { ProductsSaleslocation } from '../productsSaleslocation.entity';

@InputType()
export class ProductsSaleslocationInput extends OmitType(
  ProductsSaleslocation,
  ['id'],
  InputType,
) {}
