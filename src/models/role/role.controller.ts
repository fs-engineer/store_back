import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entity/role.entity';
import { Roles } from '../../decorators/role-auth.decorator';
import { roles } from '../../constants';
import { RolesGuard } from '../../guards/roles.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private rolesService: RoleService) {}

  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Role })
  @Roles([roles.ADMIN])
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto);
  }

  @ApiOperation({ summary: 'Get role by name' })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @Roles([roles.ADMIN])
  @UseGuards(RolesGuard)
  @Get('/:name')
  getByName(@Param('name') name: string) {
    return this.rolesService.getRoleByName(name);
  }

  @ApiOperation({ summary: 'Get all role' })
  @ApiResponse({ status: HttpStatus.OK, type: [Role] })
  @Roles([roles.ADMIN])
  @UseGuards(RolesGuard)
  @Get()
  getAllRoles(): Promise<Role[]> {
    return this.rolesService.getAllRoles();
  }
}
