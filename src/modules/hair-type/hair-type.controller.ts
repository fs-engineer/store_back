import { Body, Controller, Get, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { HairTypeService } from './hair-type.service';
import { HairType } from './entity/hair-type.entity';
import { CreateHairTypeDto } from './dto/create-hair-type.dto';
import { Roles } from '../../decorators/role-auth.decorator';
import { roles } from '../../constants';
import { RolesGuard } from '../../guards/roles.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryDto } from '../../common/dto/query.dto';
import { calcTotalPages } from '../../helpers/requests/calcTotalPages';

// TODO need to add swagger
@Controller('hair-types')
export class HairTypeController {
    constructor(private readonly hairTypeService: HairTypeService) {}

    @ApiOperation({ summary: 'Get all hair types' })
    @ApiResponse({ status: HttpStatus.OK, type: [HairType] })
    @Roles([roles.ADMIN])
    @UseGuards(RolesGuard)
    @Get('/all')
    getAll(): Promise<HairType[]> {
        return this.hairTypeService.getAllHairTypes();
    }

    @ApiOperation({ summary: 'Get all hair types by params' })
    @ApiResponse({ status: HttpStatus.OK, type: [HairType] })
    @Roles([roles.ADMIN])
    @UseGuards(RolesGuard)
    @Get()
    async getAllByParams(@Query() query: QueryDto): Promise<{ rows: HairType[]; count: number; totalPages: number }> {
        const { rows, count, pageSize } = await this.hairTypeService.getAllHairTypesByParams(query);
        const totalPages = calcTotalPages(count, pageSize);
        console.log(rows);
        return { rows, count, totalPages };
    }

    @ApiOperation({ summary: 'Create hair type' })
    @ApiResponse({ status: HttpStatus.CREATED, type: [HairType] })
    @Roles([roles.ADMIN])
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() createHairTypeDto: CreateHairTypeDto) {
        return this.hairTypeService.addHairType(createHairTypeDto);
    }
}
