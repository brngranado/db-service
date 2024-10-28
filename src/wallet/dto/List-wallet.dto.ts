import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ListWalletDto {
  @IsNotEmpty()
  @IsString()
  document: number;

  @IsNotEmpty()
  @IsString()
  phone: string;
}
