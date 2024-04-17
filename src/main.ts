import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Beauty Store')
  .setDescription('REST API documentation')
  .setVersion('1.0.0')
  .addTag('@kiss.viktory')
  .build();

async function server(): Promise<void> {
  const PORT = process.env.PORT || 3030;
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, (): void => {
    console.log(`Server started on port ${PORT}`);
  });
}

server();
