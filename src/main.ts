import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService)

  app.use(cookieParser());
  app.enableCors({
    origin: [configService.get('ORIGIN')],
    credentials: true
  });

  await app.listen(5000);
}
bootstrap();
