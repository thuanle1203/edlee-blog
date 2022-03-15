import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './services/auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { RoleService } from './services/role.service';
import { PermissionService } from './services/permission.service';
import { RoleEntity } from './models/role.entity';
import { PermissionEntity } from './models/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './controllers/role.controller';
import { PermissionController } from './controllers/permission.controller';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forFeature([RoleEntity]),
    TypeOrmModule.forFeature([PermissionEntity]),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    RolesGuard,
    RoleService,
    PermissionService,
  ],
  exports: [AuthService, RoleService, PermissionService],
  controllers: [RoleController, PermissionController],
})
export class AuthModule {}
