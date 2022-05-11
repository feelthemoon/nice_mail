import PrimeVue from 'primevue/config';
import { createApp, defineCustomElement } from 'vue';
import store, { key } from './store';
import App from './App.vue';
import router from './router';
import MessageViewContent from '@/components/MessageView/MessageViewContent.vue';
import i18n from '@/plugins/i18n';

import './registerServiceWorker';

import 'primevue/resources/themes/vela-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.min.css';
import '@/assets/base.scss';

const app = createApp(App);
app.use(store, key).use(i18n).use(PrimeVue).use(router).mount('#app');

const MessageViewShadow = defineCustomElement(MessageViewContent);
customElements.define('message-view', MessageViewShadow);
