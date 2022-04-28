import { Module } from 'vuex';
import { IRootState } from '@/store/modules/root/root.types';
import state from '@/store/modules/root/root.state';
import mutations from '@/store/modules/root/root.mutations';
import actions from '@/store/modules/root/root.actions';
import getters from '@/store/modules/root/root.getters';
import modules from '@/store/modules/root/root.modules';

const RootModule: Module<IRootState, IRootState> = {
  state,
  actions,
  mutations,
  getters,
  modules,
};

export default RootModule;
