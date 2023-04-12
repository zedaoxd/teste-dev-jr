import { Container, Table } from "./styles";
import { CircularProgress } from "@mui/material";
import { Row } from "./Row";
import { ModalEditar } from "./ModalEditar";
import { ModalMostrarEmpresas } from "./ModalMostrarEmpresas";
import { useTabelaUsuario } from "../../../hooks/useTableUusario";

export const TableUsers = () => {
  const {
    data,
    isLoading,
    handleClickDelete,
    handleClickUpdate,
    handleClickShowEmpresas,
    openModalEditar,
    usuario,
    openModalMostrarEmpresas,
    setOpenModalEditar,
    setOpenModalMostrarEmpresas,
  } = useTabelaUsuario();

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
                  handleClickUpdate={handleClickUpdate}
                  handleClickShowEmpresas={handleClickShowEmpresas}
                />
              ))}
          </tbody>
        </Table>
      )}
      <ModalEditar
        handleClose={() => setOpenModalEditar(false)}
        open={openModalEditar}
        usuario={usuario}
      />
      <ModalMostrarEmpresas
        open={openModalMostrarEmpresas}
        handleClose={() => setOpenModalMostrarEmpresas(false)}
        usuario={usuario}
      />
    </Container>
  );
};
