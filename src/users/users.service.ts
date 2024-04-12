import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async createUser(userDto: CreateUserDto) {
    return await this.userModel.create(userDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }
}
