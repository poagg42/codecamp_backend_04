import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Product } from 'src/apis/product/entities/product.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_code: string;

  @Column()
  id: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  region: string;

  @Column()
  role: string;

  @ManyToMany(() => Product, (products) => products.users)
  products: Product[];
}
