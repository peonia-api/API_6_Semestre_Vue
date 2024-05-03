import ReportView from '../views/ReportView.vue';

const RegisterRoute = {
  path: '/',
  name: 'reportView',
  meta: {
    requiresAuth: true,
    title: 'user'
  },
 component: ReportView
};

export default RegisterRoute