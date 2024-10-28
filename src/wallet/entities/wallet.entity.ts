import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
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
