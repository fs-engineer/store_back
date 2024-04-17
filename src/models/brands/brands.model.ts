import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { BRANDS_KEY } from '../../constants';
import { ApiProperty } from '@nestjs/swagger';
import { Country } from '../countries/countries.model';

interface IBrandCreationAttributes {
  name: string;
  countryId: number;
}

@Table({ tableName: BRANDS_KEY, createdAt: false, updatedAt: false })
export class Brand extends Model<Brand, IBrandCreationAttributes> {
  @ApiProperty({ example: '1', description: 'Brand unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Puma', description: 'Brand name' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  name: string;

  @ForeignKey(() => Country)
  @Column
  countryId: number;

  @BelongsTo(() => Country, { foreignKey: 'countryId' })
  country: Country;
}
