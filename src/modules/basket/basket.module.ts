import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Basket } from './entity/basket.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [SequelizeModule.forFeature([Basket]), AuthModule],
})
export class BasketModule {}
