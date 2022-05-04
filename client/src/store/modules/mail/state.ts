import { IMailState } from '@/store/modules/mail/mail.types';

const MailState: IMailState = {
  email: '',
  messages: [],
  socket: null,
  currentMessage: Object(),
};

export default MailState;
