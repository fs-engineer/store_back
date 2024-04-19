import { Module } from '@nestjs/common';
import { ProductCharacteristicMappingController } from './product-characteristic-mapping.controller';
import { ProductCharacteristicMappingService } from './product-characteristic-mapping.service';
import { ProductCharacteristicMapping } from './entity/product-characteristic-mapping.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [ProductCharacteristicMappingController],
  providers: [ProductCharacteristicMappingService],
  imports: [SequelizeModule.forFeature([ProductCharacteristicMapping])],
})
export class ProductCharacteristicMappingModule {}
