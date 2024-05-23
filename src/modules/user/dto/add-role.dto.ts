import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'SOMEROLE',
        description: 'Some role name',
    })
    readonly name: string;

    @IsNumber()
    @ApiProperty({
        example: '123',
        description: 'userId',
    })
    readonly userId: number;
}
