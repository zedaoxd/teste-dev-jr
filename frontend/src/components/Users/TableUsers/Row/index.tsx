import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Usuario } from "../../../../@types";
import formataNumeroTelefone from "../../../../utils/formaNumeroTelefone";

type Props = {
  handleClickDelete: (id: number) => void;
  handleClickUpdate: (usuario: Usuario) => void;
  handleClickShowEmpresas: (usuario: Usuario) => void;
  usuario: Usuario;
};

export const Row = ({
  handleClickDelete,
  handleClickUpdate,
  handleClickShowEmpresas,
  usuario,
}: Props) => {
  return (
    <tr>
      <td data-testid="c-nome">{usuario.nome}</td>
      <td data-testid="c-email">{usuario.email}</td>
      <td data-testid="c-telefone">
        {formataNumeroTelefone(usuario.telefone)}
      </td>
      <td>
        {usuario.dataNascimento
          ? new Date(usuario.dataNascimento).toLocaleDateString()
          : null}
      </td>
      <td>{usuario.cidadeNascimento}</td>
      <td>
        <button
          title="visualizar empresas"
          onClick={() => handleClickShowEmpresas(usuario)}
        >
          <VisibilityIcon />
        </button>
        <button
          title="Editar usuário"
          onClick={() => handleClickUpdate(usuario)}
        >
          <EditIcon />
        </button>
        <button
          title="deletar usuário"
          onClick={() => handleClickDelete(usuario.id)}
        >
          <DeleteIcon />
        </button>
      </td>
    </tr>
  );
};
