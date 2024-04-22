import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // TODO need to check why don't work without the userRoles info
  private async generateToken(userDto: User): Promise<{ accessToken: string }> {
    const payload = {
      email: userDto.email,
      id: userDto.id,
      roles: userDto.roles,
    };
    return { accessToken: this.jwtService.sign(payload) };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({ message: 'Wrong email or password' });
    }

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (!passwordEquals) {
      throw new UnauthorizedException({ message: 'Wrong email or password' });
    }

    return user;
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async register(userDto: CreateUserDto) {
    const isExistUser = await this.usersService.getUserByEmail(userDto.email);

    if (isExistUser) {
      throw new BadRequestException('User already exist', {
        cause: new Error(),
        description: 'User already exist',
      });
    }

    const hashedPassword: string = await bcrypt.hash(userDto.password, 7);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashedPassword,
    });

    if (!user) {
      throw new InternalServerErrorException('User not created', {
        cause: new Error(),
        description: 'User not created, please try again',
      });
    }

    return this.generateToken(user);
  }
}