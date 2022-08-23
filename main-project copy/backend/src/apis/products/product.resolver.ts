import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService, //
    private readonly elasticsearchService: ElasticsearchService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => [Product])
  async fetchProducts(
    @Args('search') search: string, // string 타입의 매개변수를 받고
  ) {
    // 1. 레디스에 캐시되어 있는지 확인하기

    // 2. 레디스에 캐시가 되어있지 않다면, 엘라스틱서치에서 조회하기(유저가 검색한 검색어로 조회하기)

    // redis에 없다면 elasticsearch에서 검색
    const result = await this.elasticsearchService.search({
      index: 'myproduct04',
      query: {
        match: { name: search },
      },
    });
    console.log(JSON.stringify(result, null, ' '));

    // elasticsearch에서 조회한 결과를 redis에 저장한다.
    // await this.cacheManager.set('aaa', search, {
    //   ttl: 0,
    // });

    // 4. 최종 결과 브라우저에 리턴해주기
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput, //
  ) {
    // elasticsearch에 등록하기 연습!!
    // this.elasticsearchService.create({
    //   id: 'myid',
    //   index: 'myproduct04',
    //   document: {
    //     ...createProductInput,
    //   },
    // });
    return this.productService.create({ createProductInput });
  }
  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 판매 완료가 되었는지 확인해보기
    await this.productService.checkSoldout({ productId });
    // 수정하기
    return this.productService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(@Args('productID') productId: string) {
    return this.productService.delete({ productId });
  }
}
