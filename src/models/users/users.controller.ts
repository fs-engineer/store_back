import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '../../decorators/role-auth.decorator';
import { ROLES } from '../../constants';
import { RolesGuard } from '../../guards/roles.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // swagger
  @ApiOperation({ summary: 'Create a user' })
  // swagger
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  // authorized roles
  @Roles([ROLES.admin])
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @Roles([ROLES.admin])
  @UseGuards(RolesGuard)
  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
}
