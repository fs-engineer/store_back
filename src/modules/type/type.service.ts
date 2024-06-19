import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Type } from './entity/type.entity';
import { CreateTypeDto } from './dto/create-type.dto';
import { calcOffset } from '../../helpers/calcOffset';
import { Op } from 'sequelize';

@Injectable()
export class TypeService {
    constructor(@InjectModel(Type) private productTypeModel: typeof Type) {}

    async getAllProductTypes(): Promise<{ rows: Type[] }> {
        const data = await this.productTypeModel.findAll();
        return { rows: data };
    }

    async getAllProductTypesByParams({
        query = '',
        page = '1',
        pageSize = '10',
    }): Promise<{ rows: Type[]; count: number; pageSize: number }> {
        const pSize = Number(pageSize);
        const offset = calcOffset(page, pSize);
        const whereCondition = query
            ? {
                  [Op.or]: [{ name: { [Op.like]: `%${query}%` } }],
              }
            : {};
        const { rows, count } = await this.productTypeModel.findAndCountAll({
            where: whereCondition,
            limit: pSize,
            offset: offset,
        });

        return { rows, count, pageSize: pSize };
    }

    async createProductType(productTypeDto: CreateTypeDto): Promise<Type> {
        return await this.productTypeModel.create(productTypeDto);
    }
}
