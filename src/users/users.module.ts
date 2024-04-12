import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './users.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Role } from '../roles/roles.model';
import { RolesModule } from '../roles/roles.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Role]), RolesModule],
  exports: [UsersService],
})
export class UsersModule {}
