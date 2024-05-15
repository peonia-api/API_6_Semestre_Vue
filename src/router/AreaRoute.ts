import AreaRegistration from '../views/AreaRegistration.vue';
import AreaListing from '../views/AreaListing.vue';

export const AreaRoute = {
  path: '/areaList',
  meta: { requiresAuth: true },
  component: AreaListing,
};

export const RegistrationAreaRoute = {
  path: '/cadastroArea',
  name: 'cadastroAreaView',
  meta: {
    requiresAuth: true,
    title: 'cadastroArea'
  },
  component: AreaRegistration
};