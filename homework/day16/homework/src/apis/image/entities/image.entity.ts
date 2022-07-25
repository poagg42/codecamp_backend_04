import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  _code: string;

  @Column()
  url: string;

  @Column()
  product_code: string;
}
