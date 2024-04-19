import { Module } from '@nestjs/common';
import { ProductHairTypeMappingController } from './product-hair-type-mapping.controller';
import { ProductHairTypeMappingService } from './product-hair-type-mapping.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductHairTypeMapping } from './entity/product-hair-type-mapping.entity';

@Module({
  controllers: [ProductHairTypeMappingController],
  providers: [ProductHairTypeMappingService],
  imports: [SequelizeModule.forFeature([ProductHairTypeMapping])],
})
export class ProductHairTypeMappingModule {}
