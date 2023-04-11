import { Empresa, Page, Usuario } from "../@types";
import { api } from "./api";

export const getAllUsuarios = async (
  texto: string = "",
  campo: string = ""
) => {
  const response = await api.get<Page<Usuario>>("/usuarios", {
    params: { texto, campo },
  });
  return response.data;
};

export const getUsuarioById = async (id: number) => {
  const response = await api.get<Usuario>(`/usuarios/${id}`);
  return response.data;
};

export const editUsuario = async (usuario: any) => {
  const response = await api.put(`/usuarios/${usuario.id}`, usuario);
  return response;
};

export const deleteUsuario = async (id: number) => {
  const response = await api.delete(`/usuarios/${id}`);
  return response;
};

export const salvarUsuario = async (usuario: UsuarioInsert) => {
  const response = await api.post("/usuarios", usuario);
  return response;
};

export type UsuarioInsert = {
  nome: string;
  email: string;
  telefone?: string | undefined;
  dataNascimento?: string | undefined;
  cidadeNascimento?: string | undefined;
  empresas: Empresa[];
} & {
  empresas: Empresa[];
};
