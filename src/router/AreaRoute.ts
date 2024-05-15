import AreaRegistration from '../views/AreaRegistration.vue';
import AreaListing from '../views/AreaListing.vue';
import AreaEdit from '../views/AreaEdit.vue';

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

export const EditArea = {
  path: '/editArea/:id',
  meta: { requiresAuth: true },
  component: AreaEdit,
};