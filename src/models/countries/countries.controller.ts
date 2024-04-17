import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CountriesService } from './countries.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCountryDto } from './dto/create-country.dto';
import { Country } from './countries.model';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @ApiOperation({ summary: 'Create country instance' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Country })
  @Post('/')
  add(@Body() countryDto: CreateCountryDto) {
    return this.countriesService.addCountry(countryDto);
  }

  @Get('/')
  getAllCountries() {
    return this.countriesService.getAllCountries();
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.countriesService.deleteCountry(id);
  }
}
