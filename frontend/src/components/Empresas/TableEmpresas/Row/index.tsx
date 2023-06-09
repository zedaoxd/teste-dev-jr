import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import formatCNPJ from "../../../../utils/formataCNPJ";
import { Empresa } from "../../../../@types";

type Props = {
  handleClickDelete: (id: number) => void;
  handleClickUpdate: (empresa: Empresa) => void;
  empresa: Empresa;
};

export const Row = ({
  handleClickDelete,
  handleClickUpdate,
  empresa,
}: Props) => {
  return (
    <tr>
      <td>{empresa.nome}</td>
      <td>{formatCNPJ(empresa.cnpj)}</td>
      <td>
        <button onClick={() => handleClickUpdate(empresa)}>
          <EditIcon />
        </button>
        <button onClick={() => handleClickDelete(empresa.id)}>
          <DeleteIcon />
        </button>
      </td>
    </tr>
  );
};
