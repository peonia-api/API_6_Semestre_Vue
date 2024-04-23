import { createRouter, createWebHistory } from "vue-router";
import RegisterRoute from './RegisterRoute'
import UserRoute from "./UserRoute";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    RegisterRoute,
    UserRoute
  ],


  scrollBehavior() {
    return { top:0 };
  }

  
});


export default router;