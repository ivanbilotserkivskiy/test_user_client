import { ErrorOrData } from "../types/ErrorOrData";
import { LoginData } from "../types/LoginData";
import { baseURL } from "../utils/baseURL";
import { client } from "../utils/fetchClient";


export const loginUser = (data: LoginData) => {
  return client.post<ErrorOrData>(`${baseURL}auth/login`, data)
}