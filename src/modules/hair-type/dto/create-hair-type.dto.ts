import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHairTypeDto {
  @ApiProperty({ example: 'Greasy hair', description: 'An unique hair type' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
