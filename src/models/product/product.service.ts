import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { Brand } from '../brand/brand.entity';
import { Country } from '../country/country.entity';
import { ProductType } from '../product-type/entity/product-type.entity';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async createProduct(createProductDto: CreateProductDto) {
    const product: Product = await this.productModel.create(createProductDto);

    if (
      createProductDto.productTypes &&
      createProductDto.productTypes.length > 0
    ) {
      await product.$add('productTypes', createProductDto.productTypes);
    }

    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productModel.findAll({
      include: [
        {
          model: Brand,
          include: [Country],
        },
        {
          model: ProductType,
          attributes: ['name'],
          through: { attributes: [] },
        },
      ],
    });
  }
}
