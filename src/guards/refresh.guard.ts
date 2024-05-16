import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshJwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        // TODO need add token save and compare
        try {
            const authHeader = req.headers['authorization'];
            const [type, token] = authHeader.split(' ');

            if (type !== 'Refresh' || !token) {
                return false;
            }

            req.user = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_REFRESH_KEY,
            });
            return true;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
