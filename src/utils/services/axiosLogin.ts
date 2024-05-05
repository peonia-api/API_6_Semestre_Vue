import axios, { AxiosError } from 'axios';
import type { UsuarioLogin, UserLogin } from "@/interfaces/Login";

const API_URL = 'http://localhost:8080/login';

const login = async (email: string, password: string): Promise<UserLogin> => {
  try {
    const response = await axios.post<UserLogin>(API_URL, { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Failed to login');
  }
};

export default { login };
