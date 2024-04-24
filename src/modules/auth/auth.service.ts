import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { IToken, ITokenPayload } from '../../interfaces/token.interface';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    private async generateToken(userDto: User): Promise<IToken> {
        const payload: ITokenPayload = {
            id: userDto.id,
            email: userDto.email,
            roles: userDto.roles,
        };

        return { accessToken: this.jwtService.sign(payload) };
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

    async login(userDto: CreateUserDto): Promise<IToken> {
        const user: User = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async register(userDto: CreateUserDto): Promise<IToken> {
        const user: User | null = await this.usersService.createUser(userDto);

        if (!user) {
            throw new InternalServerErrorException('User not created, please try again');
        }

        return this.generateToken(user);
    }
}
