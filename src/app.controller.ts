import { Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
// import { AppService } from './app.service';

@Controller()
export class CatsController {
  @Post()
  @HttpCode(201)
  create(@Req() req: Request, @Res() res: Response) {
    res.json({
      message: 'Cats Created',
    });
  }

  @Get()
  @HttpCode(200)
  findAll(@Req() req: Request, @Res() res: Response) {
    res.send({
      data: ['Post', 'Post', 'Post', 'Post'],
    });
  }
}
