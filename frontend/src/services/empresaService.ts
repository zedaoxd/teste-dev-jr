import { Empresa, Page } from "../@types";
import { api } from "./api";

export const salvarEmpresa = async (empresa: Omit<Empresa, "id">) => {
  const response = await api.post<Empresa>("/empresas", empresa);
  return response;
};

export const editarEmpresa = async (empresa: Empresa) => {
  const response = await api.put<Empresa>(`/empresas/${empresa.id}`, empresa);
  return response;
};

export const getAllEmpresas = async () => {
  const response = await api.get<Page<Empresa>>("/empresas");
  return response.data;
};

export const deleteEmpresa = async (id: number) => {
  const response = await api.delete(`/empresas/${id}`);
  return response;
};
