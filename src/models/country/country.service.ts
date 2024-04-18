import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Country } from './country.entity';
import { CreateCountryDto } from './dto/create-country.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country) private readonly countryModel: typeof Country,
  ) {}
  async getAllCountries(): Promise<Country[]> {
    return await this.countryModel.findAll();
  }

  async addCountry(countryDto: CreateCountryDto) {
    try {
      return await this.countryModel.create(countryDto);
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') {
        return new HttpException(
          { message: 'Country with this name already exists' },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async deleteCountry(id: number) {
    const deletedId = await this.countryModel.destroy({ where: { id } });

    if (deletedId === 0) {
      throw new NotFoundException();
    }

    return {
      id: deletedId,
      message: `The country with ID: ${id} has been removed`,
    };
  }
}
