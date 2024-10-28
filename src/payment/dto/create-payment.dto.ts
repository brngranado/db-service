import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  document: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
