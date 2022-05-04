import { Module } from '@nestjs/common';
import { TempmailController } from './rest/tempmail.controller';
import { TempmailService } from './tempmail.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TempmailGateway } from './socket/tempmail.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    HttpModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [TempmailController],
  providers: [TempmailService, TempmailGateway],
})
export class TempmailModule {}
