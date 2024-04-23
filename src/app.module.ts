import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';

import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { BrandModule } from './modules/brand/brand.module';
import { CountryModule } from './modules/country/country.module';
import { TypeModule } from './modules/type/type.module';
import { HairTypeModule } from './modules/hair-type/hair-type.module';
import { UserRoleModule } from './modules/user-role-mapping/user-role.module';
import { ProductTypeMappingModule } from './modules/product-type-mapping/product-type-mapping.module';
import { ProductHairTypeMappingModule } from './modules/product-hair-type-mapping/product-hair-type-mapping.module';
import { CharacteristicModule } from './modules/characteristic/characteristic.module';
// eslint-disable-next-line max-len
import { ProductCharacteristicMappingModule } from './modules/product-characteristic-mapping/product-characteristic-mapping.module';
import { BasketModule } from './modules/basket/basket.module';

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
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false, // Установите в false, если вы не хотите проверять SSL-сертификат
                },
            },
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
