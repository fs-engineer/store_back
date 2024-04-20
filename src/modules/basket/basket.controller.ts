import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { Basket } from './entity/basket.entity';
import { CreateBasketDto } from './dto/create-basket.dto';
import { Roles } from '../../decorators/role-auth.decorator';
import { roles } from '../../constants';
import { RolesGuard } from '../../guards/roles.guard';
import { User } from '../user/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IBasketResponse } from './basket.interface';

interface IAuthRequest extends Request {
  user: User;
}

@ApiTags('Baskets')
@Controller('baskets')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @ApiOperation({ summary: 'Get all baskets' })
  @ApiResponse({ status: HttpStatus.OK, type: [Basket] })
  @Roles([roles.ADMIN])
  @UseGuards(RolesGuard)
  @Get()
  getAll(): Promise<Basket[]> {
    return this.basketService.getAllBaskets();
  }

  @ApiOperation({
    summary: 'Add basket "put some product to the basket" for logged on users',
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: Basket })
  @Roles([roles.ADMIN, roles.USER])
  @UseGuards(RolesGuard)
  @Post()
  createForAuthUsers(@Body() basketDto: CreateBasketDto): Promise<Basket> {
    return this.basketService.createBasketByUserId(basketDto);
  }

  @ApiOperation({ summary: "Get user's basket" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Basket],
  })
  @Roles([roles.ADMIN, roles.USER])
  @UseGuards(RolesGuard)
  @Get('/user-basket')
  getBasketForAuthUsers(@Req() req: IAuthRequest): Promise<IBasketResponse> {
    const id: number = req.user.id;
    return this.basketService.getBasketByUserId(id);
  }
}
