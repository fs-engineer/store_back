import { Body, Controller, Get, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { Type } from './entity/type.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../decorators/role-auth.decorator';
import { roles } from '../../constants';
import { RolesGuard } from '../../guards/roles.guard';
import { QueryDto } from '../../common/dto/query.dto';
import { calcTotalPages } from '../../helpers/requests/calcTotalPages';

@ApiTags('ProductTypes')
@Controller('product-types')
export class TypeController {
    constructor(private productTypeService: TypeService) {}

    @ApiOperation({ summary: 'Get all product types' })
    @ApiResponse({ status: HttpStatus.OK, type: [Type] })
    @Roles([roles.ADMIN])
    @UseGuards(RolesGuard)
    @Get('/all')
    async getAll(): Promise<{ rows: Type[] }> {
        return await this.productTypeService.getAllProductTypes();
    }

    @ApiOperation({ summary: 'Get all product types by params' })
    @ApiResponse({ status: HttpStatus.OK, type: [Type] })
    @Roles([roles.ADMIN])
    @UseGuards(RolesGuard)
    @Get()
    async getAllByParams(@Query() query: QueryDto): Promise<{ rows: Type[]; count: number; totalPages: number }> {
        const { rows, count, pageSize } = await this.productTypeService.getAllProductTypesByParams(query);
        const totalPages = calcTotalPages(count, pageSize);

        return { rows, count, totalPages };
    }

    @Roles([roles.ADMIN])
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() typeDto: CreateTypeDto): Promise<Type> {
        return this.productTypeService.createProductType(typeDto);
    }
}
