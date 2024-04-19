import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { table } from '../../../constants';

interface IRoleCreationAttributes {
  name: string;
  description: string;
}

@Table({ tableName: table.ROLES })
export class Role extends Model<Role, IRoleCreationAttributes> {
  @ApiProperty({ example: '1', description: 'An unique id of the role' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'USER', description: 'Role name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'Default user',
    description: 'There is user role description',
  })
  @Column({ type: DataType.STRING })
  description: string;
}
