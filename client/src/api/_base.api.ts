import axios, { AxiosRequestHeaders, AxiosResponse, Method } from 'axios';

export class _BaseApi {
  private readonly _baseUrl: string;
  private _prefix = '/api/v1';

  constructor() {
    this._baseUrl = process.env.VUE_APP_API_URL;
  }
  protected executeRequest(
    route: string,
    method: Method,
    data: unknown = null,
    params: unknown = null,
    headers: AxiosRequestHeaders | undefined = undefined,
    hasPrefix = false
  ): Promise<AxiosResponse> {
    const url = hasPrefix ? this._prefix + this._baseUrl + route : this._baseUrl + route;

    return axios.request({
      url,
      method,
      headers,
      data,
      params,
    });
  }
}
