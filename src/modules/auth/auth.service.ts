import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { IToken, ITokenPayload } from '../../interfaces/token.interface';
import * as process from 'node:process';

const EXPIRE_TIME = 24 * 60 * 60 * 1000;

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    private async generateToken(user: User): Promise<IToken> {
        const payload: ITokenPayload = {
            id: user.id,
            email: user.email,
            roles: user.roles,
        };
        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: '1d',
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
                expiresIn: '7d',
                secret: process.env.JWT_REFRESH_KEY,
            }),
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
        };
    }

    private async validateUser(userDto: CreateUserDto): Promise<User> {
        const user: User | null = await this.usersService.getUserByEmail(userDto.email);
        if (!user) {
            throw new UnauthorizedException({ message: 'Wrong email or password' });
        }

        const passwordEquals: boolean = await bcrypt.compare(userDto.password, user.password);

        if (!passwordEquals) {
            throw new UnauthorizedException({ message: 'Wrong email or password' });
        }

        return user;
    }

    async login(userDto: CreateUserDto) {
        const user: User = await this.validateUser(userDto);

        const tokens = await this.generateToken(user);

        return {
            user: {
                id: user.id,
                email: user.email,
                roles: user.roles.map((role) => role.name),
            },
            ...tokens,
        };
    }

    async register(userDto: CreateUserDto) {
        const user: User | null = await this.usersService.createUser(userDto);

        if (!user) {
            throw new InternalServerErrorException('User not created, please try again');
        }

        const tokens = await this.generateToken(user);

        return {
            user: {
                id: user.id,
                email: user.email,
                roles: user.roles.map((role) => role.name),
            },
            ...tokens,
        };
    }

    async refreshToken(user: User) {
        return await this.generateToken(user);
    }
}
