import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { table } from '../../constants';

interface ICountryCreationAttributes {
  name: string;
}

@Table({ tableName: table.COUNTRIES, createdAt: false, updatedAt: false })
export class Country extends Model<Country, ICountryCreationAttributes> {
  @ApiProperty({ example: '1', description: 'Country unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Ukraine', description: 'Country name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;
}
