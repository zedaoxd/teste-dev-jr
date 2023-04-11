import { Container, Table } from "./styles";

export const TableEmpresas = () => {
  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CNPJ</th>
            <th></th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </Container>
  );
};
