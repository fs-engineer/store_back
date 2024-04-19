import { Injectable } from '@nestjs/common';
import { ProductCharacteristic } from './entity/product-characteristic.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductCharacteristicDto } from './dto/create-product-characteristic.dto';

@Injectable()
export class ProductCharacteristicService {
  constructor(
    @InjectModel(ProductCharacteristic)
    private readonly productCharacteristicModel: typeof ProductCharacteristic,
  ) {}

  async findAllCharacteristics(): Promise<ProductCharacteristic[]> {
    return await this.productCharacteristicModel.findAll();
  }

  async addCharacteristic(
    createDto: CreateProductCharacteristicDto,
  ): Promise<ProductCharacteristic> {
    return await this.productCharacteristicModel.create(createDto);
  }
}
