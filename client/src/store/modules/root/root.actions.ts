import { ActionTree } from 'vuex';
import { IAlert, IRootState } from '@/store/modules/root/root.types';

const RootActions: ActionTree<IRootState, IRootState> = {
  updateAlerts({ commit }, alert: IAlert): void {
    commit('UPDATE_ALERTS', alert);
  },
};

export default RootActions;
