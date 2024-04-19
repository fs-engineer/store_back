import { Module } from '@nestjs/common';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Type } from './entity/type.entity';

@Module({
  controllers: [TypeController],
  providers: [TypeService],
  imports: [SequelizeModule.forFeature([Type])],
})
export class TypeModule {}
