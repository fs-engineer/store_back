import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Role } from './entity/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { User } from '../user/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports: [SequelizeModule.forFeature([Role, User]), AuthModule],
  exports: [RoleService],
})
export class RoleModule {}
