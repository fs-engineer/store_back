import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCountryDto } from './dto/create-country.dto';
import { Country } from './country.entity';
import { Roles } from '../../decorators/role-auth.decorator';
import { roles } from '../../constants';
import { RolesGuard } from '../../guards/roles.guard';

@ApiTags('Countries')
@Controller('countries')
export class CountryController {
  constructor(private readonly countriesService: CountryService) {}

  @ApiOperation({ summary: 'Create country instance' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Country })
  @Roles([roles.ADMIN])
  @UseGuards(RolesGuard)
  @Post()
  add(@Body() countryDto: CreateCountryDto) {
    return this.countriesService.addCountry(countryDto);
  }

  @ApiOperation({ summary: 'Get all country' })
  @ApiResponse({ status: HttpStatus.OK, type: [Country] })
  @Roles([roles.ADMIN])
  @UseGuards(RolesGuard)
  @Get()
  getAllCountries() {
    return this.countriesService.getAllCountries();
  }

  @ApiOperation({ summary: 'Create country instance' })
  @ApiResponse({ status: HttpStatus.OK, type: String })
  @Roles([roles.ADMIN])
  @UseGuards(RolesGuard)
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.countriesService.deleteCountry(id);
  }
}
