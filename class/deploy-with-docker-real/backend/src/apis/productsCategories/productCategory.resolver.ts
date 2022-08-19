import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCategoryService } from './productCategory.service';
import { ProductCategory } from './entities/productCategory.entity';

@Resolver()
export class ProductCategoryResolver {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}
  @Mutation(() => ProductCategory)
  createProductCategory(
    @Args('name') name: string, //
  ) {
    return this.productCategoryService.create({ name });
  }
}
