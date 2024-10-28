import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wallet')
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  document: number;

  @Column()
  phone: string;

  @Column()
  amount: number;

  @Column()
  created_at: string;

  @Column()
  type: string;
}
