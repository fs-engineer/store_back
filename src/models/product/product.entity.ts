import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { table } from '../../constants';
import { ApiProperty } from '@nestjs/swagger';
import { Brand } from '../brand/brand.entity';
import { ProductProductTypeMapping } from '../product-product-type-mapping/entity/product-product-type-mapping';
import { ProductType } from '../product-type/entity/product-type.entity';
import { HairType } from '../hair-type/entity/hair-type.entity';
import { ProductHairTypeMapping } from '../product-hair-type-mapping/entity/product-hair-type-mapping.entity';

interface IProductCreationAttributes {
  name: string;
  price: number;
  description: string;
  wayToUse?: string;
}

@Table({ tableName: table.PRODUCTS })
export class Product extends Model<Product, IProductCreationAttributes> {
  @ApiProperty({ example: '1', description: 'User unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Some product name', description: 'Product name' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  readonly name: string;

  @ApiProperty({
    example: 'Product description',
    description: 'Product description',
  })
  @Column({
    type: DataType.STRING,
  })
  readonly description: string;

  @ApiProperty({ example: '123', description: 'Product price' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  readonly price: number;

  @ApiProperty({
    example: 'true',
    description: 'Is product added to the favorites?',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  readonly favorite: boolean;

  @ApiProperty({
    example:
      'cream, yellowish component of milk, rich in fat globules, that rises to the surface naturally if milk is allowed to stand',
    description: 'Product description',
  })
  @Column({
    type: DataType.STRING,
  })
  readonly wayToUse: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  readonly rate: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  readonly recommended: boolean;

  @ForeignKey(() => Brand)
  @Column
  brandId: number;

  @BelongsTo(() => Brand, { foreignKey: 'brandId' })
  brand: Brand;

  @BelongsToMany(() => ProductType, () => ProductProductTypeMapping)
  productTypes: ProductType[];

  @BelongsToMany(() => HairType, () => ProductHairTypeMapping)
  hairTypes: HairType[];
}
