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
import { CountriesService } from './countries.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCountryDto } from './dto/create-country.dto';
import { Country } from './countries.model';
import { Roles } from '../../decorators/role-auth.decorator';
import { ROLES } from '../../constants';
import { RolesGuard } from '../../guards/roles.guard';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @ApiOperation({ summary: 'Create country instance' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Country })
  @Roles([ROLES.admin])
  @UseGuards(RolesGuard)
  @Post('/')
  add(@Body() countryDto: CreateCountryDto) {
    return this.countriesService.addCountry(countryDto);
  }

  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({ status: HttpStatus.OK, type: [Country] })
  @Roles([ROLES.admin])
  @UseGuards(RolesGuard)
  @Get('/')
  getAllCountries() {
    return this.countriesService.getAllCountries();
  }

  @ApiOperation({ summary: 'Create country instance' })
  @ApiResponse({ status: HttpStatus.OK, type: String })
  @Roles([ROLES.admin])
  @UseGuards(RolesGuard)
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.countriesService.deleteCountry(id);
  }
}
