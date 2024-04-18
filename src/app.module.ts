import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';

import { User } from './models/user/user.entity';
import { Role } from './models/role/entity/role.entity';
import { UserModule } from './models/user/user.module';
import { RoleModule } from './models/role/role.module';
import { UserRole } from './models/role/entity/user-role.entity';
import { AuthModule } from './models/auth/auth.module';
import { ProductModule } from './models/product/product.module';
import { BrandModule } from './models/brand/brand.module';
import { CountryModule } from './models/country/country.module';
import { ProductTypeModule } from './models/product-type/product-type.module';

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
      models: [User, Role, UserRole],
      autoLoadModels: true,
    }),
    UserModule,
    RoleModule,
    AuthModule,
    ProductModule,
    BrandModule,
    CountryModule,
    ProductTypeModule,
  ],
})
export class AppModule {}
