import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Query,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BlogService } from '../service/blog.service';
import { Observable, of } from 'rxjs';
import { Blog } from '../model/blog.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserIsAuthorGuard } from '../guards/user-is-author.guard';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/models/role.inteface';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';

export const BLOG_ENTRIES_URL = 'http://localhost:3000/api/blogs';

@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post(':userId')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Param('userId') userId: number,
    @Body() blogEntry: Blog,
    @UploadedFile() file: Express.Multer.File,
  ): Observable<Blog> {
    return this.blogService.create(userId, blogEntry, file);
  }

  // @Get()
  // findBlogEntries(@Query('userId') userId: number): Observable<BlogEntry[]> {
  //     if(userId == null) {
  //         return this.blogService.findAll();
  //     } else {
  //         return this.blogService.findByUser(userId);
  //     }
  // }

  @Get()
  findAll(): Observable<Blog[]> {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<Blog> {
    return this.blogService.findOne(id);
  }

  @Put(':id')
  updateOne(
    @Param('id') id: number,
    @Body() blogEntry: Blog,
  ): Observable<Blog> {
    return this.blogService.updateOne(Number(id), blogEntry);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number): Observable<any> {
    return this.blogService.deleteOne(id);
  }
}
