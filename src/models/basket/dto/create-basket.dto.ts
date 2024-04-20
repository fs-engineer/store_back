import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBasketDto {
  userId?: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  sessionId?: string;
}
