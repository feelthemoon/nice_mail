import { API } from '@/api';
import { IRootState } from '@/store/modules/root/root.types';
import { ActionTree } from 'vuex';
import { IMailState } from '@/store/modules/mail/mail.types';

const MailActions: ActionTree<IMailState, IRootState> = {
  async getRandomMail({ commit, dispatch, rootGetters }): Promise<void> {
    try {
      const res = await API.MAIL.getRandomMail(rootGetters.token);
    } catch (e) {
      dispatch(
        'updateAlerts',
        { message: `[ERROR]: ${e.response.data?.message || 'Unknown error'}`, severity: 'error' },
        { root: true }
      );
    }
  },
};

export default MailActions;
