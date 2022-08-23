import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from '../productimage/entities/productimage.entity';
import { ProductCategory } from '../productsCategories/entities/productCategory.entity';
import { ProductTag } from '../productsTags/entities/productsTag.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,

    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>, // 바꾼 부분
  ) {}

  findAll() {
    return this.productRepository.find({
      relations: ['productCategory', 'productTags'],
    });
  }

  findOne(productId) {
    this.productRepository.findOne({
      where: { id: productId },
      relations: ['productCategory', 'productTags'],
    });
  }

  async create({ createProductInput }) {
    // 1. 상품만 등록하는 경우
    // const result = this.productRepository.save({
    //   ...createProductInput,
    // 하나하나 직접 나열하는 방식
    // name: createProductInput.name,
    // description: createProductInput.description,
    // price: createProductInput.price,
    // });

    // 2. 상품과 상품거래위치를 같이 등록하는 경우
    const {
      productImage, //  바꾼 부분
      productSaleslocation,
      productCategory,
      productTags,
      ...product
    } = createProductInput;
    //  rest 파라미터를 이용해 두 번 저장
    const result = await this.productCategoryRepository.save({
      ...productSaleslocation, //스프레드 연산자
    });
    // productsTags // ['#전자 제품', "'영등포', '#컴퓨터
    const result2 = [];
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', '');

      const prevTag = this.productTagRepository.findOne({
        where: { name: tagname },
      });

      // 기존에 태그가 존재했다면
      if (prevTag) {
        result2.push(prevTag);

        // 기존에 태그가 없었다면
      } else {
        const newTag = await this.productTagRepository.save({
          name: tagname,
        });
        result2.push(newTag);
      }
    }
    const result3 = await this.productRepository.save({
      ...product,
      productImage: productImage,
      productSaleslocation: result, // result 통째로 넣기 vs id만 넣기
      productCategory: { name: productCategory },
      productTags: result2,
    });

    return result3;
  }

  async update({ productId, updateProductInput }) {
    //수정할 때만 사용
    // this.productRepository.update({ id: productId }, { ...updateProductInput });

    //수정후 결과값까지 받을 때 사용
    const myproduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    const result = this.productRepository.save({
      ...myproduct,
      id: productId,
      ...updateProductInput,
      // 위와 같은 save지만 다르게 작동한다.
    });
    return result;
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');

    // if (product.isSoldout) {
    //   throw new HttpException('이미 판매 완료된 상품입니다.', );
    // }
  }

  async delete({ productId }) {
    // 1. 실제 삭제
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. 소프트 삭제(직접 구현) -> isDeleted 삭제가 된 것처럼 보여주는 것
    // this.productRepository.update({ id: productId },{ isDeleted: true })  // 앞이 조건, 뒤가 수정할 내용

    // 3. 소프트 삭제(직접 구현) -> deletedAt (delete된 시간을 적기 시작함)
    // this.productRepository.update({id: productId}, {deletedAt: new Date() });
    // 시간이 저장 되어있으면 삭제, 아무 것도 없다(null)일 경우 삭제가 아니다
    // 하나의 컬럼으로 시간도 알 수 있고 삭제 유무도 알 수 있다.
    // 그러나 문제점 1) deletedAt 컬럼을 만들어줘야 한다.
    // 2) 삭제시 직접 update 로 newDate() 넣어줘야한다.
    // 3) 조회시 조건을 반드시 걸어야 한다. (deletedAt === null)

    // 4. 소프트 삭제(TypeORM 제공) -> softRemove 이걸로 삭제가 된 애들은 조회하면 안 나오는 것이 디폴트
    // 위의 3번이 자동으로
    //softRemove는 아이디로만 삭제가 가능하다.

    // this.productRepository.softRemove({ id: productId })

    // 5. 소프트 삭제(TypeORM 제공) -> softDelete 다른 것들로도 삭제 가능

    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
