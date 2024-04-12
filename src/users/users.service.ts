import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { ROLES } from '../constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const user = await this.userModel.create(userDto);
    const role = await this.roleService.getRoleByName(ROLES.user);

    if (!role) {
      throw new InternalServerErrorException({
        cause: new Error(),
        description: 'User not created, please try again',
      });
    }

    await user.$set('roles', [role.id]);
    user.roles = [role];

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll({ include: { all: true } });
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({
      where: { email },
      include: { all: true },
    });
  }
}
