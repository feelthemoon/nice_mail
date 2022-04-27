import { _BaseApi } from '@/api/_base.api';
import { IUserDto } from '@/api/_modules/auth/user.dto';
import { AxiosResponse } from 'axios';

export class AuthApi extends _BaseApi {
  constructor() {
    super();
  }
  public login(user: IUserDto): Promise<AxiosResponse> {
    return this.executeRequest('login', 'POST', user);
  }
  public register(user: IUserDto): Promise<AxiosResponse> {
    return this.executeRequest('register', 'POST', user);
  }
}
