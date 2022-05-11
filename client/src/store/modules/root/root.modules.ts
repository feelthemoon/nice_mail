import { ModuleTree } from 'vuex';
import { IRootState } from '@/store/modules/root/root.types';
import mail from '@/store/modules/mail';

const modules: ModuleTree<IRootState> = { mail };

export default modules;
