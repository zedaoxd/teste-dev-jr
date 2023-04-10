import { Page, Usuario } from "../@types";
import { api } from "./api";

export const getAllUsers = async () => {
  const response = await api.get<Page<Usuario>>("/users");
  return response.data;
};
