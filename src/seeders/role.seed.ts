import { QueryInterface } from 'sequelize';
import { Role } from '../modules/role/entity/role.entity';
import { CreateRoleDto } from '../modules/role/dto/create-role.dto';

const roles: CreateRoleDto[] = [
    {
        name: 'ADMIN',
        description: 'Administratir',
    },
    {
        name: 'USER',
        description: 'Default user',
    },
    {
        name: 'GUEST',
        description: 'Guest user',
    },
];

export const roleSeed = {
    async up(queryInterface: QueryInterface) {
        await Role.bulkCreate(roles);
    },
};
