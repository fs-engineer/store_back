import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/product.entity';
import { Characteristic } from '../../characteristic/entity/characteristic.entity';
import { table } from '../../../constants';

interface IProductCharacteristicMappingCreationAttributes {}

// TODO need to add swagger and roles guard
@Table({ tableName: table.PRODUCT_CHARACTERISTICS_MAPPING })
export class ProductCharacteristicMapping extends Model<
    ProductCharacteristicMapping,
    IProductCharacteristicMappingCreationAttributes
> {
    @ApiProperty({ example: '1', description: 'Characteristic unique id' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER })
    productId: number;

    @ForeignKey(() => Characteristic)
    @Column({ type: DataType.INTEGER })
    productCharacteristicId: number;
}
