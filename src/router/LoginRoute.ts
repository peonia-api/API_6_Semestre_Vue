import LoginScreen from '../views/LoginScreen.vue';
import AutenticacaoView from '../views/AutenticacaoView.vue';
import NewPasswordView from '../views/NewPasswordView.vue';

export const LoginRoute = {
  path: '/login',
  name: 'loginScreenVue',
  component: LoginScreen
};

export const AutRoute = {
  path: '/autenticacao',
  name: 'autenticacao',
 component: AutenticacaoView
};

export const PasswordRoute = {
  path: '/password',
  name: 'password',
 component: NewPasswordView
};

 