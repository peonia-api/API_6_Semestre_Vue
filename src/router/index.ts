import { createRouter, createWebHistory } from 'vue-router'
import ReportView from '../views/ReportView.vue'
import TestView from '../views/TestView.vue'

const   routes =  [
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router