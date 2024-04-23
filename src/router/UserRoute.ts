import UserListing from '../views/UserListing.vue';

const userRoute = {
  path: '/userList',
  name: 'userList',
  meta: {
    title: 'userList'
  },
  component: UserListing 

};

export default userRoute;