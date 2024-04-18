import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductTypeDto {
  @ApiProperty({ example: 'Shampoo', description: 'Product Type Description' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
