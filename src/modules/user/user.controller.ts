import { Body, Controller, Get, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '../../decorators/role-auth.decorator';
import { roles } from '../../constants';
import { RolesGuard } from '../../guards/roles.guard';
import { Role } from '../role/entity/role.entity';
import { AddRoleDto } from './dto/add-role.dto';
import { QueryDto } from '../../common/dto/query.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private usersService: UserService) {}

    @ApiOperation({ summary: 'Create a user' })
    @ApiResponse({ status: HttpStatus.CREATED, type: User })
    @Roles([roles.ADMIN])
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() userDto: CreateUserDto): Promise<User> {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({ summary: 'Find all user' })
    @ApiResponse({ status: HttpStatus.OK, type: [User] })
    @Roles([roles.ADMIN])
    @UseGuards(RolesGuard)
    @Get()
    async getAll(@Query() query: QueryDto): Promise<{ users: User[]; count: number; totalPages: number }> {
        const { users, count } = await this.usersService.getAllUsers(query);
        const totalPages: number = Math.ceil(count / 10);

        return { users, count, totalPages };
    }

    @ApiOperation({ summary: 'Create a new role' })
    @ApiResponse({ status: HttpStatus.OK, type: [Role] })
    @Roles([roles.ADMIN])
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }
}
