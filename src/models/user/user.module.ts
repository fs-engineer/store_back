import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Role } from '../role/role.entity';
import { RoleModule } from '../role/role.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User, Role]),
    RoleModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
