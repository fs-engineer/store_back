import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from '../../product/product.entity';
import { ProductType } from '../../product-type/entity/product-type.entity';

@Table({
  tableName: 'product_type_mapping',
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
