import { AuthApi } from '@/api/_modules/auth/auth.api';
import { MailApi } from '@/api/_modules/mail/mail.api';

export const API = { AUTH: new AuthApi(), MAIL: new MailApi() };
