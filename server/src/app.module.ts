import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TempmailModule } from './tempmail/tempmail.module';
import { TempmailRestMiddleware } from './tempmail/rest/tempmail.rest.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TempmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TempmailRestMiddleware).exclude('/login', '/register').forRoutes('*');
  }
}
