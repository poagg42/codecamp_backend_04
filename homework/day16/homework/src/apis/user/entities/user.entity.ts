import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { Product } from 'src/apis/product/entities/product.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  _code: string;

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

  @JoinColumn()
  @ManyToMany(() => Product, (products) => products.user_code)
  products: Product[];
}
