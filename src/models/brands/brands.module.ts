import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { Brand } from './brands.model';
import { AuthModule } from '../auth/auth.module';
import { Country } from '../countries/countries.model';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
  imports: [SequelizeModule.forFeature([Brand, Country]), AuthModule],
})
export class BrandsModule {}
