import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(port).then(() => {
    Logger.log(`Listening on port ${port}`);
  });
}

bootstrap();
