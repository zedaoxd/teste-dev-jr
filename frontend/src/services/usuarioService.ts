import { Page, Usuario } from "../@types";
import { api } from "./api";

export const getAllUsuarios = async () => {
  const response = await api.get<Page<Usuario>>("/usuarios");
  return response.data;
};
