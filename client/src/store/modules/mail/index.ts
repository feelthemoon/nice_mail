import { Module } from 'vuex';
import { IRootState } from '@/store/modules/root/root.types';
import { IMailState } from '@/store/modules/mail/mail.types';
import actions from '@/store/modules/mail/actions';
import getters from '@/store/modules/mail/getters';
import mutations from '@/store/modules/mail/mutations';
import state from '@/store/modules/mail/state';

const MailModule: Module<IMailState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default MailModule;
