import { Container, Table } from "./styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

export const TableUsers = () => {
  const handleClickDelete = (id: number) => {
    Swal.fire({
      title: "Tem certeza que deseja excluir esse usuário?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: `Sim`,
      denyButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Usuário excluído com sucesso!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Usuário não foi excluído", "", "info");
      }
    });
  };
  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Nascimento</th>
            <th>Cidade</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nome</td>
            <td>E-mail</td>
            <td>Telefone</td>
            <td>Nascimento</td>
            <td>Cidade</td>
            <td>
              <button>
                <EditIcon />
              </button>
              <button onClick={() => handleClickDelete(1)}>
                <DeleteIcon />
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};
