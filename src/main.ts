import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  await app.listen(5050, (): void => {
    console.log('Server started on port 3000');
  });
}
bootstrap();
