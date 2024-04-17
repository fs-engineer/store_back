import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ example: 'Puma', description: 'Brand name' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
