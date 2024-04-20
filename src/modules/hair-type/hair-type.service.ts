import { Injectable } from '@nestjs/common';
import { HairType } from './entity/hair-type.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateHairTypeDto } from './dto/create-hair-type.dto';

@Injectable()
export class HairTypeService {
  constructor(@InjectModel(HairType) private hairTypeModel: typeof HairType) {}

  async getAllHairTypes(): Promise<HairType[]> {
    return await this.hairTypeModel.findAll();
  }

  async addHairType(createHairTypeDto: CreateHairTypeDto) {
    return await this.hairTypeModel.create(createHairTypeDto);
  }
}
