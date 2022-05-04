import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { InjectionKey } from 'vue';
import { IRootState } from '@/store/modules/root/root.types';
import state from '@/store/modules/root/root.state';
import mutations from '@/store/modules/root/root.mutations';
import actions from '@/store/modules/root/root.actions';
import getters from '@/store/modules/root/root.getters';
import modules from '@/store/modules/root/root.modules';
import vuexLocal from '@/store/plugins/vuex_persist';

export const key: InjectionKey<Store<IRootState>> = Symbol();

export default createStore<IRootState>({
  state,
  mutations,
  actions,
  getters,
  modules,
  plugins: [vuexLocal.plugin],
});

export function useStore(): Store<IRootState> {
  return baseUseStore(key);
}
