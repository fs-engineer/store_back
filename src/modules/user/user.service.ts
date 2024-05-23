import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from '../role/role.service';
import { roles, ROLES_KEY } from '../../constants';
import { AddRoleDto } from './dto/add-role.dto';
import { Role } from '../role/entity/role.entity';
import { Basket } from '../basket/entity/basket.entity';
import { Product } from '../product/product.entity';
import * as bcrypt from 'bcryptjs';
import { UserParamsDto } from './dto/user-params.dto';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        private roleService: RoleService,
    ) {}

    async createUser(userDto: CreateUserDto): Promise<User> {
        const existingUser: User | null = await this.getUserByEmail(userDto.email);
        const role: Role | null = await this.roleService.getRoleByName(roles.USER);

        if (!role) {
            throw new InternalServerErrorException('User not created, please try again');
        }

        if (existingUser) {
            throw new BadRequestException('User already exist');
        }

        const hashedPassword: string = await bcrypt.hash(userDto.password, 10);
        const user: User = await this.userModel.create({
            ...userDto,
            password: hashedPassword,
        });

        await user.$set(ROLES_KEY, [role.id]);
        user.roles = [role];

        return user;
    }

    async getAllUsers({ query = '', page = 1 }: UserParamsDto): Promise<{ users: User[]; count: number }> {
        const pageSize: number = 10;
        const offset: number = (page - 1) * pageSize;

        const whereCondition = query
            ? {
                  [Op.or]: [
                      { name: { [Op.like]: `%${query}%` } },
                      { email: { [Op.like]: `%${query}%` } },
                      { '$Role.name$': { [Op.like]: `%${query}%` } },
                  ],
              }
            : {};

        const { rows: users, count } = await this.userModel.findAndCountAll({
            where: whereCondition,
            include: [
                {
                    model: Role,
                    attributes: ['name', 'description'],
                    through: { attributes: [] },
                },
            ],
            limit: pageSize,
            offset: offset,
        });

        return { users, count };
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
