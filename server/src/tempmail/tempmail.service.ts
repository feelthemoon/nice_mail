import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TempmailService {
  constructor(private readonly httpService: HttpService, private readonly jwtService: JwtService) {}

  async getTempMail(mailToken: string, count = 1): Promise<any> {
    try {
      if (mailToken) {
        this.jwtService.verify(mailToken);
        return [this.jwtService.decode(mailToken, { json: true })['mail'], mailToken];
      } else {
        return this.generateMail(count);
      }
    } catch (e) {
      return this.generateMail(count);
    }
  }

  private async generateMail(count: number) {
    const mail = await lastValueFrom(
      this.httpService.get(`${process.env.SEC_MAIL_API}?action=genRandomMailbox&count=${count}`),
    );
    const token = this.jwtService.sign({ mail: mail.data }, { expiresIn: '10m' });
    return [mail.data, token];
  }
}
