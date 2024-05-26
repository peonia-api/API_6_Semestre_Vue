import { createRouter, createWebHistory } from "vue-router";
import {PainelRoute, PainelListRedzonesRoute } from './RegisterRoute';
import { UserRoute, RegistrationRoute, PerfilRoute, EditUser } from "./UserRoute";
import LoginRoute from "./LoginRoute";
import { useAuthStore } from "@/stores/Login";
import { ListRedzoneRoute, RedzoneRegisterRoute, EditRedzoneRoute } from "./RedzoneRoute";
import { AreaRoute, RegistrationAreaRoute, EditArea } from "./AreaRoute";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    LoginRoute,
    PainelRoute,
    UserRoute,
    RegistrationRoute,
    PerfilRoute,
    EditUser,
    RedzoneRegisterRoute,
    ListRedzoneRoute,
    AreaRoute,
    RegistrationAreaRoute,
    EditRedzoneRoute,
    PainelListRedzonesRoute,
    EditArea
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