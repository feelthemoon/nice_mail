import { IRootState } from '@/store/modules/root/root.types';

const RootState: IRootState = {
  token: '',
  alerts: [],
  loading: [],
  mailToken: '',
  errors: [],
};

export default RootState;
