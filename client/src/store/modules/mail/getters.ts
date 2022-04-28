import { GetterTree } from 'vuex';
import { IMailState } from '@/store/modules/mail/mail.types';
import { IRootState } from '@/store/modules/root/root.types';

const MailGetters: GetterTree<IMailState, IRootState> = {
  email: (state: IMailState) => state.email,
  messages: (state: IMailState) => state.messages,
};

export default MailGetters;
