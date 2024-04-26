import { CreateRoleDto } from '../../modules/role/dto/create-role.dto';
import { roles } from '../../constants';
import { CreateUserDto } from '../../modules/user/dto/create-user.dto';

export const initRolesData: CreateRoleDto[] = [
    {
        name: roles.ADMIN,
        description: 'Administrator',
    },
    {
        name: roles.USER,
        description: 'Default user',
    },
    {
        name: roles.GUEST,
        description: 'Guest user',
    },
];

export const initAdminData: CreateUserDto = {
    email: 'vad.evlanov@gmail.com',
    password: 'admin123admin',
};
