import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { Brand } from './brand.entity';
import { AuthModule } from '../auth/auth.module';
import { Country } from '../country/country.entity';

@Module({
  controllers: [BrandController],
  providers: [BrandService],
  imports: [SequelizeModule.forFeature([Brand, Country]), AuthModule],
})
export class BrandModule {}
