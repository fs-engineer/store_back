import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../constants';
import { Role } from '../modules/role/entity/role.entity';
import { User } from '../modules/user/user.entity';

// Roles Guard for endpoints
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles: string[] =
        this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()]) || [];
      // TODO need add token save and compare, maybe save to base
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers['authorization'];
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        return false;
      }

      const user: User = this.jwtService.verify(token);
      req.user = user;

      return user?.roles && user.roles.some((role: Role) => requiredRoles.includes(role?.name));
    } catch (e) {
      throw new ForbiddenException();
    }
  }
}
