import AreaListing from '../views/AreaListing.vue';

export const AreaRoute = {
  path: '/areaList',
  meta: { requiresAuth: true },
  component: AreaListing,
};
