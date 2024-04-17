import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty({ example: 'Ukraine', description: 'Country unique name' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
