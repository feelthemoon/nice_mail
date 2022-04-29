import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.APP_POT || 8000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT, () => console.log(`SERVER STARTED AT PORT ${PORT}`));
}
bootstrap();
