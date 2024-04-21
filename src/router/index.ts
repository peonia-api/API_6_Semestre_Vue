import { createRouter, createWebHistory } from 'vue-router';
import ReportView from '../views/ReportView.vue';
import UserRegistration from '@/views/UserRegistration.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'reportView',
      component: ReportView
    },

    {
      path: '/userRegistration',
      name: 'userRegistrationView',
      component: UserRegistration

    }

    
  
  ]
})

export default router