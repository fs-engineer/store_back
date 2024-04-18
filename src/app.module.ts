import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';

import { User } from './models/users/users.model';
import { Role } from './models/roles/roles.model';
import { UsersModule } from './models/users/users.module';
import { RolesModule } from './models/roles/roles.module';
import { UserRoles } from './models/roles/user-roles.model';
import { AuthModule } from './models/auth/auth.module';
import { ProductsModule } from './models/products/products.module';
import { BrandsModule } from './models/brands/brands.module';
import { CountriesModule } from './models/countries/countries.module';
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
      models: [User, Role, UserRoles],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    ProductsModule,
    BrandsModule,
    CountriesModule,
    ProductTypeModule,
  ],
})
export class AppModule {}
