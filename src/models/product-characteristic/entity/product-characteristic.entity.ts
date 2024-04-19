import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { table } from '../../../constants';
import { ApiProperty } from '@nestjs/swagger';

interface IProductCharacteristicCreationAttributes {
  name: string;
}

@Table({ tableName: table.PRODUCT_CHARACTERISTICS })
export class ProductCharacteristic extends Model<
  ProductCharacteristic,
  IProductCharacteristicCreationAttributes
> {
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
  name: string;
}
