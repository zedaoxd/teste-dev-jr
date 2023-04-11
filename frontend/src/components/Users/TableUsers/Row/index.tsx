import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Usuario } from "../../../../@types";
import formataNumeroTelefone from "../../../../utils/formaNumeroTelefone";

type Props = {
  handleClickDelete: (id: number) => void;
  handleClickUpdate: (usuario: Usuario) => void;
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
      <td>{formataNumeroTelefone(usuario.telefone)}</td>
      <td>
        {usuario.dataNascimento
          ? new Date(usuario.dataNascimento).toLocaleDateString()
          : null}
      </td>
      <td>{usuario.cidadeNascimento}</td>
      <td>
        <button onClick={() => handleClickUpdate(usuario)}>
          <EditIcon />
        </button>
        <button onClick={() => handleClickDelete(usuario.id)}>
          <DeleteIcon />
        </button>
      </td>
    </tr>
  );
};
