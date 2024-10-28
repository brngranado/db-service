import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  document: string;

  @Column()
  amount: number;

  @Column()
  user_id: number;

  @Column()
  token: string;

  @Column()
  created_at: string;
}
