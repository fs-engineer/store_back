import { Injectable } from '@nestjs/common';
import { Characteristic } from './entity/characteristic.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCharacteristicDto } from './dto/create-characteristic.dto';

@Injectable()
export class CharacteristicService {
  constructor(
    @InjectModel(Characteristic)
    private readonly characteristicModel: typeof Characteristic,
  ) {}

  async findAllCharacteristics(): Promise<Characteristic[]> {
    return await this.characteristicModel.findAll();
  }

  async addCharacteristic(
    createDto: CreateCharacteristicDto,
  ): Promise<Characteristic> {
    return await this.characteristicModel.create(createDto);
  }
}
