import { IRootState } from '@/store/modules/root/root.types';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence<IRootState>({
  storage: window.localStorage,
  filter: (mutation) => mutation.type === 'SET_TOKEN',
  reducer: (state) => ({ token: state.token }),
});

export default vuexLocal;
