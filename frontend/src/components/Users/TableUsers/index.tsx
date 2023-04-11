import { Container, Table } from "./styles";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteUsuario,
  getAllUsuarios,
} from "../../../services/usuarioService";
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
        deleteUsuarioMutation(id);
      }
    });
  };

  const queryClient = useQueryClient();

  const { mutate: deleteUsuarioMutation } = useMutation(deleteUsuario, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire("Usuário excluído com sucesso!", "", "success");
    },
  });

  const { data, isLoading } = useQuery(["users"], getAllUsuarios);

  return (
    <Container>
      {isLoading && <CircularProgress />}
      {data && data.content.length === 0 ? (
        <h3>Nenhum usuário cadastrado</h3>
      ) : (
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
      )}
    </Container>
  );
};
