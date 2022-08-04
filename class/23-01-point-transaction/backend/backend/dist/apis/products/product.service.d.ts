import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productSaleslocation.entity';
import { ProductTag } from '../productsTags/entities/productsTag.entity';
import { Product } from './entities/product.entity';
export declare class ProductService {
    private readonly productRepository;
    private readonly productSaleslocationRepository;
    private readonly productTagRepository;
    constructor(productRepository: Repository<Product>, productSaleslocationRepository: Repository<ProductSaleslocation>, productTagRepository: Repository<ProductTag>);
    findAll(): Promise<Product[]>;
    findOne(productId: any): void;
    create({ createProductInput }: {
        createProductInput: any;
    }): Promise<any>;
    update({ productId, updateProductInput }: {
        productId: any;
        updateProductInput: any;
    }): Promise<any>;
    checkSoldout({ productId }: {
        productId: any;
    }): Promise<void>;
    delete({ productId }: {
        productId: any;
    }): Promise<boolean>;
}
