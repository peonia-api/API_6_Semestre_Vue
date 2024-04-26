import { createRouter, createWebHistory } from 'vue-router';
import ReportView from '../views/ReportView.vue';
import PainelRoute from '../views/PainelRoute.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/relatorio',
      name: 'reportView',
      component: ReportView
    },
    {
      path: '/',
      name: 'painelView',
      component: PainelRoute
    },
  
  ]
})

export default router