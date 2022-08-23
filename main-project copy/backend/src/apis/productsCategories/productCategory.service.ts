import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/productCategory.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}
  create({ name }) {
    // DB에 카테고리 등록
    const result = this.productCategoryRepository.save({ name });
    console.log(result); // { id: qjfjqwdkj-qwlk12, name: 의류}
    return result;
  }
}
