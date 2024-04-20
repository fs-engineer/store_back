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

interface IAuthRequest extends Request {
  user: User;
}

@ApiTags('Baskets')
@Controller('baskets')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @ApiOperation({ summary: 'Get all baskets' })
  @ApiResponse({ status: HttpStatus.OK, type: [Basket] })
  @Get()
  getAll(): Promise<Basket[]> {
    return this.basketService.getAllBaskets();
  }

  @Post()
  create(@Body() basketDto: CreateBasketDto): Promise<Basket> {
    return this.basketService.createBasket(basketDto);
  }

  @Roles([roles.ADMIN, roles.USER, roles.GUEST])
  @UseGuards(RolesGuard)
  @Get('/user-basket')
  getBasketByUserId(@Req() req: IAuthRequest) {
    const id: number = req.user.id;
    return this.basketService.getBasketByUserId(id);
  }
}
