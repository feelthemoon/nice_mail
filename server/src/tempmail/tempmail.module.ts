import { Module } from '@nestjs/common';
import { TempmailController } from './tempmail.controller';
import { TempmailService } from './tempmail.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    HttpModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [TempmailController],
  providers: [TempmailService],
})
export class TempmailModule {}
