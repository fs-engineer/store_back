import { Body, Controller, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { RefreshJwtAuthGuard } from '../../guards/refresh.guard';
import { IAuthRequest } from '../../interfaces/user.interface';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: HttpStatus.OK, type: User })
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({ summary: 'User registration' })
    @ApiResponse({ status: HttpStatus.CREATED, type: User })
    @Post('/register')
    register(@Body() userDto: CreateUserDto) {
        return this.authService.register(userDto);
    }

    @UseGuards(RefreshJwtAuthGuard)
    @Post('/refresh')
    refreshToken(@Req() req: IAuthRequest) {
        return this.authService.refreshToken(req.user);
    }
}
