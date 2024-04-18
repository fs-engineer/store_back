import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}
  async createProduct(productDto: CreateProductDto) {
    return await this.productModel.create(productDto);
  }

  async getAllProducts() {
    return await this.productModel.findAll();
  }
}
