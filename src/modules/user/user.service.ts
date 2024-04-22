import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from '../role/role.service';
import { roles, ROLES_KEY } from '../../constants';
import { AddRoleDto } from './dto/add-role.dto';
import { Role } from '../role/entity/role.entity';
import { Basket } from '../basket/entity/basket.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        private roleService: RoleService,
    ) {}

    async createUser(userDto: CreateUserDto): Promise<User> {
        const user: User = await this.userModel.create(userDto);
        const role: Role | null = await this.roleService.getRoleByName(roles.USER);

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

    async getAllUsers(): Promise<User[]> {
        return await this.userModel.findAll({
            include: [
                {
                    model: Role,
                    attributes: ['name', 'description'],
                    through: { attributes: [] },
                },
            ],
        });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userModel.findOne({
            where: { email },
            include: [
                {
                    model: Role,
                    attributes: ['name', 'description'],
                    through: { attributes: [] },
                },
                {
                    model: Basket,
                    include: [Product],
                },
            ],
        });
    }

    async addRole(roleDto: AddRoleDto): Promise<AddRoleDto> {
        const user: User | null = await this.userModel.findByPk(roleDto.userId);
        const role: Role | null = await this.roleService.getRoleByName(roleDto.name);
        if (!user || !role) {
            throw new NotFoundException();
        }

        await user.$add('roles', role.id);

        return roleDto;
    }
}
