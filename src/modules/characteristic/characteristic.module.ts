import { Module } from '@nestjs/common';
import { CharacteristicController } from './characteristic.controller';
import { CharacteristicService } from './characteristic.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Characteristic } from './entity/characteristic.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    controllers: [CharacteristicController],
    providers: [CharacteristicService],
    imports: [SequelizeModule.forFeature([Characteristic]), AuthModule],
})
export class CharacteristicModule {}
