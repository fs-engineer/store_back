import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { table } from '../../../constants';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/product.entity';
import { ProductCharacteristicMapping } from '../../product-characteristic-mapping/entity/product-characteristic-mapping.entity';

interface ICharacteristicCreationAttributes {
    value: string;
}

@Table({ tableName: table.CHARACTERISTICS })
export class Characteristic extends Model<Characteristic, ICharacteristicCreationAttributes> {
    @ApiProperty({ example: '1', description: 'Characteristic unique id' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example: 'Stimulates and accelerates cell renewal',
        description: 'Characteristic unique name',
    })
    @Column({ type: DataType.STRING, unique: true })
    value: string;

    @BelongsToMany(() => Product, () => ProductCharacteristicMapping)
    products: Product[];
}
