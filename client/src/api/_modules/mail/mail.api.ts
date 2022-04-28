import { _BaseApi } from '@/api/_base.api';
import { AxiosResponse } from 'axios';

export class MailApi extends _BaseApi {
  constructor() {
    super();
  }

  public getRandomMail(token: string): Promise<AxiosResponse> {
    return this.executeRequest('mail/get', 'GET', null, null, { Authorization: token });
  }
}
