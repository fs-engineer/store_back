import { Body, Controller, Get, Post } from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { Type } from './entity/type.entity';
import { ApiTags } from '@nestjs/swagger';

// TODO need to add role guard and swagger
@ApiTags('ProductTypes')
@Controller('product-types')
export class TypeController {
  constructor(private productTypeService: TypeService) {}

  @Post()
  create(@Body() typeDto: CreateTypeDto): Promise<Type> {
    return this.productTypeService.createProductType(typeDto);
  }

  @Get()
  getAll(): Promise<Type[]> {
    return this.productTypeService.getAllProductTypes();
  }
}
