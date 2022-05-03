import { API } from '@/api';
import { IRootState } from '@/store/modules/root/root.types';
import { ActionTree } from 'vuex';
import { IMailState } from '@/store/modules/mail/mail.types';

const MailActions: ActionTree<IMailState, IRootState> = {
  async getRandomMail(
    { commit, dispatch, rootGetters },
    { force }: { force: boolean } = { force: false }
  ): Promise<void> {
    try {
      commit('UPDATE_LOADING', { namespace: 'tempbox', loading: true }, { root: true });
      const mailToken = force ? '' : rootGetters.mailToken;
      const res = await API.MAIL.getRandomMail(mailToken);
      commit('SET_EMAIL', res.data.mail[0]);
      commit('SET_MAIL_TOKEN', res.headers['mail-token'], { root: true });
    } catch (e: any) {
      dispatch(
        'updateAlerts',
        {
          message: e.response?.data.error ?? 'Unknown error',
          severity: 'error',
        },
        { root: true }
      );
    } finally {
      commit('UPDATE_LOADING', { namespace: 'tempbox', loading: false }, { root: true });
    }
  },
};

export default MailActions;
