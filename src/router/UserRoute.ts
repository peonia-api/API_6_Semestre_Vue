import UserRegistration from '../views/UserRegistration.vue';
import UserListing from '../views/UserListing.vue';
import PerfilView from '../views/PerfilView.vue';

export const PerfilRoute = {
  path: '/perfil',
  meta: { requiresAuth: true },
  component: PerfilView
};

export const UserRoute = {
  path: '/userList',
  meta: { requiresAuth: true },
  component: UserListing,
};
export const RegistrationRoute = {
  path: '/cadastroUser',
  name: 'cadastroView',
  meta: {
    requiresAuth: true,
    title: 'cadastro'
  },
  component: UserRegistration
};
