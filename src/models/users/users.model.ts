import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { USERS_KEY } from '../../constants';

interface IUserCreationAttributes {
  email: string;
  password: string;
}

// TODO add user validation to swagger page
@Table({ tableName: USERS_KEY })
export class User extends Model<User, IUserCreationAttributes> {
  @ApiProperty({ example: '1', description: 'User unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'usermail@gmail.com', description: 'User email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'useR_PassWord123', description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: '063010101', description: 'User phone number' })
  @Column({ type: DataType.STRING })
  number: string;

  @ApiProperty({ example: '01.01.1970', description: 'User birth date' })
  @Column({ type: DataType.DATE })
  birthDate: Date;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
