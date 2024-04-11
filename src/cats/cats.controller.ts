import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';
import { CatsService } from './cats.services';
import { ICat } from './interfaces';

@Controller('cats')
export class CatsController {
  constructor(
    private catService: CatsService,
    private listAllEntities: ListAllEntities,
  ) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto, @Res() res: Response) {
    this.catService.create(createCatDto);

    res.status(HttpStatus.CREATED).send({
      data: createCatDto,
    });
  }

  @Get()
  async findAll(): Promise<ICat[]> {
    return this.catService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
    @Res() res: Response,
  ) {
    res.status(HttpStatus.CREATED).send({
      data: updateCatDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    res.status(HttpStatus.ACCEPTED).send({
      message: `This action removes a #${id} cat`,
    });
  }
}
