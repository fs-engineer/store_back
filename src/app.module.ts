import { Module } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Dialect } from 'sequelize';
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
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

const sequelizeConfig = (): SequelizeModuleOptions => {
    const config = {
        dialect: 'postgres' as Dialect,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadModels: true,
        dialectOptions: {},
    };

    if (process.env.NODE_ENV !== 'development') {
        config.dialectOptions = {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Установите в false, если вы не хотите проверять SSL-сертификат
            },
        };
    }

    return config;
};

const prometheusConfig = {
    path: '/metrics',
    defaultMetrics: {
        enabled: true,
    },
};

@Module({
    // providers: [
    //     {
    //         provide: APP_INTERCEPTOR,
    //         useClass: LoggingInterceptor,
    //     },
    // ],
    imports: [
        ConfigModule.forRoot({
            envFilePath: process.env.NODE_ENV === 'development' ? '.env.development' : '.env',
        }),
        SequelizeModule.forRoot(sequelizeConfig()),
        PrometheusModule.register(prometheusConfig),
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
