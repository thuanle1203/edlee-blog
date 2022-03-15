import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { hasRoles } from '../decorators/roles.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Role, UserRole } from '../models/role.inteface';
import { RoleService } from '../services/role.service';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll(): Observable<Role[]> {
    return this.roleService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
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
