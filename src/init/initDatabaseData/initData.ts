import { CreateRoleDto } from '../../modules/role/dto/create-role.dto';

export const initRoles: CreateRoleDto[] = [
    {
        name: 'ADMIN',
        description: 'Administrator',
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
