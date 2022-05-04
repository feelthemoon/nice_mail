import { Socket } from 'socket.io-client';

interface IAttachment {
  filename: string;
  contentType: string;
  size: number;
}

export interface IMessage {
  id: number;
  from: string;
  subject: string;
  date: string;
  attachments?: Array<IAttachment>;
  body: string;
  textBody: string;
  htmlBody: string;
}

export interface IMailState {
  email: string;
  messages: [];
  socket: Socket | null;
  currentMessage: IMessage;
}
