import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { map } from 'rxjs/operators';
import { hasRoles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,

    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getClass());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;

    return this.userService.findOne(userId).pipe(
      map((user: User) => {
        const hasRole = () => roles.indexOf(user.role.name) > -1;
        let hasPermission = false;

        if (hasRole()) {
          hasPermission = true;
        }
        return user && hasPermission;
      }),
    );
  }
}
