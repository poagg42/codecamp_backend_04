import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  _code: string;

  @Column()
  price: string;

  @Column()
  pay_log: string;
}
