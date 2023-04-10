import { Container, Table } from "./styles";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { getAllUsuarios } from "../../../services/usuarioService";
import { CircularProgress } from "@mui/material";
import { Row } from "./Row";

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

  const { data, isLoading, error } = useQuery(["users"], getAllUsuarios);

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
          {isLoading && <div>Carregando...</div>}

          {data &&
            data.content.map((usuario) => (
              <Row
                key={usuario.id}
                usuario={usuario}
                handleClickDelete={handleClickDelete}
                handleClickUpdate={() => {}}
              />
            ))}
        </tbody>
      </Table>
    </Container>
  );
};
