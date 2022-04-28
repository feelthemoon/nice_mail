import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { InjectionKey } from 'vue';
import { IRootState } from '@/store/modules/root/root.types';
import vuexLocal from '@/store/plugins/vuex_persist';
import RootModule from '@/store/modules/root';

export const key: InjectionKey<Store<IRootState>> = Symbol();

export default createStore<IRootState>({
  modules: {
    RootModule,
  },
  plugins: [vuexLocal.plugin],
});

export function useStore(): Store<IRootState> {
  return baseUseStore(key);
}
