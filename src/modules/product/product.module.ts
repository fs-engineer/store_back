import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    controllers: [ProductController],
    providers: [ProductService],
    imports: [SequelizeModule.forFeature([Product]), AuthModule],
})
export class ProductModule {}
