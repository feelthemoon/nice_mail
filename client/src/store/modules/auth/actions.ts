import { API } from '@/api';
import { IRootState } from '@/store/modules/root/root.types';
import { ActionTree } from 'vuex';
import { IUserDto } from '@/api/_modules/auth/user.dto';

const AuthActions: ActionTree<null, IRootState> = {
  async login({ commit, dispatch }, userData: IUserDto) {
    try {
      const res = await API.AUTH.login(userData);
      commit('SET_TOKEN', res.data.headers.authorization, { root: true });
    } catch (e: any) {
      dispatch(
        'updateAlerts',
        { message: e.response?.data.error ?? 'Unknown error', severity: 'error' },
        { root: true }
      );
    }
  },
  async register({ commit, dispatch }, userData: IUserDto) {
    try {
      const res = await API.AUTH.register(userData);
      commit('SET_TOKEN', res.data.headers.authorization, { root: true });
    } catch (e: any) {
      dispatch(
        'updateAlerts',
        { message: e.response?.data.error ?? 'Unknown error', severity: 'error' },
        { root: true }
      );
    }
  },
};

export default AuthActions;
