import { Injectable } from '@nestjs/common';
import { Observable, of, from, throwError } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from '../model/blog.entity';
import { Blog } from '../model/blog.interface';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/user/models/user.interface';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
const slugify = require('slugify');

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
    private userService: UserService,
  ) {}

  create(userId: number, blogEntry: Blog): Observable<Blog> {
    return from(this.userService.findOne(userId)).pipe(
      switchMap((user: User) => {
        blogEntry.author = user;
        return this.generateSlug(blogEntry.title).pipe(
          switchMap((slug: string) => {
            blogEntry.slug = slug;
            return from(this.blogRepository.save(blogEntry));
          }),
        );
      }),
    );
  }

  findAll(): Observable<Blog[]> {
    return from(this.blogRepository.find({ relations: ['author'] }));
  }

  findOne(id: number): Observable<Blog> {
    return from(this.blogRepository.findOne({ id }, { relations: ['author'] }));
  }

  findByUser(userId: number): Observable<Blog[]> {
    return from(
      this.blogRepository.find({
        where: {
          author: userId,
        },
        relations: ['author'],
      }),
    ).pipe(map((blogEntries: Blog[]) => blogEntries));
  }

  updateOne(id: number, blogEntry: Blog): Observable<Blog> {
    return from(this.blogRepository.update(id, blogEntry)).pipe(
      switchMap(() => this.findOne(id)),
    );
  }

  deleteOne(id: number): Observable<any> {
    return from(this.blogRepository.delete(id));
  }

  generateSlug(title: string): Observable<string> {
    return of(slugify(title));
  }
}
