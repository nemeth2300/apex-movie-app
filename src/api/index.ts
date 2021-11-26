import axios, { AxiosError, AxiosResponse } from "axios";

export const initialiseAxios = () => {
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      response.data = [response.data, null];
      return response;
    },
    (error: AxiosError) => {
      const defaultResponse: AxiosResponse = {
        config: {},
        data: null,
        headers: {},
        status: 418,
        statusText: "Unknown Error",
      };
      const response = error.response || defaultResponse;
      response.data = [null, error];
      return response;
    }
  );
};
