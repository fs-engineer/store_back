import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from '../../product/product.entity';
import { ProductType } from '../../product-type/entity/product-type.entity';
import { table } from '../../../constants';

@Table({
  tableName: table.PRODUCT_TYPES_MAPPING,
  createdAt: false,
  updatedAt: false,
})
export class ProductTypeOfProductsMapping extends Model<ProductTypeOfProductsMapping> {
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

  @ForeignKey(() => ProductType)
  @Column({ type: DataType.INTEGER })
  productTypeId: number;
}
