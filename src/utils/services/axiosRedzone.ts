import axios, { AxiosError, type AxiosPromise, type AxiosResponse } from "axios";
import type { Redzone } from "@/interfaces/CreateNewRedzone";
import type RequestParams from "@/interfaces/RequestParams";

const api = axios.create({
    baseURL: 'http://localhost:8080/redzone'
});


export const createRedzone = async (redzone: Redzone): Promise<AxiosResponse<Redzone>> => {
    try {
        const response = await api.post<Redzone>('', redzone)
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