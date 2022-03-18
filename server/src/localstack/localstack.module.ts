import { Module } from '@nestjs/common';
import { LocalstackController } from './controllers/localstack.controller';
import { LocalstackService } from './services/localstack.service';

@Module({
  controllers: [LocalstackController],
  providers: [LocalstackService],
})
export class LocalstackModule {}
