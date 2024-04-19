import { Module } from '@nestjs/common';
import { ProductProductTypeMappingController } from './product-product-type-mapping.controller';
import { ProductProductTypeMappingService } from './product-product-type-mapping.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductProductTypeMapping } from './entity/product-product-type-mapping';

@Module({
  controllers: [ProductProductTypeMappingController],
  providers: [ProductProductTypeMappingService],
  imports: [SequelizeModule.forFeature([ProductProductTypeMapping])],
})
export class ProductProductTypeMappingModule {}
