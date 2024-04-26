import { Role } from '../../modules/role/entity/role.entity';
import { initRolesData } from './initData';

// TODO need add roles to user, try to add many roles for many users / firstly add roles, after need to add users
export async function initializeRoleData(): Promise<void> {
    const existingRoles: number = await Role.count();

    if (existingRoles === 0) {
        await Role.bulkCreate(initRolesData);

        console.log('Role initial data has been created');
    } else {
        console.log('Role data already exists.');
    }
}
