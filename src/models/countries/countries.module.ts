import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Country } from './countries.model';

@Module({
  providers: [CountriesService],
  controllers: [CountriesController],
  imports: [SequelizeModule.forFeature([Country])],
})
export class CountriesModule {}
