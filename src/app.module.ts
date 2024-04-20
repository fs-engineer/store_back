import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';

import { UserModule } from './models/user/user.module';
import { RoleModule } from './models/role/role.module';
import { AuthModule } from './models/auth/auth.module';
import { ProductModule } from './models/product/product.module';
import { BrandModule } from './models/brand/brand.module';
import { CountryModule } from './models/country/country.module';
import { TypeModule } from './models/type/type.module';
import { HairTypeModule } from './models/hair-type/hair-type.module';
import { UserRoleModule } from './models/user-role-mapping/user-role.module';
import { ProductTypeMappingModule } from './models/product-type-mapping/product-type-mapping.module';
import { ProductHairTypeMappingModule } from './models/product-hair-type-mapping/product-hair-type-mapping.module';
import { CharacteristicModule } from './models/characteristic/characteristic.module';
import { ProductCharacteristicMappingModule } from './models/product-characteristic-mapping/product-characteristic-mapping.module';
import { BasketModule } from './models/basket/basket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
    }),
    UserModule,
    RoleModule,
    AuthModule,
    ProductModule,
    BrandModule,
    CountryModule,
    TypeModule,
    HairTypeModule,
    UserRoleModule,
    ProductTypeMappingModule,
    ProductHairTypeMappingModule,
    CharacteristicModule,
    ProductCharacteristicMappingModule,
    BasketModule,
  ],
})
export class AppModule {}
