import { defineStore } from 'pinia';
import AuthService from "../utils/services/axiosLogin"; 
import type { UserLogin } from '@/interfaces/Login';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response: UserLogin = await AuthService.login(email, password);
        this.token = response.token;
        localStorage.setItem('token', response.token);
        this.isAuthenticated = true;
        return true;
      } catch (error) {
        console.error('Failed to login:', error);
        throw error; 
      }
    },
    logout() {
      this.token = null;
      localStorage.removeItem('token');
      this.isAuthenticated = false;
    },
  },
});
