import { Module } from '@nestjs/common';
import { CatsService } from './cats/cats.services';
import { CatsController } from './cats/cats.controller';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
