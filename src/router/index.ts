import { createRouter, createWebHistory } from "vue-router";
import {RegisterRoute, PainelRoute } from './RegisterRoute';
import { UserRoute, RegistrationRoute, PerfilRoute, EditUser } from "./UserRoute";
import LoginRoute from "./LoginRoute";
import { useAuthStore } from "@/stores/Login";
import { ListRedzoneRoute, RedzoneRegisterRoute } from "./RedzoneRoute";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    LoginRoute,
    RegisterRoute,
    PainelRoute,
    UserRoute,
    RegistrationRoute,
    PerfilRoute,
    EditUser,
    RedzoneRegisterRoute,
    ListRedzoneRoute
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  if (to.path === '/login') {
    // Se a rota de destino já é a de login, não redirecione
    next();
  } else if (!isAuthenticated) {
    // Se o usuário não estiver autenticado, redirecione para a tela de login
    next('/login'); 
  } else {
    // Caso contrário, permita a navegação normalmente
    next(); 
  }
}); 

export default router;