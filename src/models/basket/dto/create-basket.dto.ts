import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBasketDto {
  @ApiProperty({
    example: '123',
    description: 'User id, for auth users',
  })
  userId?: number;

  @ApiProperty({ example: '123', description: 'Product id', required: true })
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty({
    example: '12',
    description: 'Total number of products',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 'ksdf97352_238fdshf',
    description: 'Session Id, for guests',
  })
  sessionId?: string;
}
