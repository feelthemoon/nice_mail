import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const Index = () => import(/* webpackChunkName: 'index' */ '@/views/Index.vue');
const MessageView = () => import(/* webpackChunkName: 'messageView' */ '@/views/MessageView.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/message/:id',
    name: 'MessageView',
    component: MessageView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
