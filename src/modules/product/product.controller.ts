import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

// TODO need to add swagger and role guard
@Controller('products')
export class ProductController {
    constructor(private readonly productsService: ProductService) {}

    @Post()
    create(@Body() productDto: CreateProductDto) {
        return this.productsService.createProduct(productDto);
    }

    @Get()
    getAll() {
        return this.productsService.getAllProducts();
    }
}
