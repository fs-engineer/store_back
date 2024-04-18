import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from '../role/role.service';
import { roles, ROLES_KEY } from '../../constants';
import { AddRoleDto } from './dto/add-role.dto';
import { Role } from '../role/entity/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private roleService: RoleService,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const user = await this.userModel.create(userDto);
    const role = await this.roleService.getRoleByName(roles.USER);

    if (!role) {
      throw new InternalServerErrorException({
        cause: new Error(),
        description: 'User not created, please try again',
      });
    }

    await user.$set(ROLES_KEY, [role.id]);
    user.roles = [role];

    return user;
  }

  // TODO should change includes
  async getAllUsers(): Promise<User[]> {
    return await this.userModel.findAll({
      include: {
        model: Role,
        attributes: ['name', 'description'],
      },
    });
  }

  // TODO should change includes
  async getUserByEmail(email: string) {
    return await this.userModel.findOne({
      where: { email },
      include: {
        model: Role,
        attributes: ['name', 'description'],
      },
    });
  }

  async addRole(roleDto: AddRoleDto) {
    const user = await this.userModel.findByPk(roleDto.userId);
    const role = await this.roleService.getRoleByName(roleDto.name);
    if (!user || !role) {
      throw new NotFoundException();
    }

    await user.$add('roles', role.id);

    return roleDto;
  }
}
