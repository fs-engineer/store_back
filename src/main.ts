import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = 5050;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  await app.listen(port, (): void => {
    console.log(`Server started on port ${port}`);
  });
}

bootstrap();
