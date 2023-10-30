import { CreateCompletedTest } from "../types/CreateCompletedTest";
import { ErrorOrData } from "../types/ErrorOrData";
import { LoginData } from "../types/LoginData";
import { Test } from "../types/Test";
import { UserTests } from "../types/UserTests";
import { baseURL } from "../utils/baseURL";
import { client } from "../utils/fetchClient";


export const loginUser = (data: LoginData) => {
  return client.post<ErrorOrData>(`${baseURL}auth/login`, data)
}

export const getUserTests = (data: string) => {
  return client.get<UserTests>(`${baseURL}test/${data}`)
}

export const getOneTest = (data: string) => {
  return client.get<Test>(`${baseURL}test/test/${data}`);
}

export const createCompletedTest = (data : CreateCompletedTest) => {
  return client.post<CreateCompletedTest>(`${baseURL}completed-test/`, data)
}