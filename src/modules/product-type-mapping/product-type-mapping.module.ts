import { Module } from '@nestjs/common';
import { ProductTypeMappingController } from './product-type-mapping.controller';
import { ProductTypeMappingService } from './product-type-mapping.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductTypeMapping } from './entity/product-type-mapping';

@Module({
  controllers: [ProductTypeMappingController],
  providers: [ProductTypeMappingService],
  imports: [SequelizeModule.forFeature([ProductTypeMapping])],
})
export class ProductTypeMappingModule {}
