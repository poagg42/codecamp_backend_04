import { Product } from 'src/apis/products/entities/product.entity';
import { Column, PrimaryGeneratedColumn, Entity, ManyToMany } from 'typeorm'

@Entity()
export class ProductTag {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => Product, (products) => products.productTags)
    products: Product[]
}