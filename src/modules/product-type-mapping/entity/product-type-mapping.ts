import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from '../../product/product.entity';
import { Type } from '../../type/entity/type.entity';
import { table } from '../../../constants';

@Table({
  tableName: table.PRODUCT_TYPES_MAPPING,
  createdAt: false,
  updatedAt: false,
})
export class ProductTypeMapping extends Model<ProductTypeMapping> {
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

  @ForeignKey(() => Type)
  @Column({ type: DataType.INTEGER })
  typeId: number;
}
