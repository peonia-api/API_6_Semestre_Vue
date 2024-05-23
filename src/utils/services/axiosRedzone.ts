import axios, { AxiosError, type AxiosPromise, type AxiosResponse } from "axios";
import type { Redzone } from "@/interfaces/CreateNewRedzone";
import type RequestParams from "@/interfaces/RequestParams";

const api = axios.create({
    baseURL: 'http://localhost:8080/redZones'
});


export const createRedzone = async (redzone: Redzone, query: RequestParams<unknown> | null = null): Promise<AxiosResponse<Redzone>> => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token de autenticação não encontrado');
        }

        const response = await api.post<Redzone>('', redzone, {   
            headers: {
                Authorization: `Bearer ${token}` 
            },
            params: { ...query }
        })
        return response;
    } catch (error) {
        throw new Error((error as AxiosError).message || 'Erro ao criar redzone');
    }
}



export const getRedzone = async (route: string, query: RequestParams<unknown> | null = null, apiRedzone = api): AxiosPromise => {
    try {
        const response = await api.get<{ redzone: Redzone[] }>(route);
        return response;
    } catch (error) {
        throw (error as AxiosError);
    }
};

export const getRedzonebyId = async (redzoneId: string) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token não encontrado.');
        }
        const response = await api.get(`/${redzoneId}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        if (response.status !== 200) {
            throw new Error('Erro ao obter redzone por ID');
        }

        return response.data; 
    } catch (error) {
        throw new Error((error as AxiosError).message || 'Erro ao obter redzone por ID');
    }
}

export const getCurrentRedzone = async (): Promise<Redzone> => {
    try {
        const token = localStorage.getItem('token');
    
        if (!token) {
            throw new Error('Token não encontrado.');
        }

        const response = await api.get<{ redzone: Redzone }>(`/current-redzone`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.redzone;
    } catch (error) {
        throw (error as AxiosError);
    }
}

export const deleteRedZone = async (redzoneId: string): Promise<void> => {
    try {
        const token = localStorage.getItem('token');
    
        if (!token) {
            throw new Error('Token não encontrado.');
        }
        const response = await api.delete(`/${redzoneId}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        if (response.status !== 200) {
            throw new Error('Erro ao excluir redzone');
        }
    } catch (error) {
        throw new Error((error as AxiosError).message || 'Erro ao excluir redzone');
    }
};

export const putRedzonebyId = async (redzoneId: string, redzoneData: Redzone) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token não encontrado.');
        }
        const response = await api.put(`/${redzoneId}`, redzoneData, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        if (response.status !== 200) {
            throw new Error('Erro ao obter redzone por ID');
        }

        return response.data; 
    } catch (error) {
        throw new Error((error as AxiosError).message || 'Erro ao obter redzone por ID');
    }
}