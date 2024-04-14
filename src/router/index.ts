import { createRouter, createWebHistory } from 'vue-router';
import ReportView from '../views/ReportView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'reportView',
      component: ReportView
    },
  
  ]
})

export default router