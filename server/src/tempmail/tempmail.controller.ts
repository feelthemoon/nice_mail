import { Controller, Get, Req, Res } from '@nestjs/common';
import { TempmailService } from './tempmail.service';
import { Request, Response } from 'express';

@Controller('api/v1')
export class TempmailController {
  constructor(private readonly tempmailService: TempmailService) {}

  @Get('/mail')
  async getTempMail(@Req() req: Request, @Res() res: Response) {
    try {
      const [mail, token] = await this.tempmailService.getTempMail(
        req.headers['mail-token'].toString(),
      );
      res.setHeader('Access-Control-Expose-Headers', 'Mail-Token');
      res.setHeader('Mail-Token', token);
      res.status(200).send({ mail });
    } catch (e) {
      res.status(500).send({ error: 'Server error' });
    }
  }
}
