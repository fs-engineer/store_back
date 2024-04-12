import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
// Swagger
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  // Swagger
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get()
  // Swagger
  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
