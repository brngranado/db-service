import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wallet')
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  document: string;

  @Column()
  phone: string;

  @Column()
  amount: number;
}
