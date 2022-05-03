export interface IAlert {
  severity: string;
  message: string;
  life?: number;
}
export interface ILoading {
  namespace: string;
  loading: boolean;
}

export interface IRootState {
  token: string;
  alerts: Array<IAlert>;
  loading: Array<ILoading>;
  mailToken: string;
}
