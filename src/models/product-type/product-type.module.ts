import { Module } from '@nestjs/common';
import { ProductTypeController } from './product-type.controller';
import { ProductTypeService } from './product-type.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductType } from './entity/product-type.entity';

@Module({
  controllers: [ProductTypeController],
  providers: [ProductTypeService],
  imports: [SequelizeModule.forFeature([ProductType])],
})
export class ProductTypeModule {}
