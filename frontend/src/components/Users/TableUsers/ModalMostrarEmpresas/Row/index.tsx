import formatCNPJ from "../../../../../utils/formataCNPJ";

type Props = {
  nome: string;
  cnpj: string;
};

export const Row = ({ nome, cnpj }: Props) => {
  return (
    <tr>
      <td>{nome}</td>
      <td>{formatCNPJ(cnpj)}</td>
    </tr>
  );
};
