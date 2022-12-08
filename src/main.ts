import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //SWAGGER
  const config = new DocumentBuilder().setTitle('Nest JS Project')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'JWT',
    ).build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, document)
  
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3333);
}
bootstrap();
