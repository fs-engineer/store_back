import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Roles } from '../../decorators/role-auth.decorator';
import { ROLES } from '../../constants';
import { RolesGuard } from '../../guards/roles.guard';
import { Brand } from './brands.model';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiOperation({ summary: 'Get all brands' })
  @ApiResponse({ status: HttpStatus.OK, type: [Brand] })
  @Roles([ROLES.admin])
  @UseGuards(RolesGuard)
  @Get('/')
  getAll() {
    return this.brandsService.getAllBrands();
  }

  @ApiOperation({ summary: 'Create brand' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Brand })
  @Roles([ROLES.admin])
  @UseGuards(RolesGuard)
  @Post('/')
  add(@Body() brandDto: CreateBrandDto) {
    return this.brandsService.createBrand(brandDto);
  }

  @ApiOperation({ summary: 'Delete brand' })
  @ApiResponse({ status: HttpStatus.OK, type: String })
  @Roles([ROLES.admin])
  @UseGuards(RolesGuard)
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.brandsService.deleteBrand(id);
  }
}
