import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Permission } from '../models/permission.interface';
import { PermissionService } from '../services/permission.service';

@Controller('permissions')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get()
  findAll(): Observable<Permission[]> {
    return this.permissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<Permission> {
    return this.permissionService.findOne(id);
  }

  @Post()
  create(@Body() permission: Permission): Observable<Permission> {
    return this.permissionService.create(permission);
  }
}
