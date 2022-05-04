import { IError, IRootState } from '@/store/modules/root/root.types';
import { GetterTree } from 'vuex';

const RootGetters: GetterTree<IRootState, IRootState> = {
  token: (state: IRootState) => state.token,
  alerts: (state: IRootState) => state.alerts,
  loadingByNamespace: (state: IRootState) => (namespace: string) =>
    state.loading.find((l) => l.namespace === namespace)?.loading,
  mailToken: (state: IRootState) => state.mailToken,
  errorByNamespace:
    (state: IRootState) =>
    (namespace: string): IError | undefined =>
      state.errors.find((e) => e.namespace === namespace),
};

export default RootGetters;
