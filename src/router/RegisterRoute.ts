import PainelView from '../views/PainelView.vue';

export const PainelRoute = {
  path: '/',
  name: 'painelView',
  meta: { requiresAuth: true },
  component: PainelView
};


