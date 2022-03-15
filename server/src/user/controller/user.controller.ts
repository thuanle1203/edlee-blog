import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  Res,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User, UserRole } from '../models/user.interface';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import path = require('path');
import { join } from 'path';
import { UserIsUserGuard } from 'src/auth/guards/userIsUser.guard';
import { UserEntity } from '../models/user.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() user: User): Observable<User | any> {
    return this.userService.create(user).pipe(
      map((user: User) => user),
      catchError((err) => of({ error: err.message })),
    );
  }

  @Post('login')
  login(@Body() user: User): Observable<any> {
    return this.userService.login(user).pipe(
      map((jwt: string) => {
        return { access_token: jwt };
      }),
    );
  }

  @Get(':id')
  findOne(@Param() params): Observable<User> {
    return this.userService.findOne(params.id);
  }

  @Get()
  findAll(@Param() params): Observable<User[]> {
    return this.userService.findAll();
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<any> {
    return this.userService.deleteOne(Number(id));
  }

  @UseGuards(JwtAuthGuard, UserIsUserGuard)
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
    return this.userService.updateOne(Number(id), user);
  }

  // @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Put(':id/role')
  updateRoleOfUser(
    @Param('id') id: string,
    @Body() user: User,
  ): Observable<User> {
    return this.userService.updateRoleOfUser(Number(id), user);
  }

  //   @UseGuards(JwtAuthGuard)
  //   @Post('upload')
  //   @UseInterceptors(FileInterceptor('file', storage))
  //   uploadFile(@UploadedFile() file, @Request() req): Observable<any> {
  //     const user: User = req.user;

  //     return this.userService
  //       .updateOne(user.id, { profileImage: file.filename })
  //       .pipe(
  //         tap((user: User) => console.log(user)),
  //         map((user: User) => ({ profileImage: user.profileImage })),
  //       );
  //   }

  @Get('profile-image/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res): Observable<any> {
    return of(
      res.sendFile(join(process.cwd(), 'uploads/profileimages/' + imagename)),
    );
  }
}
