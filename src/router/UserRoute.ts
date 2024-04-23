import UserRegistration from '../views/UserRegistration.vue';
import UserListing from '../views/UserListing.vue';

export const UserRoute = {
  path: '/userList',
  component: UserListing,
};

export const RegistrationRoute = {
  path: '/cadastroUser',
  name: 'cadastroView',
  meta: {
    title: 'cadastro'
  },
  component: UserRegistration
};
