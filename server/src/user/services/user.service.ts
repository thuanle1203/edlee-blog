import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { Role, UserRole } from 'src/auth/models/role.inteface';
import { AuthService } from 'src/auth/services/auth.service';
import { RoleService } from 'src/auth/services/role.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
    private roleService: RoleService,
  ) {}

  findOne(id: number): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: {
          id: id,
        },
        relations: ['role'],
      }),
    ).pipe(
      map((user: User) => {
        return user;
      }),
    );
  }

  findAll(): Observable<User[]> {
    return from(this.userRepository.find()).pipe(
      map((users: User[]) => {
        users.forEach(function (v) {
          delete v.password;
        });
        return users;
      }),
    );
  }

  findByMail(email: string): Observable<User> {
    return from(this.userRepository.findOne({ email }));
  }

  create(user: User): Observable<any> {
    return this.authService.hashPassword(user.password).pipe(
      switchMap((passwordHash: string) => {
        return from(
          this.roleService.findByName(UserRole.USER).pipe(
            map((role: Role) => {
              user.role = role;
              user.password = passwordHash;
              return from(this.userRepository.save(user)).pipe(
                map((user: User) => {
                  const { ...result } = user;
                  return result;
                }),
                catchError((err) => throwError(err)),
              );
            }),
          ),
        );
      }),
    );
  }

  deleteOne(id: number): Observable<any> {
    return from(this.userRepository.delete(id));
  }

  updateOne(id: number, user: User): Observable<any> {
    delete user.email;
    delete user.password;
    delete user.role;

    return from(this.userRepository.update(id, user)).pipe(
      switchMap(() => this.findOne(id)),
    );
  }

  updateRoleOfUser(id: number, user: User): Observable<any> {
    return from(
      this.roleService.findByName(UserRole.ADMIN).pipe(
        map((role: Role) => {
          user.role = role;
          return from(this.userRepository.update(id, user));
        }),
      ),
    );
  }

  login(user: User): Observable<string> {
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user: User) => {
        if (user) {
          return this.authService
            .generateJWT(user)
            .pipe(map((jwt: string) => jwt));
        } else {
          return 'Wrong Credentials';
        }
      }),
    );
  }

  validateUser(email: string, password: string): Observable<User | any> {
    return from(
      this.userRepository.findOne(
        { email },
        {
          select: [
            'id',
            'password',
            'name',
            'username',
            'role',
            'email',
            'profileImage',
          ],
        },
      ),
    ).pipe(
      switchMap((user: User) =>
        this.authService.comparePasswords(password, user.password).pipe(
          map((match: boolean) => {
            if (match) {
              return user;
            } else {
              console.log(password, user.password);
            }
          }),
        ),
      ),
    );
  }
}
