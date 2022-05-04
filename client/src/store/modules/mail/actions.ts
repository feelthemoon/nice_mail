import { API } from '@/api';
import { IRootState } from '@/store/modules/root/root.types';
import { ActionTree } from 'vuex';
import { IMailState } from '@/store/modules/mail/mail.types';
import { io } from 'socket.io-client';
import { AxiosError } from 'axios';

const MailActions: ActionTree<IMailState, IRootState> = {
  async getRandomMail(
    { commit, dispatch, rootGetters },
    { force }: { force: boolean } = { force: false }
  ): Promise<void> {
    try {
      commit('UPDATE_LOADING', { namespace: 'tempbox', loading: true }, { root: true });
      const mailToken = force ? '' : rootGetters.mailToken;
      const res = await API.MAIL.getRandomMail(mailToken);
      commit('SET_EMAIL', res.data.mail[0]);
      commit('SET_MAIL_TOKEN', res.headers['mail-token'], { root: true });
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        dispatch(
          'updateAlerts',
          {
            message: e.response?.data.error ?? 'Unknown Error',
            severity: 'error',
          },
          { root: true }
        );
      }
    } finally {
      commit('UPDATE_LOADING', { namespace: 'tempbox', loading: false }, { root: true });
    }
  },

  connectWS({ commit, state, rootGetters, dispatch }) {
    try {
      if (state.socket) {
        state.socket.disconnect();
      }
      const socket = io(process.env.VUE_APP_SOCKET_URL, {
        auth: {
          mailToken: rootGetters.mailToken,
        },
      });
      socket.on('SERVER:GET_MESSAGES', (messages) => {
        commit('SET_MESSAGES', messages);
        setTimeout(() => dispatch('getMessages'), 5000);
      });
      socket.on('SERVER:ERROR:GET_MESSAGES', (err) => {
        dispatch(
          'updateAlerts',
          {
            message: err,
            severity: 'error',
          },
          { root: true }
        );
      });
      socket.on('CLIENT:ERROR:GET_MESSAGES', (err) => {
        dispatch(
          'updateAlerts',
          {
            message: err,
            severity: 'error',
          },
          { root: true }
        );
      });
      commit('SET_SOCKET', socket);
    } catch (e: any) {
      dispatch(
        'updateAlerts',
        {
          message: e.response?.data.error ?? 'Unknown Error',
          severity: 'error',
        },
        { root: true }
      );
    }
  },

  getMessages({ getters }) {
    getters.socket?.emit('CLIENT:GET_MESSAGES');
  },

  disconnectWS({ commit, getters }) {
    getters.socket.disconnect();
    commit('SET_SOCKET', null);
  },

  async readMessage({ rootGetters, commit, dispatch }, { id }: { id: number }) {
    try {
      commit('UPDATE_LOADING', { namespace: 'messageView', loading: true }, { root: true });
      const res = await API.MAIL.readMessage(rootGetters.mailToken, id);
      commit('SET_CURRENT_MESSAGE', res.data);
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        commit(
          'UPDATE_ERRORS',
          {
            namespace: 'messageView',
            message: e.response?.data.error ?? 'Unknown Error',
            statusCode: e.response?.status ?? 500,
          },
          { root: true }
        );
        dispatch(
          'updateAlerts',
          {
            message: e.response?.data.error ?? 'Unknown Error',
            severity: 'error',
          },
          { root: true }
        );
      }
    } finally {
      commit('UPDATE_LOADING', { namespace: 'messageView', loading: false }, { root: true });
    }
  },
};

export default MailActions;
