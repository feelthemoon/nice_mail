import { IRootState } from '@/store/modules/root/root.types';
import { MutationTree } from 'vuex';
import { IAlert } from '@/store/modules/root/root.types';

const RootMutations: MutationTree<IRootState> = {
  SET_TOKEN(state: IRootState, token: string | null) {
    state.token = token;
  },
  UPDATE_ALERTS(state: IRootState, alert: IAlert) {
    state.alerts.push({ ...alert, life: 3000 });
    setTimeout(() => {
      state.alerts.shift();
    }, 3200);
  },
};

export default RootMutations;
