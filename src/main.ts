import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function server(): Promise<void> {
  const PORT = process.env.PORT || 3030;
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Beauty Store')
    .setDescription('REST API documentation')
    .setVersion('1.0.0')
    .addTag('@kiss.viktory')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, (): void => {
    console.log(`Server started on port ${PORT}`);
  });
}

server();
