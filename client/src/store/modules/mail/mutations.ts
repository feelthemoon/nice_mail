import { MutationTree } from 'vuex';
import { IMailState } from '@/store/modules/mail/mail.types';

const MailMutations: MutationTree<IMailState> = {
  SET_EMAIL(state: IMailState, email: string) {
    state.email = email;
  },
  SET_MESSAGES(state: IMailState, messages: []) {
    state.messages = messages;
  },
  SET_SOCKET(state: IMailState, socket) {
    state.socket = socket;
  },
};

export default MailMutations;
