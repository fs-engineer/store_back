import { Body, Controller, Get, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../../decorators/role-auth.decorator';
import { roles } from '../../constants';
import { RolesGuard } from '../../guards/roles.guard';
import { Product } from './product.entity';
import { QueryDto } from '../../common/dto/query.dto';
import { calcTotalPages } from '../../helpers/requests/calcTotalPages';

// TODO need to add swagger and role guard
@Controller('products')
export class ProductController {
    constructor(private readonly productsService: ProductService) {}

    @ApiOperation({ summary: 'Create product' })
    @ApiResponse({ status: HttpStatus.CREATED, type: [Product] })
    @Roles([roles.ADMIN])
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() productDto: CreateProductDto) {
        return this.productsService.createProduct(productDto);
    }

    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: HttpStatus.OK, type: [Product] })
    @Roles([roles.ADMIN])
    @UseGuards(RolesGuard)
    @Get('/all')
    getAll() {
        return this.productsService.getAllProducts();
    }

    @ApiOperation({ summary: 'Get all products by params' })
    @ApiResponse({ status: HttpStatus.OK, type: [Product] })
    @Roles([roles.ADMIN, roles.USER, roles.GUEST])
    @UseGuards(RolesGuard)
    @Get()
    async getAllByParams(@Query() query: QueryDto): Promise<{ rows: Product[]; count: number; totalPages: number }> {
        const { rows, count, pageSize } = await this.productsService.getAllProductsByParams(query);
        const totalPages = calcTotalPages(count, pageSize);

        return { rows, count, totalPages };
    }

    @ApiOperation({ summary: 'Get product by id' })
    @ApiResponse({ status: HttpStatus.OK, type: [Product] })
    @Roles([roles.ADMIN, roles.USER, roles.GUEST])
    @UseGuards(RolesGuard)
    @Get('/:id')
    async getById(@Param('id') id: number) {
        return await this.productsService.getProductById(Number(id));
    }
}
