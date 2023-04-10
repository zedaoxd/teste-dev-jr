import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Usuario } from "../../../../@types";

type Props = {
  handleClickDelete: (id: number) => void;
  handleClickUpdate: (id: number) => void;
  usuario: Usuario;
};

export const Row = ({
  handleClickDelete,
  handleClickUpdate,
  usuario,
}: Props) => {
  return (
    <tr>
      <td>{usuario.nome}</td>
      <td>{usuario.email}</td>
      <td>{usuario.telefone}</td>
      <td>{new Date(usuario.dataNascimento).toLocaleDateString()}</td>
      <td>{usuario.cidadeNascimento}</td>
      <td>
        <button onClick={() => handleClickUpdate(usuario.id)}>
          <EditIcon />
        </button>
        <button onClick={() => handleClickDelete(usuario.id)}>
          <DeleteIcon />
        </button>
      </td>
    </tr>
  );
};
