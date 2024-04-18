import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { Brand } from '../brand/brand.entity';
import { Country } from '../country/country.entity';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async createProduct(productDto: CreateProductDto) {
    return await this.productModel.create(productDto);
  }

  async getAllProducts() {
    return await this.productModel.findAll({
      include: {
        model: Brand,
        include: [Country],
      },
    });
  }
}
