import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Empresa from "../../../../@types/empresa";
import formatCNPJ from "../../../../utils/formataCNPJ";

type Props = {
  handleClickDelete: (id: number) => void;
  handleClickUpdate: (id: number) => void;
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
        <button onClick={() => handleClickUpdate(empresa.id)}>
          <EditIcon />
        </button>
        <button onClick={() => handleClickDelete(empresa.id)}>
          <DeleteIcon />
        </button>
      </td>
    </tr>
  );
};
