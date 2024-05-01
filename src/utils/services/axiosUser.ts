import axios, { AxiosError } from "axios";
import type { AxiosPromise, AxiosResponse } from "axios";
import type RequestParams from "../../interfaces/RequestParams";
import type { Usuario } from "@/interfaces/User";

const api = axios.create({
    baseURL: 'http://localhost:8080/user'
});

export const getUser = async (route: string, query: RequestParams<unknown> | null = null, apiUse = api): AxiosPromise => {
    try {
        const response = await api.get<{ usuario: Usuario[] }>(route, {
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
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Token não encontrado.');
    }

    try {
        const response = await api.get<{ usuario: Usuario }>(`/current-user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.usuario;
    } catch (error) {
        throw (error as AxiosError);
    }
}