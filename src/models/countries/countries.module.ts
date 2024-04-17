import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Country } from './countries.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [CountriesService],
  controllers: [CountriesController],
  imports: [SequelizeModule.forFeature([Country]), AuthModule],
})
export class CountriesModule {}
