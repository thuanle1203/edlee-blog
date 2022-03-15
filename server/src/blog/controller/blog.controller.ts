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
} from '@nestjs/common';
import { BlogService } from '../service/blog.service';
import { Observable, of } from 'rxjs';
import { Blog } from '../model/blog.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserIsAuthorGuard } from '../guards/user-is-author.guard';

export const BLOG_ENTRIES_URL = 'http://localhost:3000/api/blogs';

@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  // @UseGuards(JwtAuthGuard)
  @Post(':userId')
  create(
    @Param('userId') userId: number,
    @Body() blogEntry: Blog,
  ): Observable<Blog> {
    return this.blogService.create(userId, blogEntry);
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

  @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
  @Put(':id')
  updateOne(
    @Param('id') id: number,
    @Body() blogEntry: Blog,
  ): Observable<Blog> {
    return this.blogService.updateOne(Number(id), blogEntry);
  }

  @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: number): Observable<any> {
    return this.blogService.deleteOne(id);
  }
}
