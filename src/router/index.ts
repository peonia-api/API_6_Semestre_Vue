import { createRouter, createWebHistory } from 'vue-router'
import ReportView from '../views/ReportView.vue'
import TestView from '../views/TestView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/relatorio',
      name: 'reportView',
      component: ReportView
    },
    {
      path: '/teste',
      name: 'teste',
      component: TestView
    }
  ]
})

export default router