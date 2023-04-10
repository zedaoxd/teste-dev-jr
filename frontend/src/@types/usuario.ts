import Empresa from "./empresa";

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: number;
  cidadeNascimento: string;
  empresas: Empresa[];
};
