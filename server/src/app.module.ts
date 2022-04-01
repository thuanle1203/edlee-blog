import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalstackModule } from './localstack/localstack.module';
import { CategoryModule } from './category/category.module';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { isAuthenticated } from './middleware/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      username: 'root',
      database: 'nestjs',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '24h' },
    }),

    TaskModule,
    CloudinaryModule,
    AuthModule,
    UserModule,
    BlogModule,
    LocalstackModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, isAuthenticated],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .exclude(
        { path: 'categories', method: RequestMethod.GET },
        { path: 'blogs', method: RequestMethod.GET },
        { path: 'users', method: RequestMethod.GET },
        { path: 'users/login', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}

