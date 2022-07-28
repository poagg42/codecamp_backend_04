import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product_desc } from '../product_desc/entities/product_desc.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Product_desc, //
    ]),
  ],
  providers: [
    ProductResolver, //
    ProductService,
  ],
})
export class ProductModule {}
