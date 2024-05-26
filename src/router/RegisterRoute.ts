import PainelView from '../views/PainelView.vue';
import RedzoneListPainel from '../views/RedzoneListPainel.vue';

export const PainelRoute = {
  path: '/painel/:redzoneName',
  name: 'painelView',
  meta: { requiresAuth: true },
  component: PainelView,
  props: true
};

export const PainelListRedzonesRoute = {
  path: '/',
  name: 'painelListRedzones',
  meta: { requiresAuth: true },
  component: RedzoneListPainel,
  props: (route: { params: { redzoneName: string } }) => ({ redzoneName: route.params.redzoneName })
};
