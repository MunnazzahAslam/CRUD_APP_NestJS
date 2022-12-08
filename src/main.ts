import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //SWAGGER
  const config = new DocumentBuilder().setTitle('Nest JS Project').build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, document)
  
  await app.listen(3333);
}
bootstrap();
