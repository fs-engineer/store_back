import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';
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

    @ApiProperty({ example: '123', description: 'Brand id' })
    @IsInt()
    readonly brandId: number;

    @ApiProperty({ example: 'true or false', description: 'Is it recommended product' })
    @IsBoolean()
    readonly recommended: boolean;

    @ApiProperty({
        example:
            'cream, yellowish component of milk, rich in fat globules, that rises to the surface naturally if milk is allowed to stand',
        description: 'Product description',
    })
    @IsString()
    readonly directions: string;

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

    @ApiProperty({
        example: '95',
        description: 'The volume of the product',
    })
    @IsInt()
    readonly volume: number;

    @IsInt()
    readonly article: string;

    @IsString()
    readonly composition: string;
}
