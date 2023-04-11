import { Page } from "../@types";
import Empresa from "../@types/empresa";
import { api } from "./api";

export const salvarEmpresa = async (empresa: Omit<Empresa, "id">) => {
  const response = await api.post<Empresa>("/empresas", empresa);
  return response;
};

export const getAllEmpresas = async () => {
  const response = await api.get<Page<Empresa>>("/empresas");
  return response.data;
};
