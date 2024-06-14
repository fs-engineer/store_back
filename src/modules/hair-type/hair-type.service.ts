import { Injectable } from '@nestjs/common';
import { HairType } from './entity/hair-type.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateHairTypeDto } from './dto/create-hair-type.dto';
import { calcOffset } from '../../helpers/calcOffset';
import { Op } from 'sequelize';

@Injectable()
export class HairTypeService {
    constructor(@InjectModel(HairType) private hairTypeModel: typeof HairType) {}

    async getAllHairTypes(): Promise<HairType[]> {
        return await this.hairTypeModel.findAll();
    }

    async getAllHairTypesByParams({ query = '', page = '1', pageSize = '10' }) {
        const pSize = Number(pageSize);
        const offset = calcOffset(page, pSize);
        const whereCondition = query
            ? {
                  [Op.or]: [{ name: { [Op.like]: `%${query}%` } }],
              }
            : {};
        const { rows, count } = await this.hairTypeModel.findAndCountAll({
            where: whereCondition,
            limit: pSize,
            offset: offset,
        });

        return { rows, count, pageSize: pSize };
    }

    async addHairType(createHairTypeDto: CreateHairTypeDto) {
        return await this.hairTypeModel.create(createHairTypeDto);
    }
}
