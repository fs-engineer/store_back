import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { BasketService } from './basket.service';
import { Basket } from './entity/basket.entity';
import { CreateBasketDto } from './dto/create-basket.dto';
import { Roles } from '../../decorators/role-auth.decorator';
import { roles } from '../../constants';
import { RolesGuard } from '../../guards/roles.guard';
import { User } from '../user/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IBasketDeleteResponse, IBasketResponse } from './basket.interface';
import { IAuthRequest } from '../../interfaces/user.interface';
import { getUserFromReq } from '../../helpers/requests/getUserFromReq';

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
  createForAuthUsers(@Body() basketDto: CreateBasketDto, @Req() req: IAuthRequest): Promise<Basket> {
    const user: User = getUserFromReq(req);
    const id: number = user.id;
    return this.basketService.createBasketByUserId(basketDto, id);
  }

  @ApiOperation({ summary: "Get user's basket" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Basket],
  })
  @Roles([roles.ADMIN, roles.USER])
  @UseGuards(RolesGuard)
  @Get('/user-basket')
  getBasketAuthUsers(@Req() req: IAuthRequest): Promise<IBasketResponse> {
    const user: User = getUserFromReq(req);
    const id: number = user.id;
    return this.basketService.getBasketByUserId(id);
  }

  @ApiOperation({ summary: 'Delete basket by userId' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: String,
  })
  @Roles([roles.ADMIN, roles.USER])
  @UseGuards(RolesGuard)
  @Delete('/user-basket/delete')
  deleteBasketByUserId(@Req() req: IAuthRequest): Promise<IBasketDeleteResponse> {
    const user: User = getUserFromReq(req);
    return this.basketService.deleteBasketByAuthUserId(user.id);
  }

  @ApiOperation({ summary: 'Delete product from the user basket by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: String,
  })
  @Roles([roles.ADMIN, roles.USER])
  @UseGuards(RolesGuard)
  @Delete('/user-basket/:id')
  deleteProductById(@Param('id') id: number): Promise<IBasketDeleteResponse> {
    return this.basketService.deleteProductByIdAuthUsers(id);
  }
}
