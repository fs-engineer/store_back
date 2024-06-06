import { Body, Controller, Get, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { CharacteristicService } from './characteristic.service';
import { Characteristic } from './entity/characteristic.entity';
import { CreateCharacteristicDto } from './dto/create-characteristic.dto';
import { QueryDto } from '../../common/dto/query.dto';
import { calcTotalPages } from '../../helpers/requests/calcTotalPages';
import { Roles } from '../../decorators/role-auth.decorator';
import { roles } from '../../constants';
import { RolesGuard } from '../../guards/roles.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

// TODO need to add swagger and roles guard
@Controller('characteristics')
export class CharacteristicController {
    constructor(private characteristicService: CharacteristicService) {}

    @ApiOperation({ summary: 'Get all characteristic' })
    @ApiResponse({ status: HttpStatus.OK, type: [Characteristic] })
    @Roles([roles.ADMIN])
    @UseGuards(RolesGuard)
    @Get('/all')
    getAll() {
        return this.characteristicService.findAll();
    }

    @ApiOperation({ summary: 'Get all characteristic by params' })
    @ApiResponse({ status: HttpStatus.OK, type: [Characteristic] })
    @Roles([roles.ADMIN])
    @UseGuards(RolesGuard)
    @Get()
    async getAllByParams(
        @Query() query: QueryDto,
    ): Promise<{ rows: Characteristic[]; count: number; totalPages: number }> {
        const { rows, count, pageSize } = await this.characteristicService.findAllByParams(query);
        const totalPages = calcTotalPages(count, pageSize);

        return { rows, count, totalPages };
    }

    @Roles([roles.ADMIN])
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() createDto: CreateCharacteristicDto): Promise<Characteristic> {
        return this.characteristicService.add(createDto);
    }
}
