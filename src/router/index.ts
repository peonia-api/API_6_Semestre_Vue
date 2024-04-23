import { createRouter, createWebHistory } from "vue-router";
import RegisterRoute from './RegisterRoute';
import { UserRoute, RegistrationRoute } from "./UserRoute";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    RegisterRoute,
    UserRoute,
    RegistrationRoute,
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
