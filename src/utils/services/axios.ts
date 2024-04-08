import axios, { AxiosError } from "axios";
import type { AxiosPromise } from "axios";
import type RequestParams from "../../interfaces/RequestParams";


const api = axios.create({
    baseURL: 'http://localhost:8080/record'
})


export const getRequest = async (route: string, query: RequestParams<unknown> | null = null, apiUse = api): AxiosPromise => {
    try {
        const response = await apiUse.get(`${route}`,
            {
                params: {
                    ...query
                }
            });

        return response;
    } catch (error) {
        throw (error as AxiosError);
    }
};

export const postRequest = async <T>(route: string, body: T | null = null, apiUse = api): AxiosPromise => {
    try {
      const response = await apiUse.post(`${route}`, body);
  
      return response;
    } catch (error) {
      throw (error as AxiosError);
    }
  };

  