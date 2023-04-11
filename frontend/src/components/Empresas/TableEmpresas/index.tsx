import { useQuery } from "@tanstack/react-query";
import { getAllEmpresas } from "../../../services/empresaService";
import { Container, Table } from "./styles";
import { CircularProgress } from "@mui/material";
import { Row } from "./Row";

export const TableEmpresas = () => {
  const { data, isLoading } = useQuery(["empresas"], getAllEmpresas);

  return (
    <Container>
      {isLoading && <CircularProgress />}
      {data && (
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CNPJ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.content.map((empresa) => (
              <Row
                key={empresa.id}
                empresa={empresa}
                handleClickDelete={() => {}}
                handleClickUpdate={() => {}}
              />
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};
