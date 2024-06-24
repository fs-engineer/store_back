import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { table } from '../../constants';
import { Product } from '../product/product.entity';

interface IProductImageCreationAttributes {
    secureUrl: string;
    productId: number;
}

@Table({ tableName: table.PRODUCT_IMAGES })
export class ProductImage extends Model<ProductImage, IProductImageCreationAttributes> {
    @ApiProperty({ example: '1', description: 'Product Image unique id' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'http://example.com/image.jpg', description: 'Image URL' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    secureUrl: string;

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    productId: number;

    @BelongsTo(() => Product)
    product: Product;
}
