import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { PRODUCT_TYPE_KEY } from '../../../constants';
import { ApiProperty } from '@nestjs/swagger';

interface IProductsCreationAttributes {
  name: string;
}

@Table({ tableName: PRODUCT_TYPE_KEY })
export class ProductType extends Model<
  ProductType,
  IProductsCreationAttributes
> {
  @ApiProperty({ example: '1', description: 'Brand unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Shampoo', description: 'Product type name' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  name: string;
}