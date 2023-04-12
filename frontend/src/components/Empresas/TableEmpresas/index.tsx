import { Container, Table } from "./styles";
import { CircularProgress } from "@mui/material";
import { Row } from "./Row";
import { ModalEditar } from "./ModalEditar";
import { useTableEmpresa } from "../../../hooks/useTableEmpresa";

export const TableEmpresas = () => {
  const {
    closeModalEditar,
    data,
    empresa,
    handleClickDelete,
    handleclickUpdate,
    isLoading,
    modalEditarOpen,
  } = useTableEmpresa();

  return (
    <Container>
      {isLoading && <CircularProgress />}
      {data && data.content.length === 0 ? (
        <h3>Nenhuma empresa cadastrada</h3>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CNPJ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.content.map((empresa) => (
                <Row
                  key={empresa.id}
                  empresa={empresa}
                  handleClickDelete={handleClickDelete}
                  handleClickUpdate={handleclickUpdate}
                />
              ))}
          </tbody>
        </Table>
      )}
      <ModalEditar
        open={modalEditarOpen}
        handleClose={closeModalEditar}
        empresa={empresa}
      />
    </Container>
  );
};
