import RedzoneRegistration from "@/views/RedzoneRegistration.vue";
import RedzoneListing from "@/views/RedzoneListing.vue";

 export const RedzoneRegisterRoute = {
    path: '/redzoneregistration',
    name: 'RedzoneRegistration',
    component: RedzoneRegistration
  };

 export const ListRedzoneRoute = {
    path: '/redzoneList',
    name: 'RedzoneListing',
    component: RedzoneListing
};
