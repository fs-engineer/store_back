import { Module } from '@nestjs/common';
import { ProductTypeOfProductsMappingController } from './product-type-of-products-mapping.controller';
import { ProductTypeOfProductsMappingService } from './product-type-of-products-mapping.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductTypeOfProductsMapping } from './entity/product-type-of-products-mapping.entity';

@Module({
  controllers: [ProductTypeOfProductsMappingController],
  providers: [ProductTypeOfProductsMappingService],
  imports: [SequelizeModule.forFeature([ProductTypeOfProductsMapping])],
})
export class ProductTypeOfProductsMappingModule {}
