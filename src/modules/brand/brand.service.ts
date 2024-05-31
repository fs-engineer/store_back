import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from './brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Country } from '../country/country.entity';
import { Op } from 'sequelize';

@Injectable()
export class BrandService {
    constructor(@InjectModel(Brand) private brandModel: typeof Brand) {}

    async getAllBrands() {
        try {
            return await this.brandModel.findAll();
        } catch (e) {
            console.log(e);
            return new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
        }
    }

    async getAllBrandsByParams({ query = '', page = 1 }) {
        const pageSize: number = 10;
        const offset: number = (page - 1) * pageSize;
        const whereCondition = query
            ? {
                  [Op.or]: [{ name: { [Op.like]: `%${query}%` } }],
              }
            : {};
        const { rows: brands, count } = await this.brandModel.findAndCountAll({
            where: whereCondition,
            include: {
                model: Country,
                attributes: ['name'],
            },
            limit: pageSize,
            offset: offset,
        });

        return { brands, count };
    }

    async createBrand(brandDto: CreateBrandDto) {
        try {
            return await this.brandModel.create(brandDto);
        } catch (e) {
            console.log(e);
            if (e.name === 'SequelizeUniqueConstraintError') {
                return new HttpException({ message: 'Brand with this name already exists' }, HttpStatus.BAD_REQUEST);
            }
        }
    }

    async deleteBrand(id: number) {
        const deletedId = await this.brandModel.destroy({ where: { id } });

        if (deletedId === 0) {
            throw new NotFoundException();
        }

        return {
            id: deletedId,
            message: `The brand with ID: ${id} has been removed`,
        };
    }
}
