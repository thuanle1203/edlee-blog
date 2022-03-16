import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { hasPermissions } from '../decorators/permissions.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PermissionGuard } from '../guards/permission.guard';
import { UserPermission } from '../models/permission.interface';
import { Role } from '../models/role.inteface';
import { RoleService } from '../services/role.service';

@hasPermissions(UserPermission.ROLE)
@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  findAll(): Observable<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<Role> {
    return this.roleService.findOne(id);
  }

  @Post()
  create(@Body() role: Role): Observable<Role> {
    return this.roleService.create(role);
  }

  @Post(':id/addPermissions')
  addPermission(@Param('id') id: number, @Body() data: any): Observable<Role> {
    return this.roleService.setPermissions(id, data.permissionIds);
  }
}
