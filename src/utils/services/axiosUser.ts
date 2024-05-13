import axios, { AxiosError } from "axios";
import type { AxiosPromise, AxiosResponse } from "axios";
import type RequestParams from "../../interfaces/RequestParams";
import type { Usuario } from "@/interfaces/User";

const api = axios.create({
    baseURL: 'http://localhost:8080/user'
});



export const getUser = async (route: string, query: RequestParams<unknown> | null = null, apiUse = api): AxiosPromise => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token de autenticação não encontrado');
        }
        const response = await api.get<{ usuario: Usuario[] }>(route, {
            headers: {
                Authorization: `Bearer ${token}` 
            },
            params: { ...query }
        });
        return response;
    } catch (error) {
        throw (error as AxiosError);
    }
};

export const createUser = async (usuario: Usuario): Promise<AxiosResponse<Usuario>> => {
    try {

        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token de autenticação não encontrado');
        }

        const response = await api.post<Usuario>('', usuario, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response;
    } catch (error) {
        throw new Error((error as AxiosError).message || 'Erro ao criar usuário');
    }
}

export const getCurrentUser = async (): Promise<Usuario> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token não encontrado.');
        }

        const response = await api.get('/me', {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        console.log('Response from getCurrentUser:', response);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async (userId: string): Promise<void> => {
    try {
        const token = localStorage.getItem('token');
    
        if (!token) {
            throw new Error('Token não encontrado.');
        }
        const response = await api.delete(`/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        if (response.status !== 200) {
            throw new Error('Erro ao excluir usuário');
        }
    } catch (error) {
        throw new Error((error as AxiosError).message || 'Erro ao excluir usuário');
    }
};

export const getUserbyId = async (userId: string) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token não encontrado.');
        }
        const response = await api.get(`/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        if (response.status !== 200) {
            throw new Error('Erro ao obter usuário por ID');
        }

        return response.data; 
    } catch (error) {
        throw new Error((error as AxiosError).message || 'Erro ao obter usuário por ID');
    }
}


export const putUserbyId = async (userId: string, userData: Usuario) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token não encontrado.');
        }
        const response = await api.put(`/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        if (response.status !== 200) {
            throw new Error('Erro ao obter usuário por ID');
        }

        return response.data; 
    } catch (error) {
        throw new Error((error as AxiosError).message || 'Erro ao obter usuário por ID');
    }
}