import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCharacteristicDto {
    @ApiProperty({
        example: 'Stimulates and accelerates cell renewal',
        description: 'Characteristic unique name',
    })
    @IsString()
    @IsNotEmpty()
    value: string;
}
