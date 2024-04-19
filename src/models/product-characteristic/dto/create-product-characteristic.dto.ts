import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductCharacteristicDto {
  @ApiProperty({
    example: 'Stimulates and accelerates cell renewal',
    description: 'Characteristic unique name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
