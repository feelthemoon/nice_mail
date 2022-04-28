import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store, { key } from './store';

import 'primevue/resources/themes/vela-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.min.css';
import '@/assets/base.scss';

createApp(App).use(store, key).use(PrimeVue).use(router).mount('#app');
