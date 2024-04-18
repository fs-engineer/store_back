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

import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Roles } from '../../decorators/role-auth.decorator';
import { roles } from '../../constants';
import { RolesGuard } from '../../guards/roles.guard';
import { Brand } from './brand.entity';

@ApiTags('Brands')
@Controller('brands')
export class BrandController {
  constructor(private readonly brandsService: BrandService) {}

  @ApiOperation({ summary: 'Get all brand' })
  @ApiResponse({ status: HttpStatus.OK, type: [Brand] })
  @Roles([roles.ADMIN])
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.brandsService.getAllBrands();
  }

  @ApiOperation({ summary: 'Create brand' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Brand })
  @Roles([roles.ADMIN])
  @UseGuards(RolesGuard)
  @Post()
  add(@Body() brandDto: CreateBrandDto) {
    return this.brandsService.createBrand(brandDto);
  }

  @ApiOperation({ summary: 'Delete brand' })
  @ApiResponse({ status: HttpStatus.OK, type: String })
  @Roles([roles.ADMIN])
  @UseGuards(RolesGuard)
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.brandsService.deleteBrand(id);
  }
}
