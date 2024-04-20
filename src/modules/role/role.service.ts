import { Injectable } from '@nestjs/common';

import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './entity/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleModel: typeof Role) {}

  async createRole(roleDto: CreateRoleDto) {
    const { name } = roleDto;
    return await this.roleModel.create({
      ...roleDto,
      name: name.toUpperCase(),
    } as Role);
  }

  async getRoleByName(name: string) {
    return await this.roleModel.findOne({ where: { name } });
  }

  async getAllRoles() {
    return await this.roleModel.findAll();
  }
}
