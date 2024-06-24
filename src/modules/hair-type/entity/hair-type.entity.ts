import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { table } from '../../../constants';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/product.entity';
import { ProductHairTypeMapping } from '../../product-hair-type-mapping/entity/product-hair-type-mapping.entity';

interface IHairTypeCreationAttributes {
    name: string;
}

@Table({ tableName: table.HAIR_TYPE })
export class HairType extends Model<HairType, IHairTypeCreationAttributes> {
    @ApiProperty({ example: '1', description: 'Hair type unique id' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'Greasy hair', description: 'An unique hair type' })
    @Column({ type: DataType.STRING, unique: true })
    name: string;

    @BelongsToMany(() => Product, () => ProductHairTypeMapping)
    products: Product[];
}
