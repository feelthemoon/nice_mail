import { IRootState } from '@/store/modules/root/root.types';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence<IRootState>({
  storage: window.localStorage,
  filter: (mutation) => mutation.type === 'SET_MAIL_TOKEN',
  reducer: (state) => ({ mailToken: state.mailToken }),
});

export default vuexLocal;
