import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';

async function server(): Promise<void> {
  const PORT = process.env.PORT || 7070;
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, (): void => {
    console.log(`Server started on port ${PORT}`);
  });
}

server();
