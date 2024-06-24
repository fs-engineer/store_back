import { Module } from '@nestjs/common';
import { ProductImageController } from './product-image.controller';
import { ProductImageService } from './product-image.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    controllers: [ProductImageController],
    providers: [ProductImageService, SequelizeModule],
})
export class ProductImageModule {}
