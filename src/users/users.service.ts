import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { ROLES } from '../constants';
import { Error } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const user = await this.userModel.create(userDto);
    const role = await this.roleService.getRoleByName(ROLES.user);

    if (!role) return;

    await user.$set('roles', [role.id]);

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll({ include: { all: true } });
  }
}
