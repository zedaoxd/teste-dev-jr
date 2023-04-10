import Empresa from "./empresa";

export type Usuario = {
  id: number;
  name: string;
  email: string;
  telefone: string;
  dataNascimento: Date;
  cidadeNascimento: string;
  empresas: Empresa[];
};
