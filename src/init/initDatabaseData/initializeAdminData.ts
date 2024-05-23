import * as bcrypt from 'bcryptjs';

import { User } from '../../modules/user/user.entity';
import { initAdminData } from './initData';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { roles, ROLES_KEY } from '../../constants';
import { Role } from '../../modules/role/entity/role.entity';

export async function initializeAdminData(): Promise<void> {
    const existingUser: number = await User.count();

    if (existingUser !== 0) {
        console.log('Admin data already exists.');
        return;
    }

    const hashedPass: string = await bcrypt.hash(initAdminData.password, 10);
    if (!hashedPass) {
        throw new InternalServerErrorException("Password isn't encrypted");
    }

    const user: User = await User.create({ ...initAdminData, password: hashedPass });
    if (!user) {
        console.log('User not created');
    }
    const role: Role | null = await Role.findOne({ where: { name: roles.ADMIN } });

    if (!role) {
        throw new BadRequestException('Role not found');
    }

    await user.$set(ROLES_KEY, [role.id]);
}
