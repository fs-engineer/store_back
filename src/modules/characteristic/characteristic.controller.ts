import { Body, Controller, Get, Post } from '@nestjs/common';
import { CharacteristicService } from './characteristic.service';
import { Characteristic } from './entity/characteristic.entity';
import { CreateCharacteristicDto } from './dto/create-characteristic.dto';

// TODO need to add swagger and roles guard
@Controller('characteristics')
export class CharacteristicController {
  constructor(private characteristicService: CharacteristicService) {}

  @Get()
  getAll() {
    return this.characteristicService.findAllCharacteristics();
  }

  @Post()
  create(@Body() createDto: CreateCharacteristicDto): Promise<Characteristic> {
    return this.characteristicService.addCharacteristic(createDto);
  }
}
