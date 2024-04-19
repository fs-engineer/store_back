import { Module } from '@nestjs/common';
import { ProductCharacteristicController } from './product-characteristic.controller';
import { ProductCharacteristicService } from './product-characteristic.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductCharacteristic } from './entity/product-characteristic.entity';

@Module({
  controllers: [ProductCharacteristicController],
  providers: [ProductCharacteristicService],
  imports: [SequelizeModule.forFeature([ProductCharacteristic])],
})
export class ProductCharacteristicModule {}
