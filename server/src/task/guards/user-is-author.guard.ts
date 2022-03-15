import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { switchMap, map } from 'rxjs/operators';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.entity';

@Injectable()
export class UserIsAuthorGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private taskService: TaskService,
  ) {}

  canActivate(context: ExecutionContext): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;
    const taskId = Number(params.id);
    const user: User = request.user;

    return this.userService.findOne(user.id).pipe(
      switchMap((user: User) =>
        this.taskService.findOne(taskId).pipe(
          map((task: Task) => {
            let hasPermission = false;

            if (user.id === task.assignedPerson.id) {
              hasPermission = true;
            }

            return user && hasPermission;
          }),
        ),
      ),
    );
  }
}
