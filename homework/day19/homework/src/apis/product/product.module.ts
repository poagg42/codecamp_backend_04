import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from '../category/entities/category.entity';
import { ProductTag } from '../productTag/entities/productTag.entity';
import { Product_desc } from '../product_desc/entities/product_desc.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductCategory,
      Product,
      Product_desc,
      ProductTag, //
    ]),
  ],
  providers: [
    ProductResolver, //
    ProductService,
  ],
})
export class ProductModule {}
