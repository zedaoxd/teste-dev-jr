import { Container, Table } from "./styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const TableUsers = () => {
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
              <button>
                <DeleteIcon />
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};
