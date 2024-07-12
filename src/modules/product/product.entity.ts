import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { table } from '../../constants';
import { ApiProperty } from '@nestjs/swagger';
import { Brand } from '../brand/brand.entity';
import { ProductTypeMapping } from '../product-type-mapping/entity/product-type-mapping';
import { Type } from '../type/entity/type.entity';
import { HairType } from '../hair-type/entity/hair-type.entity';
import { ProductHairTypeMapping } from '../product-hair-type-mapping/entity/product-hair-type-mapping.entity';
import { Characteristic } from '../characteristic/entity/characteristic.entity';
// eslint-disable-next-line max-len
import { ProductCharacteristicMapping } from '../product-characteristic-mapping/entity/product-characteristic-mapping.entity';
import { Basket } from '../basket/entity/basket.entity';
import { ProductImage } from '../product-image/product-image.entity';

interface IProductCreationAttributes {
    name: string;
    price: number;
    description: string;
    directions: string;
    recommended: boolean;
    brandId: number;
}

@Table({ tableName: table.PRODUCTS })
export class Product extends Model<Product, IProductCreationAttributes> {
    @ApiProperty({ example: '1', description: 'User unique id' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'Some product name', description: 'Product name' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    readonly name: string;

    @ApiProperty({
        example: 'Product description',
        description: 'Product description',
    })
    @Column({
        type: DataType.STRING,
    })
    readonly description: string;

    @ApiProperty({ example: '123', description: 'Product price' })
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    readonly price: number;

    @ApiProperty({
        example:
            'cream, yellowish component of milk, rich in fat globules, that rises to the surface naturally if milk is allowed to stand',
        description: 'Product description',
    })
    @Column({
        type: DataType.STRING,
    })
    readonly directions: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    readonly rate: number;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    readonly recommended: boolean;

    @Column({ type: DataType.INTEGER })
    readonly volume: number;

    @Column({ type: DataType.INTEGER })
    readonly article: number;

    @Column({ type: DataType.STRING })
    readonly composition: string;

    @ForeignKey(() => Brand)
    @Column
    brandId: number;

    @BelongsTo(() => Brand, { foreignKey: 'brandId' })
    brand: Brand;

    @BelongsToMany(() => Type, () => ProductTypeMapping)
    types: Type[];

    @BelongsToMany(() => HairType, () => ProductHairTypeMapping)
    hairTypes: HairType[];

    @BelongsToMany(() => Characteristic, () => ProductCharacteristicMapping)
    characteristics: Characteristic[];

    @BelongsToMany(() => Product, () => Basket)
    products: Product[];

    @HasMany(() => ProductImage)
    images: ProductImage[];
}
