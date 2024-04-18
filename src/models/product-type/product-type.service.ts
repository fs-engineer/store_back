import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ProductType } from './entity/product-type.entity';
import { CreateProductTypeDto } from './dto/create-product-type.dto';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectModel(ProductType) private productTypeModel: typeof ProductType,
  ) {}

  async createProductType(
    productTypeDto: CreateProductTypeDto,
  ): Promise<ProductType> {
    return await this.productTypeModel.create(productTypeDto);
  }

  async getAllProductTypes(): Promise<ProductType[]> {
    return await this.productTypeModel.findAll();
  }
}
