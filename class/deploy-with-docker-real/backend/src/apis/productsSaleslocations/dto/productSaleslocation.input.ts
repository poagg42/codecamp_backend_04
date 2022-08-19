import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSaleslocation } from '../entities/productSaleslocation.entity';

@InputType()
export class ProductSaleslocationInput extends OmitType(
  ProductSaleslocation,
  ['id'],
  InputType,
) {}
// OmitType(클래스명 , 빼고싶은 컬럼, InputType)  objecttype을 inputtype으로 바꿔줘야 한다.
