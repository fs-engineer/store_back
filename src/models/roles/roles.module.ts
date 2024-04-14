import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Role } from './roles.model';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { User } from '../users/users.model';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role, User]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET_KEY_DEFAULT',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  exports: [RolesService],
})
export class RolesModule {}
