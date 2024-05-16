import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

const swaggerConfig = new DocumentBuilder()
    .setTitle('Beauty Store')
    .setDescription('REST API documentation')
    .setVersion('1.0.0')
    .addTag('@kiss.viktory')
    .build();

async function server(): Promise<void> {
    const PORT: number = Number(process.env.PORT) || 3030;
    const app: INestApplication<any> = await NestFactory.create(AppModule);

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/api/docs', app, document);

    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, (): void => {
        console.log(`Server started on port ${PORT}`);
    });
}

server();
