/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { from, map, Observable, switchMap } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/services/user.service';
import { Permission } from '../models/permission.interface';
import { PermissionService } from '../services/permission.service';
import { RoleService } from '../services/role.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
    private roleService: RoleService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getClass(),
    );
    if (!permissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;

    return this.userService.findOne(userId).pipe(
      switchMap((user: User) => {
        return from(this.roleService.findPermissions(user.role.name)).pipe(
          map((p: string[]) => {
            const hasPermission = permissions.every(
              (element) => p.indexOf(element) > -1,
            );
            return hasPermission;
          }),
        );
      }),
    );
  }
}
