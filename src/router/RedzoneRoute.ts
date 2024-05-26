import RedzoneRegistration from "@/views/RedzoneRegistration.vue";
import RedzoneListing from "@/views/RedzoneListing.vue";
import RedzoneEdit from "@/views/RedzoneEdit.vue";

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
export const EditRedzoneRoute = {
   path: '/editRedzone/:id',
   name: 'RedzoneEdit',
   component: RedzoneEdit
};
