import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.model';
import { Brand } from '../brands/brands.model';
import { Country } from '../countries/countries.model';

@Injectable()
export class ProductsService {
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
