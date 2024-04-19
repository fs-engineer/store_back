import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { Brand } from '../brand/brand.entity';
import { Country } from '../country/country.entity';
import { Type } from '../type/entity/type.entity';
import {
  CHARACTERISTICS_KEY,
  HAIR_TYPES_KEY,
  TYPES_KEY,
} from '../../constants';
import { HairType } from '../hair-type/entity/hair-type.entity';
import { Characteristic } from '../characteristic/entity/characteristic.entity';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async createProduct(createProductDto: CreateProductDto) {
    const product: Product = await this.productModel.create(createProductDto);

    if (createProductDto.types && createProductDto.types.length > 0) {
      await product.$add(TYPES_KEY, createProductDto.types);
    }

    if (createProductDto.hairTypes && createProductDto.hairTypes.length > 0) {
      await product.$add(HAIR_TYPES_KEY, createProductDto.hairTypes);
    }

    if (
      createProductDto.characteristics &&
      createProductDto.characteristics.length > 0
    ) {
      await product.$add(CHARACTERISTICS_KEY, createProductDto.characteristics);
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
          model: Type,
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: HairType,
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: Characteristic,
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
      ],
    });
  }
}
