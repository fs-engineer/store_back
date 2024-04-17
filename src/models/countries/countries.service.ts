import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Country } from './countries.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCountryDto } from './dto/create-country.dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country) private readonly countriesModel: typeof Country,
  ) {}
  async getAllCountries(): Promise<Country[]> {
    return await this.countriesModel.findAll();
  }

  async addCountry(countryDto: CreateCountryDto) {
    try {
      return await this.countriesModel.create(countryDto);
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
    const deletedId = await this.countriesModel.destroy({ where: { id } });

    if (deletedId === 0) {
      throw new NotFoundException();
    }

    return {
      id: deletedId,
      message: `The country with ID: ${id} has been removed`,
    };
  }
}
