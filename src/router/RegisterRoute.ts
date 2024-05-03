import ReportView from '../views/ReportView.vue';
import PainelView from '../views/PainelView.vue';

export const RegisterRoute = {
  path: '/report',
  name: 'reportView',
  meta: {
    requiresAuth: true,
    title: 'user'
  },
 component: ReportView
};


export const PainelRoute = {
  path: '/',
  name: 'painelView',
  meta: { requiresAuth: true },
  component: PainelView
};


