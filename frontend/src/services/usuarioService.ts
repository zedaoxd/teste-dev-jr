import { Page, Usuario } from "../@types";
import { api } from "./api";

export const getAllUsuarios = async () => {
  const response = await api.get<Page<Usuario>>("/usuarios");
  return response.data;
};

export const deleteUsuario = async (id: number) => {
  const response = await api.delete(`/usuarios/${id}`);
  return response;
};

export const salvarUsuario = async (usuario: UsuarioInsert) => {
  const response = await api.post("/usuarios", usuario);
  return response;
};

type UsuarioInsert = {
  nome: string;
  email: string;
  empresas: [
    {
      id: number;
      nome: string;
    },
    ...{
      id: number;
      nome: string;
    }[]
  ];
  telefone?: string | undefined;
  dataNascimento?: string | undefined;
  cidadeNascimento?: string | undefined;
};
