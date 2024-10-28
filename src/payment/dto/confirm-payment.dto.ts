import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class ConfirmPaymentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  token: number;
}
