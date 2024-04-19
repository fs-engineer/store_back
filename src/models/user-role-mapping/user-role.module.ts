import { Module } from '@nestjs/common';
import { UserRoleController } from './user-role.controller';
import { UserRoleService } from './user-role.service';
import { UserRole } from './entity/user-role.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [UserRoleController],
  providers: [UserRoleService],
  imports: [SequelizeModule.forFeature([UserRole])],
})
export class UserRoleModule {}
