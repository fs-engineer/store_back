import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from '../../product/product.entity';
import { HairType } from '../../hair-type/entity/hair-type.entity';
import { table } from '../../../constants';

@Table({
  tableName: table.PRODUCT_HAIR_TYPE_MAPPING,
  createdAt: false,
  updatedAt: false,
})
export class ProductHairTypeMapping extends Model {
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

  @ForeignKey(() => HairType)
  @Column({ type: DataType.INTEGER })
  hairTypeId: number;
}
