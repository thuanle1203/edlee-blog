import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { Repository } from 'typeorm';
import { PermissionEntity } from '../models/permission.entity';
import { Permission } from '../models/permission.interface';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  create(permission: Permission): Observable<Permission> {
    return from(this.permissionRepository.save(permission)).pipe(
      map((permission: Permission) => {
        return permission;
      }),
      catchError((err) => throwError(err)),
    );
  }

  findAll(): Observable<Permission[]> {
    return from(this.permissionRepository.find());
  }

  findOne(id: number): Observable<Permission> {
    return from(this.permissionRepository.findOne({ id }));
  }

  findByIds(permissionIds: number[]): Observable<Permission[]> {
    return from(
      this.permissionRepository
        .createQueryBuilder('permission')
        .where('permission.id IN (:permissionIds)', {
          permissionIds: permissionIds,
        })
        .getMany(),
    );
  }

  //   findByUser(userId: number): Observable<permission[]> {
  //     return from(
  //       this.permissionRepository.find({
  //         where: {
  //           author: userId,
  //         },
  //         relations: ['author'],
  //       }),
  //     ).pipe(map((permissionEntries: permission[]) => permissionEntries));
  //   }

  updateOne(id: number, permission: Permission): Observable<Permission> {
    return from(this.permissionRepository.update(id, permission)).pipe(
      switchMap(() => this.findOne(id)),
    );
  }

  deleteOne(id: number): Observable<any> {
    return from(this.permissionRepository.delete(id));
  }
}
