import { ModuleTree } from 'vuex';
import { IRootState } from '@/store/modules/root/root.types';
import auth from '@/store/modules/auth';
import mail from '@/store/modules/mail';

const modules: ModuleTree<IRootState> = { auth, mail };

export default modules;
