import { createRouter, createWebHistory } from "vue-router";
import RegisterRoute from './RegisterRoute';
import { UserRoute, RegistrationRoute } from "./UserRoute";
import LoginRoute from "./LoginRoute";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    RegisterRoute,
    UserRoute,
    RegistrationRoute,
    LoginRoute
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
