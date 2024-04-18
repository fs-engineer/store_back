import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Country } from './country.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [CountryService],
  controllers: [CountryController],
  imports: [SequelizeModule.forFeature([Country]), AuthModule],
})
export class CountryModule {}
