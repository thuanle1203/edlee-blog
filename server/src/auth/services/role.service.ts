import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { Repository } from 'typeorm';
import { RoleEntity } from '../models/role.entity';
import { Role } from '../models/role.inteface';
import { PermissionService } from './permission.service';
import { Permission } from '../models/permission.interface';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private permissionService: PermissionService,
  ) {}

  create(role: Role): Observable<Role> {
    return from(this.roleRepository.save(role)).pipe(
      map((role: Role) => {
        return role;
      }),
      catchError((err) => throwError(err)),
    );
  }

  setPermissions(id: number, permissionIds: number[]): Observable<any> {
    return from(this.permissionService.findByIds(permissionIds)).pipe(
      switchMap((permissions: Permission[]) => {
        return from(this.roleRepository.findOne({ id })).pipe(
          switchMap((role: Role) => {
            role.permissions = permissions;
            return from(this.roleRepository.save(role)).pipe(
              map((role: Role) => {
                return role;
              }),
              catchError((err) => throwError(err)),
            );
          }),
        );
      }),
    );
  }

  findAll(): Observable<Role[]> {
    return from(this.roleRepository.find());
  }

  findOne(id: number): Observable<Role> {
    return from(this.roleRepository.findOne({ id })).pipe(
      map((role: Role) => {
        return role;
      }),
    );
  }

  findByName(roleName: string): Observable<Role> {
    return from(this.roleRepository.findOne({ name: roleName }));
  }

  findPermissions(name: string): Observable<string[]> {
    return from(
      this.roleRepository.findOne({
        where: {
          name: name,
        },
        relations: ['permissions'],
      }),
    ).pipe(
      map((role: Role) => {
        const permissionNameList = role.permissions.map(
          (permission: Permission) => permission.name,
        );
        return permissionNameList;
      }),
    );
  }

  //   findByUser(userId: number): Observable<Role[]> {
  //     return from(
  //       this.roleRepository.find({
  //         where: {
  //           author: userId,
  //         },
  //         relations: ['author'],
  //       }),
  //     ).pipe(map((roleEntries: Role[]) => roleEntries));
  //   }

  updateOne(id: number, role: Role): Observable<Role> {
    return from(this.roleRepository.update(id, role)).pipe(
      switchMap(() => this.findOne(id)),
    );
  }

  deleteOne(id: number): Observable<any> {
    return from(this.roleRepository.delete(id));
  }
}
