import { Module, forwardRef } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        forwardRef(() => UserModule),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY || 'SECRET_KEY_DEFAULT',
            signOptions: {
                expiresIn: '1d',
            },
        }),
    ],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
