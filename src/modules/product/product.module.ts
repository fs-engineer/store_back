import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.entity';
import { AuthModule } from '../auth/auth.module';
import { ProductImage } from '../product-image/product-image.entity';

@Module({
    controllers: [ProductController],
    providers: [ProductService],
    imports: [SequelizeModule.forFeature([Product, ProductImage]), AuthModule],
})
export class ProductModule {}
