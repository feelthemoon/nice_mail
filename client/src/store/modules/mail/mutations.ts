import { MutationTree } from 'vuex';
import { IMailState, IMessage } from '@/store/modules/mail/mail.types';
import { Socket } from 'socket.io-client';

const MailMutations: MutationTree<IMailState> = {
  SET_EMAIL(state: IMailState, email: string) {
    state.email = email;
  },
  SET_MESSAGES(state: IMailState, messages: []) {
    state.messages = messages;
  },
  SET_SOCKET(state: IMailState, socket: Socket | null) {
    state.socket = socket;
  },
  SET_CURRENT_MESSAGE(state: IMailState, message: IMessage) {
    state.currentMessage = message;
  },
};

export default MailMutations;
