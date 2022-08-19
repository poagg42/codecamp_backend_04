import { ProductSaleslocationInput } from 'src/apis/productsSaleslocations/dto/productsaleslocation.input';
export declare class CreateProductInput {
    name: string;
    description: string;
    price: number;
    productSaleslocation: ProductSaleslocationInput;
    productCategoryId: string;
    productTags: string[];
}
