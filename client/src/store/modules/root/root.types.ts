export interface IAlert {
  severity: string;
  message: string;
  life?: number;
}

export interface IRootState {
  token: null | string;
  alerts: Array<IAlert>;
}
