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
import { ProductTypeModule } from './models/product-type/product-type.module';
import { HairTypeModule } from './models/hair-type/hair-type.module';
import { UserRole } from './models/role/entity/user-role.entity';
import { ProductTypeMapping } from './models/product-type/entity/product-type-mapping.entity';
import { ProductHairTypeMapping } from './models/hair-type/entity/product-hair-type-mapping.entity';

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
      models: [UserRole, ProductTypeMapping, ProductHairTypeMapping],
      autoLoadModels: true,
    }),
    UserModule,
    RoleModule,
    AuthModule,
    ProductModule,
    BrandModule,
    CountryModule,
    ProductTypeModule,
    HairTypeModule,
  ],
})
export class AppModule {}
