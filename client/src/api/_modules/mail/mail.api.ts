import { _BaseApi } from '@/api/_base.api';
import { AxiosResponse } from 'axios';

export class MailApi extends _BaseApi {
  constructor() {
    super();
  }

  public getRandomMail(mailToken: string): Promise<AxiosResponse> {
    return this.executeRequest(true, 'mail', 'GET', null, null, { 'Mail-Token': mailToken });
  }
}
