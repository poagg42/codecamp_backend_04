import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from '../productimage/entities/productimage.entity';
import { ProductCategory } from '../productsCategories/entities/productCategory.entity';
import { ProductTag } from '../productsTags/entities/productsTag.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductCategory,
      ProductTag,
      ProductImage,
    ]),
  ],
  providers: [
    ProductResolver, //
    ProductService,
  ],
})
export class ProductModule {}
