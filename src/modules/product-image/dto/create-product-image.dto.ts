import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductImageDto {
    @IsString()
    @ApiProperty({ example: 'https://blabla.com/image.jpg', description: 'Image url' })
    readonly secureUrl: string;

    @IsString()
    @ApiProperty({
        example: '123',
        description: 'Product id',
    })
    readonly productId: number;
}
