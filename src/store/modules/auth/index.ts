import { Module } from 'vuex';
import { IRootState } from '@/store/modules/root/root.types';
import actions from '@/store/modules/auth/actions';

const AuthModule: Module<null, IRootState> = {
  namespaced: true,
  actions,
};

export default AuthModule;
