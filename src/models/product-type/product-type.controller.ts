import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { ProductType } from './entity/product-type.entity';
import { ApiTags } from '@nestjs/swagger';

// TODO need to add role guard and swagger
@ApiTags('ProductTypes')
@Controller('product-types')
export class ProductTypeController {
  constructor(private productTypeService: ProductTypeService) {}

  @Post()
  create(@Body() productTypeDto: CreateProductTypeDto): Promise<ProductType> {
    return this.productTypeService.createProductType(productTypeDto);
  }

  @Get()
  getAll(): Promise<ProductType[]> {
    return this.productTypeService.getAllProductTypes();
  }
}
