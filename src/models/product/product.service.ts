import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { Brand } from '../brand/brand.entity';
import { Country } from '../country/country.entity';
import { ProductType } from '../product-type/entity/product-type.entity';
import { HAIR_TYPES_KEY, PRODUCT_TYPES_KEY } from '../../constants';
import { HairType } from '../hair-type/entity/hair-type.entity';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async createProduct(createProductDto: CreateProductDto) {
    const product: Product = await this.productModel.create(createProductDto);

    if (
      createProductDto.productTypes &&
      createProductDto.productTypes.length > 0
    ) {
      await product.$add(PRODUCT_TYPES_KEY, createProductDto.productTypes);
    }

    if (createProductDto.hairTypes && createProductDto.hairTypes.length > 0) {
      await product.$add(HAIR_TYPES_KEY, createProductDto.hairTypes);
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
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: HairType,
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
      ],
    });
  }
}
