import { Body, Controller, Get, Post } from '@nestjs/common';
import { HairTypeService } from './hair-type.service';
import { HairType } from './entity/hair-type.entity';
import { CreateHairTypeDto } from './dto/create-hair-type.dto';

// TODO need to add swagger
@Controller('hair-types')
export class HairTypeController {
  constructor(private readonly hairTypeService: HairTypeService) {}

  @Get()
  getAll(): Promise<HairType[]> {
    return this.hairTypeService.getAllHairTypes();
  }

  @Post()
  create(@Body() createHairTypeDto: CreateHairTypeDto) {
    return this.hairTypeService.addHairType(createHairTypeDto);
  }
}
