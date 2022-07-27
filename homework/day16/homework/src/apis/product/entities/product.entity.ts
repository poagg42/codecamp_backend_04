import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Image } from 'src/apis/image/entities/image.entity';
import { Category } from 'src/apis/category/entities/category.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Payment } from 'src/apis/payment/entities/payment.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  _code: string;

  @Column()
  product_name: string;

  @Column()
  user_code: number;

  @Column()
  price: number;

  @Column()
  region: string;

  @Column()
  desc: string;

  @JoinColumn()
  @OneToOne(() => Image)
  image: Image;

  @JoinColumn()
  @OneToOne(() => Category)
  category: Category;

  @JoinColumn()
  @ManyToOne(() => Payment)
  pay: Payment;

  @JoinTable()
  @ManyToMany(() => User, (users) => users.products)
  users: User[];
}
