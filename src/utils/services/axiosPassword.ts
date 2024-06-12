// src/utils/services/axiosPassword.ts
import axios, { AxiosError } from "axios";
import type { AxiosPromise } from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/password'
});

export const postRequestRest = async <T>(route: string, body: T | null = null, apiPassword = api): AxiosPromise => {
    try {
        const response = await apiPassword.post(`${route}`, body);
        return response;
    } catch (error) {
        throw (error as AxiosError);
    }
};

export const resetPassword = async (code: string, newPassword: string): AxiosPromise => {
    try {
        const response = await api.post(`/reset?code=${code}`, { newPassword });
        return response;
    } catch (error) {
        throw (error as AxiosError);
    }
};
