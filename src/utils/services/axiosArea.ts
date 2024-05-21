import axios, { AxiosError } from "axios";
import type { AxiosPromise, AxiosResponse } from "axios";
import type RequestParams from "../../interfaces/RequestParams";
import type { Area } from "@/interfaces/Area";

const api = axios.create({
    baseURL: 'http://localhost:8080/area'
})

export const getArea = async (route: string, query: RequestParams<unknown> | null = null): AxiosPromise<Area[]> => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token de autenticação não encontrado');
        }

        return await api.get<Area[]>(route, {   
            headers: {
                Authorization: `Bearer ${token}` 
            },
            params: { ...query }
        });
    } catch (error) {
        throw (error as AxiosError);
    }
}

export const createArea = async (area: Area): Promise<AxiosResponse<Area>> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token de autenticação não encontrado');
        }
        const response = await api.post<Area>('', area, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response;
    } catch (error) {
        throw new Error((error as AxiosError).message || 'Erro ao criar área');
    }
}

export const deletaArea = async (areaId: string): Promise<void> => {
    try {
        const token = localStorage.getItem('token');
    
        if (!token) {
            throw new Error('Token não encontrado.');
        }
        const response = await api.delete(`/${areaId}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        if (response.status !== 200) {
            throw new Error('Erro ao excluir área');
        }
    } catch (error) {
        throw new Error((error as AxiosError).message || 'Erro ao excluir área');
    }
};

export const getAreabyId = async (areaId: string) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token não encontrado.');
        }
        const response = await api.get(`/${areaId}`, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        if (response.status !== 200) {
            throw new Error('Erro ao obter área por ID');
        }

        return response.data; 
    } catch (error) {
        throw new Error((error as AxiosError).message || 'Erro ao obter área por ID');
    }
}


export const putAreabyId = async (areaId: string, areaData: Area) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token não encontrado.');
        }
        const response = await api.put(`/${areaId}`, areaData, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        if (response.status !== 200) {
            throw new Error('Erro ao obter área por ID');
        }

        return response.data; 
    } catch (error) {
        throw new Error((error as AxiosError).message || 'Erro ao obter área por ID');
    }
}