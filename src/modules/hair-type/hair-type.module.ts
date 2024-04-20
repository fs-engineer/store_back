import { Module } from '@nestjs/common';
import { HairTypeController } from './hair-type.controller';
import { HairTypeService } from './hair-type.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { HairType } from './entity/hair-type.entity';

@Module({
  controllers: [HairTypeController],
  providers: [HairTypeService],
  imports: [SequelizeModule.forFeature([HairType])],
})
export class HairTypeModule {}
