import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IUserCreationAttributes {
  email: string;
  password: string;
  number: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationAttributes> {
  @Column({
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  number: string;

  @Column({ type: DataType.DATE, allowNull: true })
  birthDate: number;
}
