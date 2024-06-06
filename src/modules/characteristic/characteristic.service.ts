import { Injectable } from '@nestjs/common';
import { Characteristic } from './entity/characteristic.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCharacteristicDto } from './dto/create-characteristic.dto';
import { Op } from 'sequelize';
import { calcOffset } from '../../helpers/calcOffset';

@Injectable()
export class CharacteristicService {
    constructor(
        @InjectModel(Characteristic)
        private readonly characteristicModel: typeof Characteristic,
    ) {}

    async findAll(): Promise<Characteristic[]> {
        return await this.characteristicModel.findAll();
    }

    async findAllByParams({ query = '', page = '1', pageSize = '10' }) {
        const pSize = Number(pageSize);
        const offset = calcOffset(page, pSize);
        const whereCondition = query
            ? {
                  [Op.or]: [{ name: { [Op.like]: `%${query}%` } }],
              }
            : {};
        const { rows, count } = await this.characteristicModel.findAndCountAll({
            where: whereCondition,
            limit: pSize,
            offset,
        });
        return { rows, count, pageSize: pSize };
    }

    async add(createDto: CreateCharacteristicDto): Promise<Characteristic> {
        return await this.characteristicModel.create(createDto);
    }
}
