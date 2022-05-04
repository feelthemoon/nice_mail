import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getMessages(mail: string) {
    const [login, domain] = mail.split('@');

    const messages = await lastValueFrom(
      this.httpService.get(
        `${process.env.SEC_MAIL_API}?action=getMessages&login=${login}&domain=${domain}`,
      ),
    );
    return messages.data;
  }

  async readMessage(mail: string, id: number) {
    const [login, domain] = mail.split('@');

    const messageContent = await lastValueFrom(
      this.httpService.get(
        `${process.env.SEC_MAIL_API}?action=readMessage&login=${login}&domain=${domain}&id=${id}`,
      ),
    );
    if (messageContent.data === 'Message not found') {
      throw new NotFoundException();
    }
    return messageContent.data;
  }

  private async generateMail(count: number) {
    const mail = await lastValueFrom(
      this.httpService.get(`${process.env.SEC_MAIL_API}?action=genRandomMailbox&count=${count}`),
    );
    const token = this.jwtService.sign({ mail: mail.data }, { expiresIn: '10m' });
    return [mail.data, token];
  }
}
