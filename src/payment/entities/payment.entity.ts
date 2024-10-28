import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  document: number;

  @Column()
  amount: number;

  @Column()
  user_id: string;

  @Column()
  token: number;

  @Column()
  created_at: string;
}
