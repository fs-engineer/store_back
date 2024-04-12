import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../users/users.model';
import { UserRoles } from './user-roles.model';

interface IRoleCreationAttributes {
  value: string;
  description: string;
}

// TODO add user validation to swagger page
@Table({ tableName: 'roles' })
export class Role extends Model<Role, IRoleCreationAttributes> {
  @ApiProperty({ example: '1', description: 'An unique id of the role' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Role name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'Role description',
    description: 'There is user role description',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
