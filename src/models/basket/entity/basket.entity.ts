import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { table } from '../../../constants';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/product.entity';
import { User } from '../../user/user.entity';

interface IBasketCreationAttributes {
  userId?: number;
  productId: number;
  quantity: number;
  sessionId?: string;
}

@Table({ tableName: table.BASKETS })
export class Basket extends Model<Basket, IBasketCreationAttributes> {
  @ApiProperty({ example: '1', description: 'Basket unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'User id' })
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: '1', description: 'Product id' })
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @ApiProperty({ example: '5', description: 'Total number of products' })
  @Column({ type: DataType.INTEGER })
  quantity: number;

  @ApiProperty({ example: 'adfasdfsadfsad3243', description: 'Session id' })
  @Column({ type: DataType.STRING })
  sessionId: string;
}
