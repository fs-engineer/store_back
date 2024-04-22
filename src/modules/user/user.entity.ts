import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../role/entity/role.entity';
import { UserRole } from '../user-role-mapping/entity/user-role.entity';
import { table } from '../../constants';
import { Basket } from '../basket/entity/basket.entity';

interface IUserCreationAttributes {
    email: string;
    password: string;
}

// TODO add user token validation to swagger page
@Table({ tableName: table.USERS })
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

    @ApiProperty({ example: 'Vika', description: 'User name' })
    @Column({ type: DataType.STRING })
    name: string;

    @ApiProperty({ example: 'Kiss', description: 'User last name' })
    @Column({ type: DataType.STRING })
    lastName: string;

    @ApiProperty({ example: '063010101', description: 'User phone number' })
    @Column({ type: DataType.STRING })
    number: string;

    @ApiProperty({ example: '01.01.1970', description: 'User birth date' })
    @Column({ type: DataType.DATE })
    birthDate: Date;

    @HasMany(() => Basket)
    basket: Basket[];

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[];
}
