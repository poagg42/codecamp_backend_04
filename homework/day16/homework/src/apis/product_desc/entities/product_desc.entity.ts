import { Product } from 'src/apis/product/entities/product.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product_desc {
  @PrimaryGeneratedColumn('uuid')
  desc_code: string;

  @JoinColumn()
  @OneToOne(() => Product)
  product;
}
