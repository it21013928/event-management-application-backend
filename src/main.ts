import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors();
  app.use(helmet());

  await app.listen(5000);

  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((reason) => {
  Logger.warn('Failed to start the server');
  Logger.error(reason);
});
