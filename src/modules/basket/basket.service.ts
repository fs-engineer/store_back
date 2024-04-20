import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Basket } from './entity/basket.entity';
import { CreateBasketDto } from './dto/create-basket.dto';
import { Product } from '../product/product.entity';
import { Country } from '../country/country.entity';
import { Brand } from '../brand/brand.entity';
import { sanitizeBasketCalcSumAndTotal } from './helpers/sanitizeBasketAndCalcSum';
import { IBasketResponse } from './basket.interface';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket) private readonly basketModel: typeof Basket,
  ) {}

  async getAllBaskets(): Promise<Basket[]> {
    return await this.basketModel.findAll();
  }

  async createBasketByUserId(basketDto: CreateBasketDto): Promise<Basket> {
    return await this.basketModel.create(basketDto);
  }

  async getBasketByUserId(userId: number): Promise<IBasketResponse> {
    const baskets: Basket[] = await this.basketModel.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          include: [
            {
              model: Brand,
              include: [Country],
            },
          ],
        },
      ],
    });

    if (baskets && baskets.length === 0) {
      throw new NotFoundException();
    }

    return sanitizeBasketCalcSumAndTotal(baskets);
  }
}
