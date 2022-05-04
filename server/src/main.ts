import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.APP_POT || 8000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const logger = new Logger();
  await app.listen(PORT, () => logger.verbose(`SERVER STARTED AT PORT ${PORT}`));
}
bootstrap();
