import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Type } from './entity/type.entity';
import { CreateTypeDto } from './dto/create-type.dto';

@Injectable()
export class TypeService {
    constructor(@InjectModel(Type) private productTypeModel: typeof Type) {}

    async createProductType(productTypeDto: CreateTypeDto): Promise<Type> {
        return await this.productTypeModel.create(productTypeDto);
    }

    async getAllProductTypes(): Promise<Type[]> {
        return await this.productTypeModel.findAll();
    }
}
