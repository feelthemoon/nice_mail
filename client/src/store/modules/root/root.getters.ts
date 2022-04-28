import { IRootState } from '@/store/modules/root/root.types';
import { GetterTree } from 'vuex';

const RootGetters: GetterTree<IRootState, IRootState> = {
  token: (state: IRootState) => state.token,
  alerts: (state: IRootState) => state.alerts,
};

export default RootGetters;
