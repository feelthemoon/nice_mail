import { ILoading, IRootState } from '@/store/modules/root/root.types';
import { MutationTree } from 'vuex';
import { IAlert } from '@/store/modules/root/root.types';

const RootMutations: MutationTree<IRootState> = {
  SET_TOKEN(state: IRootState, token: string) {
    state.token = token;
  },
  UPDATE_ALERTS(state: IRootState, alert: IAlert) {
    state.alerts.push({ ...alert, life: 3000 });
  },
  UPDATE_LOADING(state: IRootState, loading: ILoading) {
    const foundLoadingNamespace = state.loading.find((l) => l.namespace === loading.namespace);
    if (foundLoadingNamespace) {
      foundLoadingNamespace.loading = loading.loading;
    } else {
      state.loading.push(loading);
    }
  },
  SET_MAIL_TOKEN(state: IRootState, mailToken: string) {
    state.mailToken = mailToken;
  },
};

export default RootMutations;
