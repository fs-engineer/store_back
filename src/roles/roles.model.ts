import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';

interface IRoleCreationAttributes {
  value: string;
  description: string;
}

// TODO add user validation to swagger page
@Table({ tableName: 'roles' })
export class Role extends Model<Role, IRoleCreationAttributes> {
  @ApiProperty({ example: '1', description: 'An unique id of the role' })
  @Column({
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

  @BelongsTo(() => User, () => UserRoles)
  users: User[];
}
