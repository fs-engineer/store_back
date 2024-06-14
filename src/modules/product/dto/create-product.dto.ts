import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ example: '123', description: 'Product price' })
    @IsInt()
    readonly price: number;

    @ApiProperty({
        example: 'Product description',
        description: 'Product description',
    })
    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @ApiProperty({
        example:
            'cream, yellowish component of milk, rich in fat globules, that rises to the surface naturally if milk is allowed to stand',
        description: 'Product description',
    })
    @IsString()
    readonly wayToUse?: string;

    @ApiProperty({
        example: '[1, 2, 3]',
        description: 'Array of product types ids: number',
    })
    @IsArray()
    readonly types: number[];

    @ApiProperty({
        example: '[1, 2, 3]',
        description: 'Array of product hair types id: number',
    })
    @IsArray()
    readonly hairTypes: number[];

    @ApiProperty({
        example: '[1, 2, 3]',
        description: 'Array of product characteristics id: number',
    })
    @IsArray()
    readonly characteristics: number[];
}
