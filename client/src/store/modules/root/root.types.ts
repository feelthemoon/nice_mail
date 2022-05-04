export interface IAlert {
  severity: string;
  message: string;
  life?: number;
}
export interface ILoading {
  namespace: string;
  loading: boolean;
}
export interface IError {
  id: number;
  namespace: string;
  statusCode: number;
  message: string;
}

export interface IRootState {
  token: string;
  alerts: Array<IAlert>;
  loading: Array<ILoading>;
  mailToken: string;
  errors: Array<IError>;
}
