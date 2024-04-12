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
import { ROLES } from '../constants';

interface IRoleCreationAttributes {
  name: string;
  description: string;
}

// TODO add user validation to swagger page (token and etc.)
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

  @ApiProperty({ example: ROLES.user, description: 'Role name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'Default user',
    description: 'There is user role description',
  })
  @Column({ type: DataType.STRING })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
