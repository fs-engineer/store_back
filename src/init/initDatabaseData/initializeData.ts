import { User } from '../../modules/user/user.entity';
import { Role } from '../../modules/role/entity/role.entity';
import { initRoles } from './initData';
import * as bcrypt from 'bcryptjs';

const admin = { email: 'admin@admin.com', password: 'admin123' };

// TODO need add roles to user, try to add many roles for many users
async function initializeData() {
    const existingUsers = await User.count();
    const existingRoles = await Role.count();

    if (existingUsers === 0 && existingRoles === 0) {
        const roles: Role[] = await Role.bulkCreate(initRoles);
        const hashedPassword: string = await bcrypt.hash(admin.password, 10);
        const users: User[] = await User.bulkCreate([{ email: 'admin@admin.com', password: hashedPassword }]);
        console.log('User and Role initial data has been created');
    } else {
        console.log('Data already exists');
    }
}
