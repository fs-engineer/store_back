import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { table } from '../../../constants';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/product.entity';
import { ProductTypeMapping } from '../../product-type-mapping/entity/product-type-mapping';

interface ITypeCreationAttributes {
  name: string;
}

@Table({ tableName: table.TYPES })
export class Type extends Model<Type, ITypeCreationAttributes> {
  @ApiProperty({ example: '1', description: 'Brand unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Shampoo', description: 'Product type name' })
  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @BelongsToMany(() => Product, () => ProductTypeMapping)
  products: Product[];
}
