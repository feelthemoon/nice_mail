import { GetterTree } from 'vuex';
import { IMailState, IMessage } from '@/store/modules/mail/mail.types';
import { IRootState } from '@/store/modules/root/root.types';
import { Socket } from 'socket.io-client';

const MailGetters: GetterTree<IMailState, IRootState> = {
  email: (state: IMailState) => state.email,
  messages: (state: IMailState) => state.messages,
  socket: (state: IMailState): Socket | null => state.socket,
  currentMessage: (state: IMailState): IMessage => state.currentMessage,
};

export default MailGetters;
