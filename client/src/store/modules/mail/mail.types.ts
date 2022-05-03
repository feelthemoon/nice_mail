import { Socket } from 'socket.io-client';

export interface IMailState {
  email: string;
  messages: [];
  socket: Socket | null;
}
