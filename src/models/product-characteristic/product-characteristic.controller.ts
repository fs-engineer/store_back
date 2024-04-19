import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductCharacteristicService } from './product-characteristic.service';
import { CreateProductTypeDto } from '../product-type/dto/create-product-type.dto';
import { ProductCharacteristic } from './entity/product-characteristic.entity';

// TODO need to add swagger and roles guard
@Controller('product-characteristics')
export class ProductCharacteristicController {
  constructor(
    private productCharacteristicService: ProductCharacteristicService,
  ) {}

  @Get()
  getAll() {
    return this.productCharacteristicService.findAllCharacteristics();
  }

  @Post()
  create(
    @Body() createDto: CreateProductTypeDto,
  ): Promise<ProductCharacteristic> {
    return this.productCharacteristicService.addCharacteristic(createDto);
  }
}
