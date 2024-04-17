import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from './brands.model';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Country } from '../countries/countries.model';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand) private brandModel: typeof Brand) {}

  async getAllBrands() {
    return this.brandModel.findAll({
      include: {
        model: Country,
        attributes: ['name'],
      },
    });
  }

  async createBrand(brandDto: CreateBrandDto) {
    try {
      return await this.brandModel.create(brandDto);
    } catch (e) {
      console.log(e);
      if (e.name === 'SequelizeUniqueConstraintError') {
        return new HttpException(
          { message: 'Brand with this name already exists' },
          HttpStatus.BAD_REQUEST,
        );
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
