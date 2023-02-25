import axios, { Axios } from "axios";
import { toast } from "react-hot-toast";
import { AxiosRequestConfig } from "axios";
import { AxiosResponse } from "axios";
import { AxiosPromise } from "axios";

// Creating the API instance with the base url and the timeout
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1000,
});

// Adding the token to the request header typescript way
API.interceptors.request.use((config: any) => {
  try {
    const token = localStorage.getItem("dt-token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  } catch (e) {
    console.error("No token found");
  }
  return config;
});

// Adding error handling to the API instance and send toasts to the user
API.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    toast.dismiss();
    if (error.response) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } else if (error.request) {
      toast.error(error.request || "Network error");
    }
    return Promise.reject(error);
  }
);

// fetcher function to use with useSWR
// Pass url to response handler
// recieves url as param
export const fetcher = (url: string) => {
  return new Axios({
    url: url,
  });
};

interface ILoginData {
  email: string;
  password: string;
}

interface IRegisterData {
  name: string;
  email: string;
  password: string;
}

// for login and register
export const login = (
  data: ILoginData,
  config?: AxiosRequestConfig
): AxiosPromise => {
  return API.post("/login", data, config);
};

export const register = (
  data: IRegisterData,
  config?: AxiosRequestConfig
): AxiosPromise => {
  return API.post("/register", data, config);
};

// get user with received token from parametres
export const getUser = (config?: AxiosRequestConfig): AxiosPromise => {
  return API.get("/user", config);
};

export const updateUser = (
  data: any,
  config?: AxiosRequestConfig
): AxiosPromise => {
  return API.put("/user", data, config);
};

export const deleteUser = (id: string, config?: AxiosRequestConfig) => {
  return API.delete(`/user/${id}`, config);
};

// for posts
export const getPosts = (config?: AxiosRequestConfig): AxiosPromise => {
  return API.get("/posts", config);
};

export const getPost = (
  id: string,
  config?: AxiosRequestConfig
): AxiosPromise => {
  return API.get(`/posts/${id}`, config);
};

export const createPost = (
  data: any,
  config?: AxiosRequestConfig
): AxiosPromise => {
  return API.post("/posts", data, config);
};

export const updatePost = (
  id: string,
  data: any,
  config?: AxiosRequestConfig
): AxiosPromise => {
  return API.put(`/posts/${id}`, data, config);
};

export const deletePost = (
  id: string,
  config?: AxiosRequestConfig
): AxiosPromise => {
  return API.delete(`/posts/${id}`, config);
};

export default API;
