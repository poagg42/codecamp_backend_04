import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService, //
    private readonly elasticsearchService: ElasticsearchService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => [Product])
  async fetchProducts(@Args('search') search: string) {
    const mycache = this.cacheManager.get('search');
    const pull = this.cacheManager.set('search', '');
    const result = this.elasticsearchService.search({
      index: 'myproduct',
      query: {
        match_all: {},
      },
    });
    console.log(JSON.stringify(result, null, ' '));

    if (mycache) return mycache; // 1. Redis에 해당 검색어에 대한 검색 결과가 캐시 되어있는지 확인합니다. 2. 있으면 캐시되어있는 결과를 클라이언트에 반환합니다.

    this.elasticsearchService.search({
      index: 'myproduct', // 3. 없다면 ElasticSearch에서 해당 검색어를 검색합니다.
      query: {
        match_all: {},
      },
    });

    this.cacheManager.set('search', '');

    return this.productService.findOne([Product]);
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
    this.elasticsearchService.create({
      id: 'myid',
      index: 'myproduct',
      document: {
        ...createProductInput,
      },
    });
    // return this.productService.create({ createProductInput }); 엘라스틱서치에서 등록해보기위해 임시로 주석
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

// DNA 일대일 대칭를 하기 위해

// 카페 등등 안에 부하분산기<Load Valanert> -> 다른 곳에서의 접속 줄임
