import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ example: 'Puma', description: 'Brand name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '27', description: 'CountryId' })
  @IsNotEmpty()
  @IsNumber()
  countryId: number;
}
